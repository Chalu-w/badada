import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Flame, Menu, X, Shield, Globe, Heart, BookOpen, Image as ImageIcon, Users, MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenCandleModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenCandleModal }) => {
  const { language, setLanguage, t } = useLanguage();
  const { config, lightCandle } = useData();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [candleJustLit, setCandleJustLit] = useState(false);

  const handleQuickCandle = async () => {
    await lightCandle();
    setCandleJustLit(true);
    setTimeout(() => setCandleJustLit(false), 2000);
  };

  const navLinks = [
    { href: '#hero', label: t.navHome, icon: Heart },
    { href: '#biography', label: t.navBiography, icon: BookOpen },
    { href: '#gallery', label: t.navGallery, icon: ImageIcon },
    { href: '#family', label: t.navFamily, icon: Users },
    { href: '#tributes', label: t.navTributes, icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A2219]/95 backdrop-blur-md border-b border-[#C5A059]/30 text-white shadow-xl transition-all">
      {/* Top Memorial Ribbon */}
      <div className="bg-[#05140F] border-b border-[#C5A059]/20 py-1.5 px-4 text-xs font-serif text-[#E5C378] tracking-widest text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block animate-pulse"></span>
        <span>YOMMIYYUU YAADATAMTA • IN ETERNAL MEMORY OF OBBO BADHAADHAA RAGGAASAA WAYYEESSAA (1943 — 2018)</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block animate-pulse"></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
            {config.logoType === 'custom' && config.customLogoUrl ? (
              <img 
                src={config.customLogoUrl} 
                alt="Logo" 
                className="w-12 h-12 object-contain rounded-full border border-[#C5A059]/40 p-0.5"
              />
            ) : (
              <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/logo-tree.svg" 
                  alt="BRW Memorial Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                />
              </div>
            )}

            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-[#F3E5AB] transition-colors leading-tight">
                BADHAADHAA RAGGAASAA
              </span>
              <span className="text-[11px] font-sans text-[#C5A059] uppercase tracking-widest font-semibold">
                Wayyeessaa • Seenaa Jireenyaa
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-[#F3E5AB] hover:bg-[#16423C]/50 transition-all duration-200 flex items-center gap-1.5"
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Actions: Candle Button, Language Switcher, Admin Button */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Quick Candle Lighting Button */}
            <button
              onClick={handleQuickCandle}
              title={t.candleAction}
              className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                candleJustLit 
                  ? 'bg-[#C5A059] text-[#0A2219] border-[#F3E5AB] scale-105 shadow-gold-glow' 
                  : 'bg-[#16423C]/70 hover:bg-[#1A4F44] text-[#F3E5AB] border-[#C5A059]/50 hover:border-[#C5A059]'
              }`}
            >
              <Flame className={`w-4 h-4 text-[#FFB020] ${candleJustLit ? 'scale-125' : 'flame-animation'}`} />
              <span>{t.candleAction}</span>
              <span className="bg-[#0A2219] text-[#E5C378] text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border border-[#C5A059]/30">
                {config.candleCount}
              </span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#071913] border border-[#C5A059]/40 rounded-full p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLanguage('om')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'om' 
                    ? 'bg-[#C5A059] text-[#081712] font-bold shadow' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Oromoo
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'en' 
                    ? 'bg-[#C5A059] text-[#081712] font-bold shadow' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('am')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'am' 
                    ? 'bg-[#C5A059] text-[#081712] font-bold shadow' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                አማ
              </button>
            </div>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-full border transition-all ${
                isAdmin 
                  ? 'bg-[#C5A059] text-[#081712] border-[#F3E5AB] shadow-gold-glow' 
                  : 'bg-[#16423C]/50 hover:bg-[#1E5649] text-gray-300 border-[#C5A059]/30 hover:text-[#F3E5AB]'
              }`}
              title={isAdmin ? "Admin Dashboard Active" : "Admin Login"}
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={handleQuickCandle}
              className="p-2 rounded-full bg-[#16423C] text-[#FFB020] border border-[#C5A059]/50"
              title={t.candleAction}
            >
              <Flame className="w-4 h-4 flame-animation" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#16423C] text-gray-200 hover:text-white border border-[#C5A059]/30"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A2219] border-b border-[#C5A059]/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between py-2 border-b border-[#16423C]">
            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#C5A059]" /> {t.changeLanguage}:
            </span>
            <div className="flex items-center bg-[#071913] border border-[#C5A059]/30 rounded-full p-0.5 text-xs">
              {(['om', 'en', 'am'] as Language[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => {
                    setLanguage(lng);
                  }}
                  className={`px-3 py-1 rounded-full uppercase font-medium ${
                    language === lng 
                      ? 'bg-[#C5A059] text-[#081712] font-bold' 
                      : 'text-gray-300'
                  }`}
                >
                  {lng}
                </button>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:text-[#F3E5AB] hover:bg-[#16423C] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#C5A059]" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Admin shortcut in mobile */}
          <div className="pt-2 border-t border-[#16423C]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#16423C] hover:bg-[#1A4F44] text-[#E5C378] text-sm font-semibold border border-[#C5A059]/40"
            >
              <Shield className="w-4 h-4" />
              <span>{t.navAdmin}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

