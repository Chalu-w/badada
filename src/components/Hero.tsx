import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { uploadImageFile } from '../services/firebase';
import { BookOpen, Image as ImageIcon, Flame, Calendar, Upload, Award, Heart, Loader2 } from 'lucide-react';

interface HeroProps {
  onOpenUploadModal?: () => void;
  onOpenCandleModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCandleModal }) => {
  const { language, t } = useLanguage();
  const { config, updateConfig, lightCandle } = useData();
  const { isAdmin } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPortraitUploading, setIsPortraitUploading] = useState(false);

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isAdmin) {
      alert("Suuraa duraa jijjiiruuf eeyyama bulchaa (Administrator) barbaachisa. Maaloo mallattoo 'Admin' cuqaasuun dura seenaa.");
      return;
    }

    try {
      setIsPortraitUploading(true);
      const downloadUrl = await uploadImageFile(file, 'portraits');
      await updateConfig({ heroPortraitUrl: downloadUrl });
      alert("Suuraan Obbo Badhaadhaa milkaa'inaan jijjiirameera.");
    } catch (err: any) {
      console.error('Portrait upload failed', err);
      alert(err?.message || 'Suuraa olkaahuun hin danda\'amne. Irra deebi\'aa yaalaa.');
    } finally {
      setIsPortraitUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] bg-dark-pattern text-white overflow-hidden flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#C5A059]">
      {/* Decorative Gold & Emerald Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#16423C]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Center Portrait Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            
            {/* Antique Memorial Frame */}
            <div className="relative group">
              {/* Outer Golden Aura Ring */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#9A7B38] via-[#F3E5AB] to-[#C5A059] rounded-2xl opacity-75 blur-md group-hover:opacity-100 transition duration-700 animate-pulse"></div>
              
              {/* Inner Frame */}
              <div className="relative w-72 sm:w-80 md:w-84 aspect-[4/5] rounded-2xl bg-[#071913] p-3 shadow-2xl border-2 border-[#C5A059]/80 flex flex-col items-center justify-center overflow-hidden">
                
                {config.heroPortraitUrl ? (
                  <div className="w-full h-full relative rounded-xl overflow-hidden border border-[#C5A059]/40 group">
                    <img 
                      src={config.heroPortraitUrl} 
                      alt={config.personName}
                      className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2219]/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                ) : (
                  /* Dignified Memorial Silhouette & Upload Callout */
                  <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#0F2E23] to-[#06140F] border border-[#C5A059]/30 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-[#C5A059] p-2 mb-4 bg-[#0A2219] flex items-center justify-center shadow-gold-glow">
                      <img 
                        src="/logo-tree.svg" 
                        alt="Memorial Crest" 
                        className="w-full h-full object-contain filter drop-shadow"
                      />
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-[#F3E5AB] mb-1">
                      Suuraa Obbo Badhaadhaa
                    </h4>
                    <p className="text-xs text-gray-300 mb-4 max-w-[200px] leading-relaxed">
                      {t.heroUploadPortraitPrompt}
                    </p>
                    
                    {/* Direct Upload Button for Family */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handlePortraitUpload} 
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" 
                      className="hidden" 
                      disabled={isPortraitUploading}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isPortraitUploading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A059] hover:bg-[#DFBE76] text-[#0A2219] text-xs font-bold tracking-wide shadow-lg transition-transform active:scale-95 disabled:opacity-50"
                    >
                      {isPortraitUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Olkaa'aa jira...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Suuraa Olkaa'aa</span>
                        </>
                      )}
                    </button>
                    <span className="text-[10px] text-[#C5A059]/80 mt-2 italic">
                      (Suuraa dhugaa qofa)
                    </span>
                  </div>
                )}

                {/* Ribbon Nameplate Below Image */}
                <div className="absolute bottom-4 left-6 right-6 bg-[#071913]/95 backdrop-blur-md border border-[#C5A059] rounded-lg py-1.5 px-3 shadow-lg">
                  <p className="text-[11px] font-mono tracking-widest text-[#E5C378] uppercase font-bold">
                    {config.honorific} {config.personName}
                  </p>
                </div>
              </div>
            </div>

            {/* Change Portrait Button if already uploaded */}
            {config.heroPortraitUrl && (
              <div className="mt-3">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePortraitUpload} 
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" 
                  className="hidden" 
                  disabled={isPortraitUploading}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPortraitUploading}
                  className="text-xs text-[#E5C378] hover:text-white flex items-center gap-1.5 underline decoration-[#C5A059] transition-colors disabled:opacity-50"
                >
                  {isPortraitUploading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Olkaa'aa jira...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3 h-3" /> Suuraa Jijjiiri
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Quick Memorial Candle Counter */}
            <div className="mt-5 flex items-center gap-2 bg-[#0E281F] border border-[#C5A059]/40 rounded-full px-4 py-1.5 shadow-md">
              <Flame className="w-4 h-4 text-[#FFB020] flame-animation" />
              <span className="text-xs text-gray-200">
                <strong className="text-[#F3E5AB] font-mono text-sm">{config.candleCount}</strong> {t.candlesLit}
              </span>
              <button 
                onClick={lightCandle} 
                className="ml-2 text-xs font-bold text-[#E5C378] hover:text-white underline cursor-pointer"
              >
                +1 {t.candleAction}
              </button>
            </div>
          </div>

          {/* Right Text Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Honorary Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16423C]/70 border border-[#C5A059]/60 text-[#F3E5AB] text-xs font-serif tracking-wider shadow">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>SEEENAA FI YAADANNOO BOONSAA • MEMORIAL TRIBUTE</span>
            </div>

            {/* Hero Full Name */}
            <div className="space-y-2">
              <span className="block text-sm sm:text-base font-serif tracking-widest text-[#C5A059] uppercase font-semibold">
                {config.honorific}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
                <span className="gold-text-gradient">{config.personName}</span>
              </h1>
            </div>

            {/* Life Years Badge & Verification Notice */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 py-2">
              <div className="flex items-center gap-2 bg-[#0A2219] border-2 border-[#C5A059] px-4 py-2 rounded-xl shadow-lg">
                <Calendar className="w-5 h-5 text-[#C5A059]" />
                <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-white">
                  1943 — 07/04/2018
                </span>
              </div>

              <div className="text-[11px] text-gray-300 bg-[#16423C]/50 px-3 py-1.5 rounded-lg border border-[#C5A059]/30 italic max-w-xs">
                ⚠️ {t.heroVerifyDatesBadge}
              </div>
            </div>

            {/* Memorial Quote Box */}
            <div className="relative bg-[#0E281F]/80 border-l-4 border-[#C5A059] p-5 rounded-r-xl shadow-xl backdrop-blur-sm">
              <p className="font-serif italic text-base sm:text-lg text-gray-100 leading-relaxed">
                "{config.heroQuote[language] || config.heroQuote.om}"
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-[#E5C378]">
                <span className="font-semibold">— Dhaamsa fi Yaadannoo Maatii</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#E5C378] fill-[#E5C378]" /> Kabajaan Yaadatama
                </span>
              </div>
            </div>

            {/* Prominent Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Button 1: Seenaa Isaa Dubbisi */}
              <a
                href="#biography"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#0A2219] font-serif font-bold text-base tracking-wide shadow-xl hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                <span>{t.heroBtnBiography}</span>
              </a>

              {/* Button 2: Suuraalee Ilaali */}
              <a
                href="#gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#16423C] hover:bg-[#1E5649] text-white border-2 border-[#C5A059] font-serif font-semibold text-base tracking-wide shadow-lg hover:border-[#F3E5AB] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <ImageIcon className="w-5 h-5 text-[#C5A059]" />
                <span>{t.heroBtnGallery}</span>
              </a>
            </div>

            {/* Quick Tribute Link */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-300">
              <a href="#tributes" className="hover:text-[#F3E5AB] underline transition-colors">
                ✍️ Dhaamsa keessan barreessaa (Leave a Tribute)
              </a>
              <span>•</span>
              <a href="#family" className="hover:text-[#F3E5AB] underline transition-colors">
                🌳 Muka Maatii Ilaali (View Family Tree)
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

