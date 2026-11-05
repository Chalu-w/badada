import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Download, ZoomIn } from 'lucide-react';
import { PhotoItem, Language } from '../types';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  language: Language;
  onClose: () => void;
  onNavigate: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  language,
  onClose,
  onNavigate,
}) => {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasPrev) onNavigate(photos[currentIndex - 1]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasNext) onNavigate(photos[currentIndex + 1]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(photos[currentIndex - 1]);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(photos[currentIndex + 1]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrev, hasNext, photos, onClose, onNavigate]);

  const titleText = (photo.title as any)?.[language] || photo.title?.om;
  const captionText = photo.caption[language] || photo.caption.om || '';
  const descText = (photo.description as any)?.[language] || photo.description?.om;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
        title="Close (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Arrows */}
      {hasPrev && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/50 hover:bg-[#C5A059] text-white hover:text-black border border-white/20 transition-all z-10"
          title="Previous Photo"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/50 hover:bg-[#C5A059] text-white hover:text-black border border-white/20 transition-all z-10"
          title="Next Photo"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Image & Caption Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
      >
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#C5A059]/60 shadow-2xl bg-black max-h-[75vh]">
          <img
            src={photo.url}
            alt={captionText}
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>

        {/* Caption bar */}
        <div className="mt-4 text-center text-white max-w-2xl px-4 space-y-1.5">
          {titleText && (
            <h4 className="font-serif text-xl font-bold text-[#F3E5AB]">
              {titleText}
            </h4>
          )}
          <p className="font-serif text-sm font-medium text-gray-200">
            {captionText}
          </p>
          {descText && (
            <p className="text-xs text-gray-400 italic">
              {descText}
            </p>
          )}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            {photo.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> {photo.date}
              </span>
            )}
            <span className="flex items-center gap-1 capitalize">
              <Tag className="w-3.5 h-3.5 text-[#C5A059]" /> {photo.category}
            </span>
            <span className="text-gray-500 font-mono">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

