import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Heart, Shield, ArrowUp, Flame, BookOpen, Image as ImageIcon, Users } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { t } = useLanguage();
  const { config } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05140F] text-white border-t-4 border-[#C5A059] relative overflow-hidden">
      
      {/* Decorative Gold Border Gradient */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Logo & Identity (5 Cols) */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              {config.logoType === 'custom' && config.customLogoUrl ? (
                <img 
                  src={config.customLogoUrl} 
                  alt="Logo" 
                  className="w-16 h-16 object-contain rounded-full border border-[#C5A059]"
                />
              ) : (
                <img 
                  src="/logo-tree.svg" 
                  alt="BRW Memorial Logo" 
                  className="w-16 h-16 object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
                />
              )}
              <div>
                <h3 className="font-serif font-bold text-lg text-white tracking-wider">
                  BADHAADHAA RAGGAASAA
                </h3>
                <p className="text-xs font-mono text-[#C5A059] tracking-widest font-semibold uppercase">
                  Wayyeessaa (1943 — 2018)
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto md:mx-0">
              {t.footerInMemoriam} Weebsaayitii seenaa, dhaala, fi yaadannoo jireenya Obbo Badhaadhaa Raggaasaa Wayyeessaatiif qophaa'e.
            </p>

            <div className="text-[11px] text-[#C5A059]">
              <span>📍 {config.memorialAddress || 'Oromiyaa, Finfinnee'}</span>
            </div>
          </div>

          {/* Quick Navigation Links (4 Cols) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-2 text-sm text-gray-300">
            <h4 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider mb-2">
              Kutaalee Weebsaayitii
            </h4>
            <a href="#hero" className="hover:text-[#F3E5AB] transition-colors">
              • {t.navHome}
            </a>
            <a href="#biography" className="hover:text-[#F3E5AB] transition-colors">
              • {t.navBiography} (Kutaa 13)
            </a>
            <a href="#gallery" className="hover:text-[#F3E5AB] transition-colors">
              • {t.navGallery}
            </a>
            <a href="#family" className="hover:text-[#F3E5AB] transition-colors">
              • {t.navFamily}
            </a>
            <a href="#tributes" className="hover:text-[#F3E5AB] transition-colors">
              • {t.navTributes}
            </a>
          </div>

          {/* Actions & Scroll to top (3 Cols) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end space-y-4">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-[#16423C] hover:bg-[#1E5649] text-[#F3E5AB] border border-[#C5A059]/40 shadow-lg transition-transform hover:-translate-y-1"
              title="Gara Olitti Deebi'i (Back to Top)"
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071913] hover:bg-[#16423C] text-[#C5A059] hover:text-[#F3E5AB] text-xs font-semibold border border-[#C5A059]/30 transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Giddugala Bulchiinsaa (Admin)</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-[#16423C] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {t.footerRights}
          </p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Kabajaa fi Jaalalaan Kan Qophaa'e</span>
            <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
          </div>
        </div>

      </div>
    </footer>
  );
};

