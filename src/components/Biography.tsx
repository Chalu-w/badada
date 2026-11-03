import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Printer, 
  BookMarked, 
  Edit3, 
  CheckCircle2, 
  Share2,
  Calendar,
  Heart
} from 'lucide-react';
import { BiographySection } from '../types';

interface BiographyProps {
  onEditSection?: (section: BiographySection) => void;
}

export const Biography: React.FC<BiographyProps> = ({ onEditSection }) => {
  const { language, t } = useLanguage();
  const { biography } = useData();
  const { isAdmin } = useAuth();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    seensa: true,
    'dhalootaafi-maatii': true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'chapters' | 'book'>('chapters');

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    biography.forEach((sec) => {
      allExpanded[sec.id] = true;
    });
    setExpandedSections(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredSections = biography.filter((sec) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const title = (sec.title[language] || sec.title.om).toLowerCase();
    const content = (sec.content[language] || sec.content.om).toLowerCase();
    const subtitle = (sec.subtitle?.[language] || sec.subtitle?.om || '').toLowerCase();
    return title.includes(q) || content.includes(q) || subtitle.includes(q);
  });

  return (
    <section id="biography" className="py-20 bg-cream-pattern text-[#1A2421] border-b border-[#C5A059]/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0F2E23] text-[#F3E5AB] text-xs font-serif tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Kutaa 13 • Official Biography</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0F2E23] tracking-tight">
            {t.bioHeading}
          </h2>
          
          <p className="max-w-2xl mx-auto text-base text-[#5C6D66] font-sans">
            {t.bioSubheading}
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mt-4"></div>
        </div>

        {/* Toolbar: Search, Jump Index, View Mode Switcher, Expand/Collapse */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-memorial border border-[#E8DFC9] mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C6D66]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.bioSearchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CAAF] bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black font-semibold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode & Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'chapters' ? 'book' : 'chapters')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  viewMode === 'book'
                    ? 'bg-[#0F2E23] text-[#F3E5AB] border-[#0F2E23]'
                    : 'bg-white text-[#0F2E23] border-[#D5CAAF] hover:border-[#C5A059]'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>{viewMode === 'book' ? 'Kutaaleen Ilaali' : t.bioReadMode}</span>
              </button>

              {viewMode === 'chapters' && (
                <>
                  <button
                    onClick={expandAll}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F3EFE6] border border-[#D5CAAF] text-[#0F2E23] transition-colors"
                  >
                    {t.bioExpandAll}
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F3EFE6] border border-[#D5CAAF] text-[#0F2E23] transition-colors"
                  >
                    {t.bioCollapseAll}
                  </button>
                </>
              )}

              <button
                onClick={handlePrint}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F3EFE6] border border-[#D5CAAF] text-[#0F2E23] flex items-center gap-1.5 transition-colors"
                title="Print / Save Biography"
              >
                <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Jump Badges (13 sections) */}
          <div className="pt-2 border-t border-[#F0EAE1]">
            <p className="text-xs font-semibold text-[#5C6D66] mb-2 flex items-center gap-1">
              <span>{t.bioJumpTo}:</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {biography.map((sec, index) => {
                const titleText = sec.title[language] || sec.title.om;
                // Clean title prefix (e.g. "1. Seensa" -> "1. Seensa")
                return (
                  <a
                    key={sec.id}
                    href={`#sec-${sec.id}`}
                    onClick={() => {
                      setExpandedSections((prev) => ({ ...prev, [sec.id]: true }));
                    }}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#0F2E23] hover:text-[#F3E5AB] text-[#1A2421] border border-[#E0D7C4] transition-all"
                  >
                    {titleText}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================== VIEW MODE 1: CHAPTERS ACCORDION ===================== */}
        {viewMode === 'chapters' && (
          <div className="space-y-4">
            {filteredSections.map((sec) => {
              const isOpen = !!expandedSections[sec.id];
              const title = sec.title[language] || sec.title.om;
              const content = sec.content[language] || sec.content.om;
              const subtitle = sec.subtitle?.[language] || sec.subtitle?.om;
              const quote = sec.quote?.[language] || sec.quote?.om;

              return (
                <div
                  key={sec.id}
                  id={`sec-${sec.id}`}
                  className="bg-white rounded-2xl border border-[#E8DFC9] shadow-sm hover:shadow-memorial transition-all duration-300 overflow-hidden"
                >
                  {/* Chapter Header Button */}
                  <div
                    onClick={() => toggleSection(sec.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none bg-gradient-to-r from-white hover:to-[#FAF7F2] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Chapter Number Badge */}
                      <span className="w-10 h-10 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm border border-[#C5A059]/40">
                        {sec.order}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F2E23]">
                          {title}
                        </h3>
                        {subtitle && (
                          <p className="text-xs sm:text-sm text-[#5C6D66] font-sans mt-0.5">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isAdmin && onEditSection && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditSection(sec);
                          }}
                          className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#0F2E23] text-gray-500 hover:text-[#F3E5AB] border border-[#D5CAAF] transition-colors"
                          title="Gulaali / Edit section"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div className="p-1.5 rounded-full bg-[#FAF7F2] text-[#0F2E23]">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#C5A059]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#5C6D66]" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Chapter Content Body */}
                  {isOpen && (
                    <div className="px-5 pb-6 pt-2 sm:px-8 sm:pb-8 border-t border-[#F0EAE1] bg-white animate-fadeIn">
                      <div className="prose prose-emerald max-w-none">
                        {content.split('\n\n').map((paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-[#2C3E37] text-base leading-relaxed mb-4 font-sans text-justify"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Honorary Quote in Chapter */}
                      {quote && (
                        <div className="mt-6 bg-[#FAF7F2] border-l-4 border-[#C5A059] p-4 rounded-r-xl">
                          <p className="font-serif italic text-sm text-[#0F2E23] leading-relaxed">
                            "{quote}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredSections.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFC9]">
                <p className="text-[#5C6D66] font-serif text-lg">
                  Wanti barbaaddan hin argamne: "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#0F2E23] text-[#F3E5AB] text-xs font-semibold"
                >
                  Barbaacha Qulqulleessi
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===================== VIEW MODE 2: CONTINUOUS BOOK READING ===================== */}
        {viewMode === 'book' && (
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-memorial border border-[#E8DFC9] space-y-12 max-w-4xl mx-auto">
            <div className="text-center pb-8 border-b-2 border-[#C5A059]/40 space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0F2E23]">
                SEENAA JIREENYAA GUUTUU
              </h3>
              <p className="font-serif text-[#C5A059] italic text-base">
                Obbo Badhaadhaa Raggaasaa Wayyeessaa (1943 — 2018)
              </p>
            </div>

            {filteredSections.map((sec, i) => {
              const title = sec.title[language] || sec.title.om;
              const content = sec.content[language] || sec.content.om;
              const quote = sec.quote?.[language] || sec.quote?.om;

              return (
                <article key={sec.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#0F2E23]">
                      {title}
                    </span>
                    <div className="flex-1 h-px bg-[#E8DFC9]"></div>
                  </div>

                  <div className="text-[#2C3E37] text-base sm:text-lg leading-relaxed font-sans text-justify space-y-4">
                    {content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {i === 0 && pIdx === 0 ? (
                          <>
                            <span className="float-left text-5xl font-serif font-bold text-[#0F2E23] pr-3 pt-1 leading-none">
                              {paragraph.charAt(0)}
                            </span>
                            {paragraph.slice(1)}
                          </>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>

                  {quote && (
                    <blockquote className="my-6 pl-4 border-l-4 border-[#C5A059] italic text-[#0F2E23] font-serif text-base bg-[#FAF7F2] p-3 rounded-r-xl">
                      "{quote}"
                    </blockquote>
                  )}

                  {i < filteredSections.length - 1 && (
                    <div className="flex items-center justify-center pt-8 text-[#C5A059]">
                      <span className="text-sm">✦ ✦ ✦</span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

