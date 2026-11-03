import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Flame, Heart, Sparkles } from 'lucide-react';

export const CandleSection: React.FC = () => {
  const { t } = useLanguage();
  const { config, lightCandle } = useData();
  const [justLit, setJustLit] = useState(false);

  const handleLightCandle = async () => {
    await lightCandle();
    setJustLit(true);
    setTimeout(() => setJustLit(false), 3000);
  };

  return (
    <section className="py-16 bg-[#071913] text-white border-b-2 border-[#C5A059]/40 relative overflow-hidden">
      {/* Golden Aura Background */}
      <div className="absolute inset-0 bg-radial-gradient from-[#C5A059]/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
        
        {/* Animated Candle Visual */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-28 h-40 flex flex-col items-center justify-end">
            
            {/* Candle Flame */}
            <div className="relative mb-1">
              {/* Flame Outer Glow */}
              <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-md animate-pulse"></div>
              {/* Flame Core */}
              <div className="w-6 h-12 bg-gradient-to-t from-[#FF7A00] via-[#FFAE00] to-[#FFF380] rounded-[50%_50%_40%_40%/70%_70%_30%_30%] flame-animation shadow-[0_0_20px_#FFAE00]"></div>
              {/* Blue flame base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2.5 bg-blue-500/80 rounded-full blur-[1px]"></div>
            </div>

            {/* Candle Wick */}
            <div className="w-1 h-3 bg-black rounded-full"></div>

            {/* Candle Body */}
            <div className="w-16 h-24 bg-gradient-to-r from-[#DFBE76] via-[#FAF7F2] to-[#C5A059] rounded-t-lg shadow-2xl border-t border-[#FFF380] flex flex-col items-center justify-between py-2">
              <div className="w-10 h-0.5 bg-[#C5A059]/50 rounded-full"></div>
              <span className="font-serif text-[10px] text-[#0F2E23] font-bold tracking-widest">
                BRW
              </span>
              <div className="w-12 h-1 bg-[#9A7B38]/40 rounded-full"></div>
            </div>

            {/* Candle Stand / Base */}
            <div className="w-24 h-3 bg-[#9A7B38] rounded-full shadow-lg border border-[#C5A059]"></div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            {t.candleAction} (Virtual Memorial Candle)
          </h3>
          <p className="text-sm text-gray-300 max-w-lg mx-auto">
            {t.candleBlessing}
          </p>
        </div>

        {/* Candle Action Button */}
        <div>
          <button
            onClick={handleLightCandle}
            className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-serif font-bold text-sm tracking-wide shadow-xl transition-all duration-300 transform active:scale-95 ${
              justLit
                ? 'bg-[#C5A059] text-[#071913] scale-105 shadow-gold-glow'
                : 'bg-gradient-to-r from-[#16423C] to-[#0F2E23] hover:from-[#1E5649] hover:to-[#16423C] text-[#F3E5AB] border-2 border-[#C5A059]'
            }`}
          >
            <Flame className="w-5 h-5 text-[#FFB020] flame-animation" />
            <span>{justLit ? t.candleLitSuccess : t.candleAction}</span>
            <span className="bg-[#071913] text-[#F3E5AB] px-2.5 py-0.5 rounded-full font-mono text-xs border border-[#C5A059]/50">
              {config.candleCount}
            </span>
          </button>
        </div>

        {justLit && (
          <p className="text-xs text-[#E5C378] font-serif italic animate-fadeIn flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> {t.candleThankYou}
          </p>
        )}

      </div>
    </section>
  );
};

