import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { uploadImageFile } from '../services/firebase';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Calendar, 
  ZoomIn, 
  Tag, 
  Upload, 
  ShieldCheck 
} from 'lucide-react';
import { PhotoItem } from '../types';
import { PhotoLightbox } from './PhotoLightbox';

export const Gallery: React.FC = () => {
  const { language, t } = useLanguage();
  const { photos, addPhoto, deletePhoto } = useData();
  const { isAdmin } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New photo form state
  const [newCaptionOm, setNewCaptionOm] = useState('');
  const [newCaptionEn, setNewCaptionEn] = useState('');
  const [newCaptionAm, setNewCaptionAm] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<'maatii' | 'jireenya' | 'hawaasa' | 'yaadannoo'>('maatii');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: t.galleryCategoryAll },
    { id: 'maatii', label: t.galleryCategoryFamily },
    { id: 'jireenya', label: t.galleryCategoryLife },
    { id: 'hawaasa', label: t.galleryCategoryCommunity },
    { id: 'yaadannoo', label: t.galleryCategoryMemorial },
  ];

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Mee suuraa filadhaa / Please select an image');
      return;
    }

    try {
      setIsUploading(true);
      const uploadedUrl = await uploadImageFile(selectedFile, 'gallery');

      await addPhoto({
        url: uploadedUrl,
        caption: {
          om: newCaptionOm || 'Suuraa Maatii',
          en: newCaptionEn || newCaptionOm || 'Family Photograph',
          am: newCaptionAm || newCaptionOm || 'የቤተሰብ ፎቶ',
        },
        date: newDate || new Date().getFullYear().toString(),
        category: newCategory,
        featured: false,
      });

      // Reset
      setSelectedFile(null);
      setPreviewUrl('');
      setNewCaptionOm('');
      setNewCaptionEn('');
      setNewCaptionAm('');
      setNewDate('');
      setShowUploadModal(false);
    } catch (err) {
      console.error('Failed to upload photo', err);
      alert('Suuraa olkaahuun hin danda\'amne.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Suuraa kana balleessuu barbaadduu? / Delete this photo?')) {
      await deletePhoto(id);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white text-[#1A2421] border-b border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0F2E23] text-[#F3E5AB] text-xs font-serif tracking-widest uppercase">
            <ImageIcon className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Suuraalee Dhugaa • Real Family Photos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0F2E23] tracking-tight">
            {t.galleryHeading}
          </h2>

          <p className="max-w-2xl mx-auto text-base text-[#5C6D66] font-sans">
            {t.gallerySubheading}
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mt-4"></div>
        </div>

        {/* Category Filter Tabs & Add Photo Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#F0EAE1]">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0F2E23] text-[#F3E5AB] shadow-md'
                    : 'bg-[#FAF7F2] text-[#5C6D66] hover:bg-[#F3EFE6] hover:text-[#0F2E23]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DFBE76] text-[#0A2219] font-serif font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.galleryAddPhoto}</span>
          </button>
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((item) => {
              const caption = item.caption[language] || item.caption.om;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="group relative rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DFC9] shadow-sm hover:shadow-memorial cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Photo Frame */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#0A2219] relative">
                    <img
                      src={item.url}
                      alt={caption}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[11px] bg-[#C5A059] text-[#0A2219] font-bold px-2 py-0.5 rounded-md uppercase">
                          <ZoomIn className="w-3 h-3" /> Ilaali
                        </span>
                        {item.date && (
                          <span className="text-[11px] text-gray-200 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#C5A059]" /> {item.date}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Admin Delete Icon */}
                    {isAdmin && (
                      <button
                        onClick={(e) => handleDeletePhoto(item.id, e)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 shadow-md transition-all opacity-0 group-hover:opacity-100 z-10"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Caption & Metadata Footer */}
                  <div className="p-4 bg-white border-t border-[#F0EAE1]">
                    <p className="font-serif text-sm font-semibold text-[#0F2E23] line-clamp-2">
                      {caption}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-[#5C6D66]">
                      <span className="capitalize font-mono text-[11px] text-[#C5A059] font-bold">
                        #{item.category}
                      </span>
                      {item.date && <span>{item.date}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Gallery Prompt */
          <div className="bg-[#FAF7F2] rounded-3xl p-12 text-center border-2 border-dashed border-[#D5CAAF] max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0F2E23] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F2E23]">
              Suuraan Ammaaf Hin Jiru
            </h3>
            <p className="text-sm text-[#5C6D66] leading-relaxed">
              {t.galleryEmpty}
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-sm shadow hover:bg-[#16423C] transition-all"
            >
              <Upload className="w-4 h-4 text-[#C5A059]" />
              <span>Suuraa Olkaa'aa</span>
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        photos={filteredPhotos}
        language={language}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={(p) => setSelectedPhoto(p)}
      />

      {/* Upload Photo Modal */}
      {showUploadModal && (
        <div
          onClick={() => setShowUploadModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#C5A059]/40 space-y-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2E23]">
                  {t.galleryAddPhoto}
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* File Selector */}
              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Suuraa Filadhaa (Choose Photo File) *
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0F2E23] file:text-[#F3E5AB] hover:file:bg-[#16423C] cursor-pointer"
                  required
                />
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="w-full h-40 rounded-xl overflow-hidden bg-black border border-[#C5A059]">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Caption in Afaan Oromoo */}
              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Ibsa Suuraa (Caption - Afaan Oromoo) *
                </label>
                <input
                  type="text"
                  value={newCaptionOm}
                  onChange={(e) => setNewCaptionOm(e.target.value)}
                  placeholder="fkn: Obbo Badhaadhaa maatii isaanii wajjin..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  required
                />
              </div>

              {/* Caption in English */}
              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Caption (English)
                </label>
                <input
                  type="text"
                  value={newCaptionEn}
                  onChange={(e) => setNewCaptionEn(e.target.value)}
                  placeholder="e.g. Obbo Badhaadhaa surrounded by his loved ones..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
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
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="fkn: 1995 ykn 2005"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CAAF] text-sm focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Ramaddii (Category)
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CAAF] text-sm focus:ring-2 focus:ring-[#C5A059] focus:outline-none bg-white"
                  >
                    <option value="maatii">Maatii (Family)</option>
                    <option value="jireenya">Jireenya (Life)</option>
                    <option value="hawaasa">Hawaasa (Community)</option>
                    <option value="yaadannoo">Yaadannoo (Memorial)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#F0EAE1]">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 rounded-xl bg-[#0F2E23] hover:bg-[#16423C] text-[#F3E5AB] font-serif font-bold text-xs shadow-md disabled:opacity-50"
                >
                  {isUploading ? 'Olkaahaa jira...' : 'Olkaa\'aa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

