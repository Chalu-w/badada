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
  getSavedCloudinaryConfig,
  saveCloudinaryConfig,
  uploadImageToCloudinary
} from '../services/cloudinary';
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
  Plus,
  Edit3,
  Cloud,
  CheckCircle2,
  Loader2,
  Sparkles,
  Search,
  Tag,
  Calendar,
  ExternalLink,
  Smartphone,
  Laptop
} from 'lucide-react';
import { BiographySection, FirebaseCredentials, PhotoItem, CloudinarySettings } from '../types';

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
    updatePhoto,
    deletePhoto,
    family,
    addFamilyMember,
    deleteFamilyMember,
    tributes,
    deleteTribute,
    isFirebaseActive
  } = useData();
  const { logout, passcode, setMasterPasscode } = useAuth();

  // Active tab state - default to gallery for immediate photo management!
  const [activeTab, setActiveTab] = useState<
    'gallery' | 'portrait' | 'logo' | 'biography' | 'family' | 'tributes' | 'cloudinary' | 'firebase' | 'security'
  >(initialEditSection ? 'biography' : 'gallery');

  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // ----------------------------------------------------
  // PHOTO MANAGEMENT STATE
  // ----------------------------------------------------
  const [photoSearch, setPhotoSearch] = useState('');
  const [photoCategoryFilter, setPhotoCategoryFilter] = useState<string>('all');
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null);

  // Add Photo Form State
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>('');
  const [photoTitleOm, setPhotoTitleOm] = useState('');
  const [photoTitleEn, setPhotoTitleEn] = useState('');
  const [photoCaptionOm, setPhotoCaptionOm] = useState('');
  const [photoCaptionEn, setPhotoCaptionEn] = useState('');
  const [photoCaptionAm, setPhotoCaptionAm] = useState('');
  const [photoDescOm, setPhotoDescOm] = useState('');
  const [photoDate, setPhotoDate] = useState('');
  const [photoCategory, setPhotoCategory] = useState<'maatii' | 'jireenya' | 'hawaasa' | 'yaadannoo'>('maatii');
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState<string | null>(null);
  const photoFileInputRef = useRef<HTMLInputElement>(null);

  // Edit Photo Form State
  const [editTitleOm, setEditTitleOm] = useState('');
  const [editTitleEn, setEditTitleEn] = useState('');
  const [editCaptionOm, setEditCaptionOm] = useState('');
  const [editCaptionEn, setEditCaptionEn] = useState('');
  const [editCaptionAm, setEditCaptionAm] = useState('');
  const [editDescOm, setEditDescOm] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editCategory, setEditCategory] = useState<'maatii' | 'jireenya' | 'hawaasa' | 'yaadannoo'>('maatii');
  const [isPhotoUpdating, setIsPhotoUpdating] = useState(false);

  // ----------------------------------------------------
  // CLOUDINARY SETTINGS STATE
  // ----------------------------------------------------
  const [cloudinarySettings, setCloudinarySettings] = useState<CloudinarySettings>(() => getSavedCloudinaryConfig());
  const [cloudinaryTestStatus, setCloudinaryTestStatus] = useState<string | null>(null);
  const [isTestingCloudinary, setIsTestingCloudinary] = useState(false);

  // ----------------------------------------------------
  // HERO & IDENTITY STATE
  // ----------------------------------------------------
  const [personName, setPersonName] = useState(config.personName);
  const [honorific, setHonorific] = useState(config.honorific);
  const [birthDate, setBirthDate] = useState(config.birthDate);
  const [deathDate, setDeathDate] = useState(config.deathDate);
  const [heroQuoteOm, setHeroQuoteOm] = useState(config.heroQuote.om);
  const [heroQuoteEn, setHeroQuoteEn] = useState(config.heroQuote.en);
  const [heroQuoteAm, setHeroQuoteAm] = useState(config.heroQuote.am);
  const [memorialAddress, setMemorialAddress] = useState(config.memorialAddress || '');

  // ----------------------------------------------------
  // BIOGRAPHY EDITOR STATE
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // FIREBASE CONFIG STATE
  // ----------------------------------------------------
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

  // Refs for direct uploads
  const portraitInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Status feedback helper
  const triggerSuccess = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 4000);
  };

  // ----------------------------------------------------
  // PHOTO MANAGEMENT HANDLERS
  // ----------------------------------------------------
  const handleSelectPhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoUploadError(null);
    setPhotoUploadSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Verify format (JPG, JPEG, PNG, WEBP)
    const validMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validExts = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
    const mime = (file.type || '').toLowerCase();

    if (!validMimes.includes(mime) && !validExts.includes(ext)) {
      setPhotoUploadError("Gosa faayilii hin eeyyamamne. Maaloo suuraa JPG, JPEG, PNG ykn WEBP qofa filadhaa.");
      setSelectedPhotoFile(null);
      setPhotoPreviewUrl('');
      if (photoFileInputRef.current) photoFileInputRef.current.value = '';
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setPhotoUploadError("Guddinni suuraa baay'ee guddaadha (Hanga 15MB qofa). Maaloo suuraa salphaa filadhaa.");
      setSelectedPhotoFile(null);
      setPhotoPreviewUrl('');
      if (photoFileInputRef.current) photoFileInputRef.current.value = '';
      return;
    }

    setSelectedPhotoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreviewUrl(objectUrl);
  };

  const handleUploadNewPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhotoFile) {
      setPhotoUploadError('Maaloo dura suuraa Android Gallery ykn Laptop irraa filadhaa.');
      return;
    }

    try {
      setIsPhotoUploading(true);
      setPhotoUploadError(null);
      setPhotoUploadSuccess(null);

      // 1. Upload to Cloudinary (No Firebase Storage Blaze paywall required!)
      const uploadedUrl = await uploadImageFile(selectedPhotoFile, 'badada_memorial/gallery');

      // 2. Save photo information in Firebase Firestore 'photos' collection
      await addPhoto({
        url: uploadedUrl,
        title: {
          om: photoTitleOm.trim() || photoCaptionOm.trim() || 'Suuraa Maatii',
          en: photoTitleEn.trim() || photoCaptionEn.trim() || 'Family Photograph',
          am: photoTitleOm.trim() || 'የቤተሰብ ፎቶ',
        },
        caption: {
          om: photoCaptionOm.trim() || photoTitleOm.trim() || 'Suuraa Maatii',
          en: photoCaptionEn.trim() || photoTitleEn.trim() || 'Family Photograph',
          am: photoCaptionAm.trim() || photoCaptionOm.trim() || 'የቤተሰብ ፎቶ',
        },
        description: photoDescOm.trim() ? { om: photoDescOm.trim() } : undefined,
        date: photoDate.trim() || new Date().getFullYear().toString(),
        category: photoCategory,
        featured: false,
        storageProvider: 'cloudinary',
      });

      setPhotoUploadSuccess("Suuraan Cloudinary fi Firestore irratti milkaa'inaan olkaa'ameera!");
      triggerSuccess("Suuraan galarii haaraa milkaa'inaan olkaa'ameera!");

      // Reset fields
      setSelectedPhotoFile(null);
      setPhotoPreviewUrl('');
      setPhotoTitleOm('');
      setPhotoTitleEn('');
      setPhotoCaptionOm('');
      setPhotoCaptionEn('');
      setPhotoCaptionAm('');
      setPhotoDescOm('');
      setPhotoDate('');
      if (photoFileInputRef.current) photoFileInputRef.current.value = '';

      setTimeout(() => {
        setShowAddPhotoModal(false);
        setPhotoUploadSuccess(null);
      }, 1800);
    } catch (err: any) {
      console.error('Photo upload failed:', err);
      setPhotoUploadError(err?.message || "Suuraa olkaa'uun hin milkoofne. Maaloo irra deebi'aa yaalaa.");
    } finally {
      setIsPhotoUploading(false);
    }
  };

  const handleOpenEditPhoto = (photo: PhotoItem) => {
    setEditingPhoto(photo);
    setEditTitleOm(photo.title?.om || photo.caption.om || '');
    setEditTitleEn(photo.title?.en || photo.caption.en || '');
    setEditCaptionOm(photo.caption.om || '');
    setEditCaptionEn(photo.caption.en || '');
    setEditCaptionAm(photo.caption.am || '');
    setEditDescOm(photo.description?.om || '');
    setEditDate(photo.date || '');
    setEditCategory(photo.category);
  };

  const handleSavePhotoEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    try {
      setIsPhotoUpdating(true);
      await updatePhoto(editingPhoto.id, {
        title: {
          om: editTitleOm.trim() || editCaptionOm.trim() || 'Suuraa Maatii',
          en: editTitleEn.trim() || editCaptionEn.trim() || 'Family Photograph',
          am: editTitleOm.trim() || 'የቤተሰብ ፎቶ',
        },
        caption: {
          om: editCaptionOm.trim() || 'Suuraa Maatii',
          en: editCaptionEn.trim() || editCaptionOm.trim() || 'Family Photograph',
          am: editCaptionAm.trim() || editCaptionOm.trim() || 'የቤተሰብ ፎቶ',
        },
        description: editDescOm.trim() ? { om: editDescOm.trim() } : undefined,
        date: editDate.trim(),
        category: editCategory,
      });

      triggerSuccess("Odeeffannoon suuraa milkaa'inaan gulaalameera!");
      setEditingPhoto(null);
    } catch (err: any) {
      alert("Suuraa gulaaluun hin danda'amne: " + (err?.message || ''));
    } finally {
      setIsPhotoUpdating(false);
    }
  };

  const handleDeletePhotoConfirm = async (photo: PhotoItem) => {
    const confirmMsg = `Suuraa "${photo.title?.om || photo.caption.om}" jedhu balleessuu barbaadduu?`;
    if (window.confirm(confirmMsg)) {
      await deletePhoto(photo.id);
      triggerSuccess("Suuraan milkaa'inaan haqameera.");
    }
  };

  // Filtered photos list
  const filteredAdminPhotos = photos.filter((p) => {
    const matchesCategory = photoCategoryFilter === 'all' || p.category === photoCategoryFilter;
    const searchLow = photoSearch.toLowerCase().trim();
    if (!searchLow) return matchesCategory;

    const titleText = `${p.title?.om || ''} ${p.title?.en || ''} ${p.caption.om} ${p.caption.en}`.toLowerCase();
    return matchesCategory && titleText.includes(searchLow);
  });

  // ----------------------------------------------------
  // CLOUDINARY SETTINGS HANDLER
  // ----------------------------------------------------
  const handleSaveCloudinarySettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveCloudinaryConfig(cloudinarySettings);
    triggerSuccess("Qindaa'inni Cloudinary milkaa'inaan galmaa'eera!");
  };

  const handleTestCloudinary = async () => {
    if (!cloudinarySettings.cloudName) {
      setCloudinaryTestStatus("⚠️ Maaloo dura 'Cloud Name' galchaa.");
      return;
    }
    setIsTestingCloudinary(true);
    setCloudinaryTestStatus(null);
    try {
      const pingUrl = `https://res.cloudinary.com/${cloudinarySettings.cloudName}/image/upload/sample.jpg`;
      const res = await fetch(pingUrl, { method: 'HEAD' });
      if (res.ok) {
        setCloudinaryTestStatus("✅ Cloudinary milkaa'inaan argameera! Cloud Name sirrii dha.");
      } else {
        setCloudinaryTestStatus("ℹ️ Cloudinary deebii kenneera. Qindaa'inni Vercel Environment Variables irratti mirkanaa'uu qaba.");
      }
    } catch {
      setCloudinaryTestStatus("ℹ️ Qindaa'ina galmeessitanii Vercel irratti deploy gochuun yaalaa.");
    } finally {
      setIsTestingCloudinary(false);
    }
  };

  // ----------------------------------------------------
  // HERO & PORTRAIT & LOGO HANDLERS
  // ----------------------------------------------------
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
    triggerSuccess("Odeeffannoon fuula duraa milkaa'inaan galmaa'eera!");
  };

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      const url = await uploadImageFile(file, 'badada_memorial/portraits');
      await updateConfig({ heroPortraitUrl: url });
      triggerSuccess("Suuraan Obbo Badhaadhaa milkaa'inaan jijjiirameera!");
    } catch (err: any) {
      alert(err?.message || "Suuraa olkaahuun hin danda'amne.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCustomLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      const url = await uploadImageFile(file, 'badada_memorial/logos');
      await updateConfig({ customLogoUrl: url, logoType: 'custom' });
      triggerSuccess("Mallattoon (logo) haaraan milkaa'inaan jijjiirameera!");
    } catch (err: any) {
      alert(err?.message || "Logo olkaahuun hin danda'amne.");
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
      setFirebaseTestResult("✅ Firebase milkaa'inaan walqunnamsiifameera!");
    } else {
      setFirebaseTestResult("⚠️ Firebase credentials galfameera, garuu walqunnamsiisuun hin danda'amne. Qoradhaa.");
    }
    triggerSuccess("Qindaa'inni Firebase galmaa'eera!");
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) return;
    setMasterPasscode(newPasscode.trim());
    setNewPasscode('');
    triggerSuccess("Jechi icchiitii (passcode) haaraan milkaa'inaan jijjiirameera!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-3 md:p-6 animate-fadeIn">
      {/* Main Container: Full screen on mobile Android, sleek rounded dialog on laptop */}
      <div className="bg-[#FAF7F2] rounded-none sm:rounded-3xl w-full max-w-6xl h-full sm:h-[94vh] flex flex-col shadow-2xl border-0 sm:border-2 border-[#C5A059] overflow-hidden text-[#1A2421]">

        {/* 1. TOP HEADER (Responsive on Android & Laptops) */}
        <div className="bg-[#0F2E23] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b-2 border-[#C5A059] flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#16423C] border border-[#C5A059] flex items-center justify-center text-[#F3E5AB] flex-shrink-0">
              <Shield className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#F3E5AB]">
                  {t.adminTitle}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-[#C5A059] text-[#0A2219] font-bold px-2 py-0.5 rounded-full uppercase">
                  <Laptop className="w-3 h-3" /> Android & PC
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-300">
                <span className="text-emerald-400 font-medium">Bulchaa Maatii</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Cloud className="w-3 h-3 text-[#C5A059]" />
                  <span>Cloudinary + Firestore</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16423C] hover:bg-red-800 text-xs font-semibold text-gray-200 transition-colors"
              title={t.adminLogoutBtn}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.adminLogoutBtn}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#16423C] hover:bg-[#1E5649] text-gray-200 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. SUCCESS FEEDBACK ALERT BAR */}
        {saveStatus && (
          <div className="bg-[#0F2E23] text-[#F3E5AB] px-4 sm:px-6 py-2.5 text-xs font-semibold flex items-center gap-2 border-b border-[#C5A059] animate-fadeIn flex-shrink-0">
            <Check className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* 3. MOBILE HORIZONTAL SWIPEABLE TABS BAR (Visible on Android Phones & Small Tablets) */}
        <div className="md:hidden bg-white border-b border-[#E8DFC9] px-2 py-2 flex items-center gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-none">
          {[
            { id: 'gallery', label: 'Suuraalee (Photos)', icon: ImageIcon, badge: photos.length },
            { id: 'portrait', label: 'Suuraa Fuula Duraa', icon: ImageIcon },
            { id: 'logo', label: 'Logo', icon: Shield },
            { id: 'biography', label: 'Seenaa (Bio)', icon: BookOpen },
            { id: 'family', label: 'Maatii (Family)', icon: Users },
            { id: 'tributes', label: 'Dhaamsa', icon: MessageSquare },
            { id: 'cloudinary', label: 'Cloudinary', icon: Cloud },
            { id: 'firebase', label: 'Firebase', icon: Database },
            { id: 'security', label: 'Passcode', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-[#0F2E23] text-[#F3E5AB] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#5C6D66] hover:bg-[#F3EFE6]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-[#5C6D66]'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[#C5A059] text-[#0A2219]' : 'bg-gray-200 text-gray-700'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 4. DASHBOARD BODY (Desktop Sidebar + Main Content) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* Desktop Sidebar Tabs */}
          <aside className="hidden md:flex md:w-64 bg-white border-r border-[#E8DFC9] p-4 flex-col gap-1.5 overflow-y-auto flex-shrink-0">
            {[
              { id: 'gallery', label: 'Suuraalee Galarii', icon: ImageIcon, badge: photos.length },
              { id: 'portrait', label: t.adminTabHeroPortrait, icon: ImageIcon },
              { id: 'logo', label: t.adminTabLogo, icon: Shield },
              { id: 'biography', label: t.adminTabBiography, icon: BookOpen },
              { id: 'family', label: t.adminTabFamily, icon: Users, badge: family.length },
              { id: 'tributes', label: t.adminTabTributes, icon: MessageSquare, badge: tributes.length },
              { id: 'cloudinary', label: 'Kuusaa Cloudinary', icon: Cloud },
              { id: 'firebase', label: t.adminTabFirebase, icon: Database },
              { id: 'security', label: 'Jecha Icchiitii', icon: Key },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#0F2E23] text-[#F3E5AB] shadow-md'
                      : 'text-[#5C6D66] hover:bg-[#FAF7F2] hover:text-[#0F2E23]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#5C6D66]'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${isActive ? 'bg-[#C5A059] text-[#0A2219]' : 'bg-gray-100 text-gray-600'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Content Area with Touch Smooth Scrolling */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#FAF7F2]">

            {/* ============================================================== */}
            {/* TAB 1: PHOTO MANAGEMENT SUITE (Cloudinary + Firestore)         */}
            {/* ============================================================== */}
            {activeTab === 'gallery' && (
              <div className="max-w-5xl space-y-6">
                
                {/* Header Banner */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E8DFC9] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2E23] text-[#F3E5AB] text-xs font-serif uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Cloudinary Storage • {photos.length} Suuraalee</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2E23]">
                      Bulchiinsa Suuraalee Galarii
                    </h3>
                    <p className="text-xs text-[#5C6D66] mt-1">
                      Android Gallery ykn Laptop irraa suuraa haaraa olkaa'aa, gulaalaa, ykn haqaatii seenaa maatii tursiisaa.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setPhotoUploadError(null);
                      setPhotoUploadSuccess(null);
                      setShowAddPhotoModal(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0F2E23] hover:bg-[#16423C] text-[#F3E5AB] font-serif font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex-shrink-0 border border-[#C5A059]/40"
                  >
                    <Plus className="w-4 h-4 text-[#C5A059]" />
                    <span>+ Suuraa Haaraa Olkaa'aa</span>
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E8DFC9] flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                    {[
                      { id: 'all', label: 'Hunda' },
                      { id: 'maatii', label: 'Maatii' },
                      { id: 'jireenya', label: 'Jireenya' },
                      { id: 'hawaasa', label: 'Hawaasa' },
                      { id: 'yaadannoo', label: 'Yaadannoo' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setPhotoCategoryFilter(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                          photoCategoryFilter === cat.id
                            ? 'bg-[#0F2E23] text-[#F3E5AB] shadow-sm'
                            : 'bg-[#FAF7F2] text-[#5C6D66] hover:bg-[#F3EFE6]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={photoSearch}
                      onChange={(e) => setPhotoSearch(e.target.value)}
                      placeholder="Suuraa barbaadi..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#D5CAAF] text-xs bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Photos Grid */}
                {filteredAdminPhotos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {filteredAdminPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="bg-white rounded-2xl overflow-hidden border border-[#E8DFC9] shadow-sm hover:shadow-md transition-all flex flex-col group"
                      >
                        {/* Image Preview Container */}
                        <div className="aspect-[4/3] w-full bg-[#0F2E23] relative overflow-hidden">
                          <img
                            src={photo.url}
                            alt={photo.caption.om}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-[#F3E5AB] backdrop-blur uppercase">
                              {photo.category}
                            </span>
                            {photo.storageProvider === 'cloudinary' && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-600/80 text-white backdrop-blur flex items-center gap-0.5">
                                <Cloud className="w-2.5 h-2.5" /> Cloud
                              </span>
                            )}
                          </div>
                          {photo.date && (
                            <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded bg-black/70 text-gray-200 backdrop-blur flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#C5A059]" /> {photo.date}
                            </span>
                          )}
                        </div>

                        {/* Card Content & Details */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="font-serif font-bold text-sm text-[#0F2E23] line-clamp-1">
                              {photo.title?.om || photo.caption.om}
                            </h4>
                            <p className="text-xs text-[#5C6D66] mt-1 line-clamp-2 leading-relaxed">
                              {photo.caption.om}
                            </p>
                            {photo.description?.om && (
                              <p className="text-[11px] text-gray-400 mt-1 line-clamp-1 italic">
                                "{photo.description.om}"
                              </p>
                            )}
                          </div>

                          {/* Action Buttons: Edit & Delete */}
                          <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between gap-2">
                            <button
                              onClick={() => handleOpenEditPhoto(photo)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE6] text-xs font-semibold text-[#0F2E23] transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>Gulaali</span>
                            </button>

                            <button
                              onClick={() => handleDeletePhotoConfirm(photo)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 transition-colors"
                              title="Delete photo"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                              <span>Balleessi</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-[#D5CAAF] space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center text-gray-400 mx-auto">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#0F2E23]">
                      Suuraan barbaadame hin argamne
                    </h4>
                    <p className="text-xs text-[#5C6D66]">
                      Suuraa haaraa olkaa'uudhaan galarii keessanitti dabalaa.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 2: HERO PORTRAIT UPLOADER                                   */}
            {/* ============================================================== */}
            {activeTab === 'portrait' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabHeroPortrait}
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Suuraa duraa fi odeeffannoo bu'uuraa Obbo Badhaadhaa gulaalaa.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-6">
                  {/* Portrait Image Uploader */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-2">
                      Suuraa Fuula Duraa (Hero Portrait)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-36 h-48 rounded-2xl overflow-hidden bg-black border-2 border-[#C5A059] flex items-center justify-center relative shadow-md">
                        {config.heroPortraitUrl ? (
                          <img
                            src={config.heroPortraitUrl}
                            alt="Portrait"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400 text-center p-2">
                            Suuraa Dhugaa Olkaa'aa
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-center sm:text-left">
                        <input
                          type="file"
                          ref={portraitInputRef}
                          onChange={handlePortraitUpload}
                          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                          className="hidden"
                        />
                        <button
                          onClick={() => portraitInputRef.current?.click()}
                          disabled={isSaving}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs shadow hover:bg-[#16423C] disabled:opacity-50"
                        >
                          <Upload className="w-4 h-4 text-[#C5A059]" />
                          <span>Suuraa Haaraa Olkaa'aa (Cloudinary)</span>
                        </button>
                        <p className="text-[11px] text-[#5C6D66]">
                          Gosa faayilii: JPG, PNG, WEBP (hanga 15MB).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Name and Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F0EAE1]">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Maqaa Guutuu
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
                        Maqaa Kabajaa (Honorific)
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
                        Bara Dhalootaa (Birth Date)
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
                        Bara Boqonnaa (Date of Passing)
                      </label>
                      <input
                        type="text"
                        value={deathDate}
                        onChange={(e) => setDeathDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                      />
                    </div>
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

            {/* ============================================================== */}
            {/* TAB 3: LOGO CUSTOMIZATION                                      */}
            {/* ============================================================== */}
            {activeTab === 'logo' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabLogo}
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Mallattoo weebsaayitichaa (Tree Crest ykn Logo dhuunfaa) filadhaa.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-6">
                  <div>
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={handleCustomLogoUpload}
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs shadow hover:bg-[#16423C]"
                    >
                      <Upload className="w-4 h-4 text-[#C5A059]" />
                      <span>Logo Haaraa Olkaa'aa (Cloudinary)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 4: BIOGRAPHY EDITOR (13 Chapters)                          */}
            {/* ============================================================== */}
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedBioId === sec.id
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
                      Barruu Seenaa (Content - Afaan Oromoo) *
                    </label>
                    <textarea
                      rows={6}
                      value={bioContentOm}
                      onChange={(e) => setBioContentOm(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] text-sm leading-relaxed"
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

            {/* ============================================================== */}
            {/* TAB 5: FAMILY RECORDS                                          */}
            {/* ============================================================== */}
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

            {/* ============================================================== */}
            {/* TAB 6: TRIBUTES MODERATION                                     */}
            {/* ============================================================== */}
            {activeTab === 'tributes' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabTributes} ({tributes.length})
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Dhaamsa maatii fi jaallattootaa to'adhaa.
                  </p>
                </div>

                <div className="space-y-3">
                  {tributes.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-white border border-[#E8DFC9] flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <strong className="text-sm text-[#0F2E23]">{item.authorName}</strong>
                        <span className="text-xs text-[#C5A059] ml-2">({item.relationship})</span>
                        <p className="text-xs text-[#5C6D66] italic">"{item.message}"</p>
                        <span className="text-[10px] text-gray-400">{item.date}</span>
                      </div>
                      <button
                        onClick={() => deleteTribute(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Delete tribute"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 7: CLOUDINARY STORAGE SETTINGS                            */}
            {/* ============================================================== */}
            {activeTab === 'cloudinary' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2E23] text-[#F3E5AB] text-xs font-serif uppercase tracking-wider mb-2">
                    <Cloud className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Free Cloud Storage Integration</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    Qindaa'ina Kuusaa Cloudinary
                  </h3>
                  <p className="text-xs text-[#5C6D66] mt-1">
                    Cloudinary suuraalee weebsaayitii bilisaan (Free 25GB) akka olkaa'aman taasisa. Kanaanis baasii Firebase Storage (Blaze plan) irraa bilisa taatu.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-6">
                  <form onSubmit={handleSaveCloudinarySettings} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Cloud Name *
                      </label>
                      <input
                        type="text"
                        value={cloudinarySettings.cloudName}
                        onChange={(e) => setCloudinarySettings({ ...cloudinarySettings, cloudName: e.target.value.trim() })}
                        placeholder="fkn: dxyz123abc"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] text-sm font-mono"
                        required
                      />
                      <p className="text-[11px] text-gray-500 mt-1">
                        Cloud Name Cloudinary Dashboard keessatti argamu galchaa.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        Upload Preset (Unsigned)
                      </label>
                      <input
                        type="text"
                        value={cloudinarySettings.uploadPreset || ''}
                        onChange={(e) => setCloudinarySettings({ ...cloudinarySettings, uploadPreset: e.target.value.trim() })}
                        placeholder="fkn: badada_memorial ykn ml_default"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] text-sm font-mono"
                      />
                      <p className="text-[11px] text-gray-500 mt-1">
                        Cloudinary Settings -&gt; Upload -&gt; Add upload preset (Signing mode: Unsigned).
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                        API Key (Optional / Server-side)
                      </label>
                      <input
                        type="text"
                        value={cloudinarySettings.apiKey || ''}
                        onChange={(e) => setCloudinarySettings({ ...cloudinarySettings, apiKey: e.target.value.trim() })}
                        placeholder="fkn: 123456789012345"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] text-sm font-mono"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs shadow hover:bg-[#16423C]"
                      >
                        <Save className="w-4 h-4 text-[#C5A059]" />
                        <span>Galmeessi (Save Settings)</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleTestCloudinary}
                        disabled={isTestingCloudinary}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#0F2E23] font-semibold text-xs border border-[#D5CAAF]"
                      >
                        {isTestingCloudinary ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3.5 h-3.5 text-[#C5A059]" />
                        )}
                        <span>Qindaa'ina Qori (Test Connection)</span>
                      </button>
                    </div>

                    {cloudinaryTestStatus && (
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                        {cloudinaryTestStatus}
                      </div>
                    )}
                  </form>

                  {/* Step-by-Step Vercel Guide */}
                  <div className="p-4 rounded-xl bg-[#0F2E23]/5 border border-[#C5A059]/30 space-y-2 text-xs">
                    <h5 className="font-serif font-bold text-[#0F2E23] flex items-center gap-2 text-sm">
                      <ExternalLink className="w-4 h-4 text-[#C5A059]" />
                      <span>Qajeelfama Vercel Environment Variables Galchuu</span>
                    </h5>
                    <ol className="list-decimal pl-4 space-y-1 text-[#5C6D66]">
                      <li>Cloudinary (<a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-medium">cloudinary.com</a>) irratti bilisaan galmaa'aa.</li>
                      <li>Vercel Dashboard seenaatii pirojektii <strong>badada</strong> banaa.</li>
                      <li><strong>Settings -&gt; Environment Variables</strong> seenaatii kenneen galchaa:</li>
                    </ol>
                    <div className="bg-black/90 text-[#F3E5AB] p-3 rounded-xl font-mono text-[11px] space-y-1">
                      <div>CLOUDINARY_CLOUD_NAME = &lt;Cloud Name keessan&gt;</div>
                      <div>CLOUDINARY_API_KEY = &lt;API Key keessan&gt;</div>
                      <div>CLOUDINARY_API_SECRET = &lt;API Secret keessan&gt;</div>
                      <div>ADMIN_PASSCODE = brw1943</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 8: FIREBASE CREDENTIALS                                    */}
            {/* ============================================================== */}
            {activeTab === 'firebase' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    {t.adminTabFirebase}
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Deetaa Firestore galmee fi seenaa maatii qabatu qindeessaa.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">projectId</label>
                      <input
                        type="text"
                        value={firebaseConfigInput.projectId}
                        readOnly
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F2E23] mb-1">authDomain</label>
                      <input
                        type="text"
                        value={firebaseConfigInput.authDomain}
                        readOnly
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 9: SECURITY & PASSCODE                                     */}
            {/* ============================================================== */}
            {activeTab === 'security' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                    Jecha Icchiitii Bulchaa (Admin Passcode)
                  </h3>
                  <p className="text-xs text-[#5C6D66]">
                    Jecha icchiitii maatii weebsaayitii ittiin bulchan jijjiiraa.
                  </p>
                </div>

                <form onSubmit={handleChangePasscode} className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                      Jecha Icchiitii Haaraa
                    </label>
                    <input
                      type="text"
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      placeholder="fkn: badada2026"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm font-mono"
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

      {/* ============================================================== */}
      {/* MODAL 1: ADD NEW PHOTO (Touch Friendly on Android, Laptop Drag) */}
      {/* ============================================================== */}
      {showAddPhotoModal && (
        <div
          onClick={() => setShowAddPhotoModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#C5A059] space-y-5 text-[#1A2421]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F2E23] flex items-center justify-center text-[#C5A059]">
                  <Upload className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F2E23]">
                  Suuraa Haaraa Olkaa'aa
                </h3>
              </div>
              <button
                onClick={() => setShowAddPhotoModal(false)}
                disabled={isPhotoUploading}
                className="p-1 rounded-lg text-gray-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Success Banner */}
            {photoUploadSuccess && (
              <div className="p-3.5 rounded-2xl bg-[#0F2E23] text-[#F3E5AB] border border-[#C5A059] flex items-start gap-2.5 text-xs animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-[#F3E5AB]">Milkaa'inaan Olkaa'ameera!</h4>
                  <p className="text-gray-200 mt-0.5">{photoUploadSuccess}</p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {photoUploadError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-red-900">Rakkoon Uumameera</h4>
                  <p className="text-red-700 mt-0.5 leading-relaxed">{photoUploadError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleUploadNewPhoto} className="space-y-4">
              {/* File Picker Zone for Android & Laptop */}
              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1.5 flex items-center justify-between">
                  <span>Suuraa Filadhaa (Android Gallery / Laptop) *</span>
                  <span className="text-[10px] text-gray-400">JPG, PNG, WEBP</span>
                </label>
                <input
                  type="file"
                  ref={photoFileInputRef}
                  onChange={handleSelectPhotoFile}
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  disabled={isPhotoUploading}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0F2E23] file:text-[#F3E5AB] hover:file:bg-[#16423C] cursor-pointer"
                  required
                />
              </div>

              {/* Live Preview */}
              {photoPreviewUrl && (
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-black/90 border border-[#C5A059] flex items-center justify-center relative">
                  <img
                    src={photoPreviewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  {selectedPhotoFile && (
                    <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 text-[#F3E5AB] px-2 py-0.5 rounded backdrop-blur">
                      {(selectedPhotoFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  )}
                </div>
              )}

              {/* Title Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Mata Duree (Title - Afaan Oromoo) *
                  </label>
                  <input
                    type="text"
                    value={photoTitleOm}
                    onChange={(e) => setPhotoTitleOm(e.target.value)}
                    placeholder="fkn: Obbo Badhaadhaa fi Maatii"
                    disabled={isPhotoUploading}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    value={photoTitleEn}
                    onChange={(e) => setPhotoTitleEn(e.target.value)}
                    placeholder="e.g. Obbo Badhaadhaa with Family"
                    disabled={isPhotoUploading}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Ibsa Gabaabaa (Caption - Afaan Oromoo) *
                </label>
                <input
                  type="text"
                  value={photoCaptionOm}
                  onChange={(e) => setPhotoCaptionOm(e.target.value)}
                  placeholder="fkn: Yeroo maatiin walitti qabamee eebbifamu..."
                  disabled={isPhotoUploading}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Ibsa Bal'aa (Description / Context)
                </label>
                <textarea
                  rows={2}
                  value={photoDescOm}
                  onChange={(e) => setPhotoDescOm(e.target.value)}
                  placeholder="Seenaa ykn bakka suuraan kun itti kaafame ibsaa..."
                  disabled={isPhotoUploading}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              {/* Date & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Bara / Guyyaa (Date)
                  </label>
                  <input
                    type="text"
                    value={photoDate}
                    onChange={(e) => setPhotoDate(e.target.value)}
                    placeholder="fkn: 1995 ykn 2005"
                    disabled={isPhotoUploading}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Ramaddii (Category)
                  </label>
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value as any)}
                    disabled={isPhotoUploading}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none bg-white"
                  >
                    <option value="maatii">Maatii (Family)</option>
                    <option value="jireenya">Jireenya (Life)</option>
                    <option value="hawaasa">Hawaasa (Community)</option>
                    <option value="yaadannoo">Yaadannoo (Memorial)</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#F0EAE1]">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoModal(false)}
                  disabled={isPhotoUploading}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  {t.cancel}
                </button>

                <button
                  type="submit"
                  disabled={isPhotoUploading || !selectedPhotoFile}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2E23] hover:bg-[#16423C] text-[#F3E5AB] font-serif font-bold text-xs shadow-md disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isPhotoUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                      <span>Olkaa'aa jira (Cloudinary)...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-[#C5A059]" />
                      <span>Olkaa'aa (Upload)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: EDIT PHOTO DETAILS                                    */}
      {/* ============================================================== */}
      {editingPhoto && (
        <div
          onClick={() => setEditingPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#C5A059] space-y-5 text-[#1A2421]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F2E23]">
                  Odeeffannoo Suuraa Gulaalaa
                </h3>
              </div>
              <button
                onClick={() => setEditingPhoto(null)}
                className="text-gray-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Thumbnail */}
            <div className="w-full h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img src={editingPhoto.url} alt="Photo" className="w-full h-full object-contain" />
            </div>

            <form onSubmit={handleSavePhotoEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Mata Duree (Afaan Oromoo)
                  </label>
                  <input
                    type="text"
                    value={editTitleOm}
                    onChange={(e) => setEditTitleOm(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    value={editTitleEn}
                    onChange={(e) => setEditTitleEn(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Ibsa Gabaabaa (Caption - Afaan Oromoo) *
                </label>
                <input
                  type="text"
                  value={editCaptionOm}
                  onChange={(e) => setEditCaptionOm(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Ibsa Bal'aa (Description)
                </label>
                <textarea
                  rows={2}
                  value={editDescOm}
                  onChange={(e) => setEditDescOm(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">Bara / Guyyaa</label>
                  <input
                    type="text"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-xs focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">Ramaddii</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CAAF] text-xs bg-white"
                  >
                    <option value="maatii">Maatii</option>
                    <option value="jireenya">Jireenya</option>
                    <option value="hawaasa">Hawaasa</option>
                    <option value="yaadannoo">Yaadannoo</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#F0EAE1]">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isPhotoUpdating}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2E23] hover:bg-[#16423C] text-[#F3E5AB] font-serif font-bold text-xs shadow-md"
                >
                  {isPhotoUpdating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                  )}
                  <span>Jijjiirama Galmeessi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
