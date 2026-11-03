import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Send, 
  Heart, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Trash2, 
  Quote, 
  User 
} from 'lucide-react';

export const Tributes: React.FC = () => {
  const { language, t } = useLanguage();
  const { tributes, addTribute, deleteTribute } = useData();
  const { isAdmin } = useAuth();

  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) {
      alert('Maaloo maqaa fi dhaamsa keessan barreessaa.');
      return;
    }

    try {
      setIsSubmitting(true);
      await addTribute({
        authorName: authorName.trim(),
        relationship: relationship.trim() || 'Jaallataa',
        location: location.trim() || 'Oromiyaa',
        message: message.trim(),
        verified: false,
      });

      setSubmitSuccess(true);
      setAuthorName('');
      setRelationship('');
      setLocation('');
      setMessage('');

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting tribute', err);
      alert('Dhaamsa erguun hin danda\'amne. Irra deebi\'aa yaalaa.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Dhaamsa kana balleessuu barbaadduu? / Delete this message?')) {
      await deleteTribute(id);
    }
  };

  return (
    <section id="tributes" className="py-20 bg-cream-pattern text-[#1A2421] border-b border-[#C5A059]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0F2E23] text-[#F3E5AB] text-xs font-serif tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Yaadannoo Bara Baraan • Eternal Tributes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0F2E23] tracking-tight">
            Yaadannoo fi Dhaamsa Jireenyaa
          </h2>

          <p className="max-w-2xl mx-auto text-base text-[#5C6D66] font-sans">
            {t.tributesSubheading}
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Tributes Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC9]">
              <h3 className="font-serif text-xl font-bold text-[#0F2E23] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C5A059]" />
                <span>Dhaamsa Maatii fi Hiriyootaa ({tributes.length})</span>
              </h3>
            </div>

            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2">
              {tributes.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-[#E8DFC9] shadow-sm hover:shadow-memorial transition-all duration-300 relative group"
                >
                  <Quote className="w-8 h-8 text-[#C5A059]/20 absolute top-4 right-4" />

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-sm flex items-center justify-center border border-[#C5A059]/50 shadow-sm">
                        {item.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-base text-[#0F2E23]">
                            {item.authorName}
                          </h4>
                          {item.verified && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] bg-[#16423C] text-[#F3E5AB] px-1.5 py-0.5 rounded font-mono font-semibold" title="Maatii / Family Verified">
                              <CheckCircle className="w-3 h-3 text-[#C5A059]" /> Maatii
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#C5A059] font-medium">
                          {item.relationship}
                        </p>
                      </div>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-300 hover:text-red-600 transition-colors p-1"
                        title="Delete tribute"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="text-[#2C3E37] text-sm sm:text-base leading-relaxed font-sans mb-3 text-justify italic">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#5C6D66] pt-2 border-t border-[#F0EAE1]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{item.date}</span>
                    </div>

                    {item.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {tributes.length === 0 && (
                <div className="bg-white rounded-2xl p-8 text-center text-[#5C6D66] border border-[#E8DFC9]">
                  Dhaamsi ammaaf hin jiru. Isin dura ta'aa barreessaa!
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Leave a Tribute Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059]/40 shadow-memorial sticky top-28">
              
              <div className="mb-6 space-y-1">
                <span className="text-xs font-serif text-[#C5A059] uppercase tracking-wider font-bold">
                  Dhaamsa Keessan Dhiyeessaa
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                  {t.tributesLeaveMessage}
                </h3>
                <p className="text-xs text-[#5C6D66]">
                  Yaadannoo, eebba, fi jaalala Obbo Badhaadhaaf qabdan maatii wajjin qooddadhaa.
                </p>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-[#0F2E23] text-[#F3E5AB] text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                  <span>{t.tributesFormSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    {t.tributesFormName} *
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="fkn: Caalaa Raggaasaa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] bg-[#FAF7F2] text-sm focus:ring-2 focus:ring-[#C5A059] focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    {t.tributesFormRelation}
                  </label>
                  <input
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="fkn: Ilma, Intala, Akaakayyuu, Hiriyaa..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] bg-[#FAF7F2] text-sm focus:ring-2 focus:ring-[#C5A059] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    {t.tributesFormLocation}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="fkn: Finfinnee, Naqamte, USA..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] bg-[#FAF7F2] text-sm focus:ring-2 focus:ring-[#C5A059] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    {t.tributesFormMessage} *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.tributesFormMessage}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CAAF] bg-[#FAF7F2] text-sm focus:ring-2 focus:ring-[#C5A059] focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0F2E23] to-[#16423C] hover:from-[#16423C] hover:to-[#1E5649] text-[#F3E5AB] font-serif font-bold text-sm shadow-lg flex items-center justify-center gap-2 border border-[#C5A059]/40 transition-all active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#C5A059]" />
                  <span>{isSubmitting ? 'Ergaa jira...' : t.tributesFormSubmit}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

