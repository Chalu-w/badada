import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  uploadImageFile,
  saveFirebaseConfig,
  getSavedFirebaseConfig,
  initFirebase
} from '../services/firebase';
import {
  X,
  Shield,
  LogOut,
  Save,
  Upload,
  Image as ImageIcon,
  BookOpen,
  Users,
  MessageSquare,
  Database,
  Key,
  Check,
  AlertCircle,
  RefreshCw,
  Trash2,
  Plus
} from 'lucide-react';
import { BiographySection, FirebaseCredentials } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
  initialEditSection?: BiographySection | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, initialEditSection }) => {
  const { language, t } = useLanguage();
  const {
    config,
    updateConfig,
    biography,
    updateBiographySection,
    photos,
    addPhoto,
    deletePhoto,
    family,
    addFamilyMember,
    deleteFamilyMember,
    tributes,
    deleteTribute,
    isFirebaseActive
  } = useData();
  const { logout, passcode, setMasterPasscode } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'portrait' | 'logo' | 'biography' | 'gallery' | 'family' | 'tributes' | 'firebase' | 'security'
  >(initialEditSection ? 'biography' : 'portrait');

  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Hero & Identity state
  const [personName, setPersonName] = useState(config.personName);
  const [honorific, setHonorific] = useState(config.honorific);
  const [birthDate, setBirthDate] = useState(config.birthDate);
  const [deathDate, setDeathDate] = useState(config.deathDate);
  const [heroQuoteOm, setHeroQuoteOm] = useState(config.heroQuote.om);
  const [heroQuoteEn, setHeroQuoteEn] = useState(config.heroQuote.en);
  const [heroQuoteAm, setHeroQuoteAm] = useState(config.heroQuote.am);
  const [memorialAddress, setMemorialAddress] = useState(config.memorialAddress || '');

  // Biography editor state
  const [selectedBioId, setSelectedBioId] = useState<string>(
    initialEditSection ? initialEditSection.id : biography[0]?.id || 'seensa'
  );
  const currentSection = biography.find((b) => b.id === selectedBioId) || biography[0];
  const [bioTitleOm, setBioTitleOm] = useState(currentSection?.title.om || '');
  const [bioTitleEn, setBioTitleEn] = useState(currentSection?.title.en || '');
  const [bioTitleAm, setBioTitleAm] = useState(currentSection?.title.am || '');
  const [bioSubtitleOm, setBioSubtitleOm] = useState(currentSection?.subtitle?.om || '');
  const [bioContentOm, setBioContentOm] = useState(currentSection?.content.om || '');
  const [bioContentEn, setBioContentEn] = useState(currentSection?.content.en || '');
  const [bioContentAm, setBioContentAm] = useState(currentSection?.content.am || '');
  const [bioQuoteOm, setBioQuoteOm] = useState(currentSection?.quote?.om || '');

  // Sync when selected bio section changes
  const handleBioSelect = (id: string) => {
    setSelectedBioId(id);
    const sec = biography.find((b) => b.id === id);
    if (sec) {
      setBioTitleOm(sec.title.om);
      setBioTitleEn(sec.title.en);
      setBioTitleAm(sec.title.am);
      setBioSubtitleOm(sec.subtitle?.om || '');
      setBioContentOm(sec.content.om);
      setBioContentEn(sec.content.en);
      setBioContentAm(sec.content.am);
      setBioQuoteOm(sec.quote?.om || '');
    }
  };

  // Firebase Config state
  const [firebaseConfigInput, setFirebaseConfigInput] = useState<FirebaseCredentials>(() => {
    const saved = getSavedFirebaseConfig();
    return saved || {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    };
  });
  const [firebaseTestResult, setFirebaseTestResult] = useState<string | null>(null);

  // Passcode state
  const [newPasscode, setNewPasscode] = useState('');

  // Refs for uploads
  const portraitInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleSaveHero = async () => {
    setIsSaving(true);
    await updateConfig({
      personName,
      honorific,
      birthDate,
      deathDate,
      memorialAddress,
      heroQuote: {
        om: heroQuoteOm,
        en: heroQuoteEn,
        am: heroQuoteAm,
      },
    });
    setIsSaving(false);
    triggerSuccess('Odeeffannoon fuula duraa milkaa\'inaan galmaa\'eera!');
  };

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      const url = await uploadImageFile(file, 'portraits');
      await updateConfig({ heroPortraitUrl: url });
      triggerSuccess('Suuraan Obbo Badhaadhaa milkaa\'inaan jijjiirameera!');
    } catch (err) {
      alert('Suuraa olkaahuun hin danda\'amne.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCustomLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      const url = await uploadImageFile(file, 'logos');
      await updateConfig({ customLogoUrl: url, logoType: 'custom' });
      triggerSuccess('Mallattoon (logo) haaraan milkaa\'inaan jijjiirameera!');
    } catch (err) {
      alert('Logo olkaahuun hin danda\'amne.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveBioSection = async () => {
    if (!currentSection) return;
    setIsSaving(true);
    const updatedSec: BiographySection = {
      ...currentSection,
      title: {
        om: bioTitleOm,
        en: bioTitleEn,
        am: bioTitleAm,
      },
      subtitle: {
        om: bioSubtitleOm,
        en: bioSubtitleOm,
        am: bioSubtitleOm,
      },
      content: {
        om: bioContentOm,
        en: bioContentEn,
        am: bioContentAm,
      },
      quote: {
        om: bioQuoteOm,
        en: bioQuoteOm,
        am: bioQuoteOm,
      },
    };

    await updateBiographySection(updatedSec);
    setIsSaving(false);
    triggerSuccess(`Kutaan seenaa "${bioTitleOm}" milkaa'inaan haaromeera!`);
  };

  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveFirebaseConfig(firebaseConfigInput);
    const res = initFirebase(firebaseConfigInput);
    if (res.isConfigured) {
      setFirebaseTestResult('✅ Firebase milkaa\'inaan walqunnamsiifameera!');
    } else {
      setFirebaseTestResult('⚠️ Firebase credentials galfameera, garuu walqunnamsiisuun hin danda\'amne. Qoradhaa.');
    }
    triggerSuccess('Qindaa\'inni Firebase galmaa\'eera!');
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) return;
    setMasterPasscode(newPasscode.trim());
    setNewPasscode('');
    triggerSuccess('Jechi icchiitii (passcode) haaraan milkaa\'inaan jijjiirameera!');
  };

  const triggerSuccess = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl border-2 border-[#C5A059] overflow-hidden text-[#1A2421]">

        {/* Top Header */}
        <div className="bg-[#0F2E23] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#C5A059]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16423C] border border-[#C5A059] flex items-center justify-center text-[#F3E5AB]">
              <Shield className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#F3E5AB]">
                {t.adminTitle}
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span>Bulchaa Maatii (Family Admin)</span>
                <span>•</span>
                <span className={`flex items-center gap-1 ${isFirebaseActive ? 'text-emerald-400 font-bold' : 'text-amber-300'}`}>
                  <Database className="w-3 h-3" />
                  {isFirebaseActive ? 'Firebase Cloud Active' : 'Local Storage Mode'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16423C] hover:bg-red-800 text-xs font-semibold text-gray-200 transition-colors"
              title={t.adminLogoutBtn}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.adminLogoutBtn}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#16423C] hover:bg-[#1E5649] text-gray-200 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert Bar */}
        {saveStatus && (
          <div className="bg-[#0F2E23] text-[#F3E5AB] px-6 py-2.5 text-xs font-semibold flex items-center gap-2 border-b border-[#C5A059] animate-fadeIn">
            <Check className="w-4 h-4 text-[#C5A059]" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Dashboard Body: Sidebar Tabs + Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* Sidebar Tabs */}
          <aside className="w-full md:w-64 bg-white border-r border-[#E8DFC9] p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto flex-shrink-0">
            {[
              { id: 'portrait', label: t.adminTabHeroPortrait, icon: ImageIcon },
              { id: 'logo', label: t.adminTabLogo, icon: Shield },
              { id: 'biography', label: t.adminTabBiography, icon: BookOpen },
              { id: 'gallery', label: t.adminTabGallery, icon: ImageIcon },
              { id: 'family', label: t.adminTabFamily, icon: Users },
              { id: 'tributes', label: t.adminTabTributes, icon: MessageSquare },
              { id: 'firebase', label: t.adminTabFirebase, icon: Database },
              { id: 'security', label: 'Jecha Icchiitii', icon: Key },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${isActive
                      ? 'bg-[#0F2E23] text-[#F3E5AB] shadow-md'
                      : 'text-[#5C6D66] hover:bg-[#FAF7F2] hover:text-[#0F2E23]'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#5C6D66]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-y-auto bg-[#FAF7F2]">

            {/* TAB 1: HERO & PORTRAIT */}
            {activeTab === 'portrait' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabHeroPortrait}
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Suuraa guddaa Obbo Badhaadhaa, maqaa, fi bara dhalootaa/boqonnaa gulaalaa.
                  </p>
                </div>

                {/* Portrait Image Uploader */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9] flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-36 h-44 rounded-xl overflow-hidden bg-[#0A2219] border-2 border-[#C5A059] flex-shrink-0 flex items-center justify-center">
                    {config.heroPortraitUrl ? (
                      <img
                        src={config.heroPortraitUrl}
                        alt="Portrait"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/logo-tree.svg"
                        alt="Portrait Placeholder"
                        className="w-16 h-16 object-contain"
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-serif font-bold text-base text-[#0F2E23]">
                      Suuraa Dhugaa Olkaa'aa
                    </h4>
                    <p className="text-xs text-[#5C6D66]">
                      Suuraa maatii qulqullina olaanaa qabu filadhaa. Suuraan kun fuula dura irratti bal'inaan mul'ata.
                    </p>
                    <input
                      type="file"
                      ref={portraitInputRef}
                      onChange={handlePortraitUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => portraitInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs shadow hover:bg-[#16423C]"
                    >
                      <Upload className="w-4 h-4 text-[#C5A059]" />
                      <span>Suuraa Haaraa Olkaa'aa</span>
                    </button>
                  </div>
                </div>

                {/* Name & Dates Fields */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Maqaa Guutuu (Full Name)
                      </label>
                      <input
                        type="text"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Maqaa Ulfinaa (Honorific)
                      </label>
                      <input
                        type="text"
                        value={honorific}
                        onChange={(e) => setHonorific(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Bara Dhalootaa (Birth Year)
                      </label>
                      <input
                        type="text"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Guyyaa Boqonnaa (Date of Passing)
                      </label>
                      <input
                        type="text"
                        value={deathDate}
                        onChange={(e) => setDeathDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                      />
                    </div>
                  </div>

                  {/* Hero Quotes in 3 Languages */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                      Dhaamsa Fuula Duraa (Hero Memorial Quote - Afaan Oromoo)
                    </label>
                    <textarea
                      rows={2}
                      value={heroQuoteOm}
                      onChange={(e) => setHeroQuoteOm(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                      Hero Memorial Quote (English)
                    </label>
                    <textarea
                      rows={2}
                      value={heroQuoteEn}
                      onChange={(e) => setHeroQuoteEn(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSaveHero}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs shadow hover:bg-[#16423C]"
                  >
                    <Save className="w-4 h-4 text-[#C5A059]" />
                    <span>{isSaving ? 'Galmeessaa jira...' : t.saveChanges}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: LOGO MANAGER */}
            {activeTab === 'logo' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabLogo}
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Mallattoo weebsaayitii (BRW Tree Emblem ykn Custom Logo) filadhaa ykn jijjiiraa.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Option 1: Official BRW Tree SVG */}
                  <div
                    onClick={() => updateConfig({ logoType: 'svg' })}
                    className={`p-6 rounded-2xl bg-white border-2 cursor-pointer transition-all ${config.logoType === 'svg'
                        ? 'border-[#C5A059] shadow-memorial'
                        : 'border-[#E8DFC9] opacity-75'
                      }`}
                  >
                    <div className="w-24 h-24 mx-auto mb-4">
                      <img src="/logo-tree.svg" alt="BRW Tree" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-serif font-bold text-sm text-[#0F2E23]">
                        BRW Official Sacred Tree Emblem
                      </h4>
                      <p className="text-xs text-[#5C6D66] mt-1">
                        Initials BRW, Oda Tree, Gold & Dark Green.
                      </p>
                      {config.logoType === 'svg' && (
                        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#0F2E23] text-[#F3E5AB] text-[11px] font-bold">
                          Amma Fayyadamaa Jira
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Option 2: Custom Uploaded Logo */}
                  <div
                    className={`p-6 rounded-2xl bg-white border-2 transition-all ${config.logoType === 'custom'
                        ? 'border-[#C5A059] shadow-memorial'
                        : 'border-[#E8DFC9]'
                      }`}
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#0A2219] border border-[#C5A059] flex items-center justify-center overflow-hidden">
                      {config.customLogoUrl ? (
                        <img src={config.customLogoUrl} alt="Custom" className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-xs text-gray-400">Suuraan Hin Jiru</span>
                      )}
                    </div>
                    <div className="text-center space-y-2">
                      <h4 className="font-serif font-bold text-sm text-[#0F2E23]">
                        Mallattoo Keessan (Custom Logo)
                      </h4>
                      <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleCustomLogoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={() => logoInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-[#0F2E23] text-[#F3E5AB] text-xs font-bold"
                      >
                        Logo Haaraa Olkaa'aa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BIOGRAPHY EDITOR (13 SECTIONS) */}
            {activeTab === 'biography' && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabBiography} (Kutaa 13)
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Kutaa seenaa 1 hanga 13 filachuudhaan seenaa dabalataa ykn sirreeffama maatii galchaa.
                  </p>
                </div>

                {/* Section Selector Pills */}
                <div className="flex flex-wrap gap-2">
                  {biography.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleBioSelect(sec.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedBioId === sec.id
                          ? 'bg-[#0F2E23] text-[#F3E5AB] shadow-sm'
                          : 'bg-white text-[#5C6D66] hover:bg-[#F3EFE6]'
                        }`}
                    >
                      {sec.title[language] || sec.title.om}
                    </button>
                  ))}
                </div>

                {/* Edit Form */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Mata Duree (Title - Afaan Oromoo)
                      </label>
                      <input
                        type="text"
                        value={bioTitleOm}
                        onChange={(e) => setBioTitleOm(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Title (English)
                      </label>
                      <input
                        type="text"
                        value={bioTitleEn}
                        onChange={(e) => setBioTitleEn(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                      Mata Duree Xiqqaa (Subtitle)
                    </label>
                    <input
                      type="text"
                      value={bioSubtitleOm}
                      onChange={(e) => setBioSubtitleOm(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                      Barruu Seenaa (Content - Afaan Oromoo) *
                    </label>
                    <textarea
                      rows={6}
                      value={bioContentOm}
                      onChange={(e) => setBioContentOm(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] text-sm leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                      Content (English)
                    </label>
                    <textarea
                      rows={4}
                      value={bioContentEn}
                      onChange={(e) => setBioContentEn(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] text-sm leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                      Jechoota Qalbii / Gorsa (Honorary Quote)
                    </label>
                    <input
                      type="text"
                      value={bioQuoteOm}
                      onChange={(e) => setBioQuoteOm(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSaveBioSection}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs shadow hover:bg-[#16423C]"
                  >
                    <Save className="w-4 h-4 text-[#C5A059]" />
                    <span>{isSaving ? 'Galmeessaa jira...' : t.saveChanges}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: GALLERY MANAGER */}
            {activeTab === 'gallery' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                      {t.adminTabGallery} ({photos.length})
                    </h3>
                    <p className="text-xs text-[#5C6D66]">
                      Suuraalee maatii galchuudhaan seenaa isaanii tursiisaa.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {photos.map((p) => (
                    <div key={p.id} className="relative rounded-xl overflow-hidden border border-[#E8DFC9] bg-white group shadow-sm">
                      <div className="aspect-square w-full bg-black">
                        <img src={p.url} alt="Gallery" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2 text-xs">
                        <p className="font-semibold text-[#0F2E23] truncate">{p.caption.om}</p>
                        <p className="text-[10px] text-gray-500">{p.date}</p>
                      </div>
                      <button
                        onClick={() => deletePhoto(p.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow hover:bg-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: FAMILY RECORDS */}
            {activeTab === 'family' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabFamily} ({family.length})
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Ijoollee, haadha manootaa, fi akaakayyuulee Obbo Badhaadhaa galchaa.
                  </p>
                </div>

                <div className="space-y-3">
                  {family.map((f) => (
                    <div key={f.id} className="p-4 rounded-xl bg-white border border-[#E8DFC9] flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#0F2E23]">{f.fullName}</h4>
                        <p className="text-xs text-[#C5A059]">{f.relationship} • Dhaloota {f.generation}ffaa</p>
                        {f.notes && <p className="text-xs text-[#5C6D66] mt-1">{f.notes}</p>}
                      </div>
                      <button
                        onClick={() => deleteFamilyMember(f.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: TRIBUTES MODERATION */}
            {activeTab === 'tributes' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabTributes} ({tributes.length})
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Dhaamsa namoonni barreessan ilaalaa ykn kan hin barbaachifne balleessaa.
                  </p>
                </div>

                <div className="space-y-3">
                  {tributes.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-white border border-[#E8DFC9] flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-[#0F2E23]">{item.authorName}</strong>
                          <span className="text-xs text-[#C5A059]">({item.relationship})</span>
                        </div>
                        <p className="text-xs text-[#2C3E37] italic">"{item.message}"</p>
                        <span className="text-[10px] text-gray-400">{item.date} • {item.location}</span>
                      </div>
                      <button
                        onClick={() => deleteTribute(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: FIREBASE SETTINGS */}
            {activeTab === 'firebase' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabFirebase}
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Firebase credentials asitti galchuun weebsaayitiin kun kallattiin Firestore fi Storage irratti akka hojjetu gochuu dandeessu.
                  </p>
                </div>

                {firebaseTestResult && (
                  <div className="p-4 rounded-xl bg-[#0F2E23] text-[#F3E5AB] text-xs font-semibold">
                    {firebaseTestResult}
                  </div>
                )}

                <form onSubmit={handleSaveFirebaseConfig} className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">apiKey</label>
                    <input
                      type="text"
                      value={firebaseConfigInput.apiKey}
                      onChange={(e) => setFirebaseConfigInput({ ...firebaseConfigInput, apiKey: e.target.value })}
                      placeholder="AIzaSy..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">projectId</label>
                      <input
                        type="text"
                        value={firebaseConfigInput.projectId}
                        onChange={(e) => setFirebaseConfigInput({ ...firebaseConfigInput, projectId: e.target.value })}
                        placeholder="memorial-project-id"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">storageBucket</label>
                      <input
                        type="text"
                        value={firebaseConfigInput.storageBucket}
                        onChange={(e) => setFirebaseConfigInput({ ...firebaseConfigInput, storageBucket: e.target.value })}
                        placeholder="memorial-project.appspot.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">authDomain</label>
                      <input
                        type="text"
                        value={firebaseConfigInput.authDomain}
                        onChange={(e) => setFirebaseConfigInput({ ...firebaseConfigInput, authDomain: e.target.value })}
                        placeholder="memorial-project.firebaseapp.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">appId</label>
                      <input
                        type="text"
                        value={firebaseConfigInput.appId}
                        onChange={(e) => setFirebaseConfigInput({ ...firebaseConfigInput, appId: e.target.value })}
                        placeholder="1:123456789:web:abcdef"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs shadow hover:bg-[#16423C]"
                  >
                    <Database className="w-4 h-4 text-[#C5A059]" />
                    <span>Firebase Galmeessi & Qori</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 8: SECURITY & PASSCODE */}
            {activeTab === 'security' && (
              <div className="max-w-md space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    Jecha Icchiitii Bulchiinsaa
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Jecha icchiitii (password) giddugala bulchiinsa seensisu jijjiiraa.
                  </p>
                </div>

                <form onSubmit={handleChangePasscode} className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                      Jecha Icchiitii Haaraa (New Passcode)
                    </label>
                    <input
                      type="password"
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      placeholder="Jecha icchiitii haaraa galchaa..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs shadow hover:bg-[#16423C]"
                  >
                    <Key className="w-4 h-4 text-[#C5A059]" />
                    <span>Jijjiiri</span>
                  </button>
                </form>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};

