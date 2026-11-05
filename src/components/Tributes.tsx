import React, { useState, useId } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Send, 
  Heart, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Quote, 
  User,
  Users,
  Loader2,
  Sparkles
} from 'lucide-react';

export const Tributes: React.FC = () => {
  const { language, t } = useLanguage();
  const { tributes, addTribute, deleteTribute } = useData();
  const { isAdmin } = useAuth();
  const formId = useId();

  // Form Fields
  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  // Touched state for inline validation
  const [touched, setTouched] = useState({
    authorName: false,
    relationship: false,
    message: false,
  });

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Field Validations (Reject empty or whitespace-only)
  const isAuthorNameValid = authorName.trim().length >= 2;
  const isRelationshipValid = relationship.trim().length >= 2;
  const isMessageValid = message.trim().length >= 3;

  // Complete Form Validity
  const isFormValid = isAuthorNameValid && isRelationshipValid && isMessageValid;
  const canSubmit = isFormValid && !isSubmitting;

  // Common quick-pick relationships for Afaan Oromoo users
  const quickRelationships = [
    'Ilma',
    'Intala',
    'Akaakayyuu',
    'Fira / Maatii',
    'Hiriyaa',
    'Jaarsa Biyyaa'
  ];

  const handleBlur = (field: 'authorName' | 'relationship' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      authorName: true,
      relationship: true,
      message: true,
    });

    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);
    setErrorDetails(null);

    try {
      // Must save to Firestore. Will strictly throw if Firestore backend fails
      await addTribute({
        authorName: authorName.trim(),
        relationship: relationship.trim(),
        location: location.trim() || undefined,
        message: message.trim(),
        verified: false,
      });

      // Exactly as requested in requirement 4:
      // "After successful submission, display:
      //  'Ergaan yaadannoo keessan milkaa'inaan ergameera. Galatoomaa.'
      //  After successful submission, clear the form."
      setSubmitSuccess(true);
      setSubmitError(null);
      setErrorDetails(null);

      // Clear the form completely
      setAuthorName('');
      setRelationship('');
      setLocation('');
      setMessage('');
      setTouched({
        authorName: false,
        relationship: false,
        message: false,
      });

      // Auto dismiss success notice after 8 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 8000);
    } catch (err: any) {
      console.error('Memorial message submission error:', err);
      // Exactly as requested in requirement 4:
      // "If submission fails, display:
      //  'Ergaa erguun hin milkoofne. Maaloo irra deebi'aa yaalaa.'"
      setSubmitSuccess(false);
      setSubmitError("Ergaa erguun hin milkoofne. Maaloo irra deebi'aa yaalaa.");

      // If Cloud Firestore permissions or setup error, provide actionable info
      const errStr = `${err?.code || ''} ${err?.message || ''}`.toLowerCase();
      if (errStr.includes('permission') || errStr.includes('permission_denied') || errStr.includes('permission-denied')) {
        setErrorDetails(
          "Heeyyama Firestore: Seera Firestore (Security Rules) Firebase Console (bedada -> Firestore Database -> Rules) keessatti 'allow read, create: if true;' gochuun eeyyamaa."
        );
      } else if (errStr.includes('cloud firestore api') || errStr.includes('disabled')) {
        setErrorDetails(
          "Cloud Firestore Database Firebase Console (bedada) keessatti hin banamne."
        );
      } else if (errStr.includes('timeout')) {
        setErrorDetails("Walqunnamsiifni intarneetii ykn Firebase daqiiqaa muraasaaf tursiiseera.");
      }
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2E23] text-[#F3E5AB] text-xs font-serif tracking-widest uppercase shadow-md border border-[#C5A059]/40">
            <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Yaadannoo Bara Baraan • Eternal Memorial Tributes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0F2E23] tracking-tight">
            Yaadannoo fi Dhaamsa Jireenyaa
          </h2>

          <p className="max-w-2xl mx-auto text-base text-[#5C6D66] font-sans">
            {t.tributesSubheading}
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Tributes Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#C5A059]/30">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2E23] flex items-center gap-2.5">
                <MessageSquare className="w-6 h-6 text-[#C5A059]" />
                <span>Dhaamsa Maatii fi Hiriyootaa ({tributes.length})</span>
              </h3>
              <span className="text-xs text-[#5C6D66] font-medium hidden sm:inline">
                Yaadannoo dhalootaaf
              </span>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
              {tributes.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFC9] shadow-sm hover:shadow-memorial transition-all duration-300 relative group"
                >
                  <Quote className="w-10 h-10 text-[#C5A059]/15 absolute top-5 right-5 pointer-events-none" />

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0F2E23] to-[#16423C] text-[#F3E5AB] font-serif font-bold text-base flex items-center justify-center border border-[#C5A059]/50 shadow-md flex-shrink-0">
                        {item.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-serif font-bold text-base sm:text-lg text-[#0F2E23]">
                            {item.authorName}
                          </h4>
                          {item.verified && (
                            <span 
                              className="inline-flex items-center gap-1 text-[10px] bg-[#16423C] text-[#F3E5AB] px-2 py-0.5 rounded-full font-mono font-semibold border border-[#C5A059]/30" 
                              title="Maatii / Family Verified"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#C5A059]" /> Maatii
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#C5A059] font-medium flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{item.relationship}</span>
                        </p>
                      </div>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-300 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        title="Delete tribute"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="text-[#2C3E37] text-sm sm:text-base leading-relaxed font-sans mb-4 text-justify italic pl-1 border-l-2 border-[#C5A059]/30">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#5C6D66] pt-3 border-t border-[#F0EAE1]">
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
                <div className="bg-white rounded-3xl p-10 text-center text-[#5C6D66] border border-[#E8DFC9] space-y-2">
                  <p className="font-serif text-lg text-[#0F2E23]">Dhaamsi ammaaf hin jiru.</p>
                  <p className="text-xs">Isin dura ta'aatii dhaamsa keessan maatii wajjin qooddadhaa!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Memorial Message Submission Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059] shadow-memorial sticky top-24">
              
              {/* Form Heading Banner */}
              <div className="mb-6 space-y-1.5 pb-4 border-b border-[#F0EAE1]">
                <div className="inline-flex items-center gap-1.5 text-xs font-serif text-[#C5A059] uppercase tracking-wider font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dhaamsa Keessan Dhiyeessaa</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F2E23]">
                  {t.tributesLeaveMessage}
                </h3>
                <p className="text-xs text-[#5C6D66] leading-relaxed">
                  Yaadannoo, eebba, fi jaalala Obbo Badhaadhaa Raggaasaaf qabdan maatii wajjin qooddadhaa.
                </p>
              </div>

              {/* Success Notification Alert */}
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-[#0F2E23] text-[#F3E5AB] border-2 border-[#C5A059] shadow-gold-glow animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#C5A059] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#F3E5AB] mb-0.5">
                        Ergaan Yaadannoo Ergameera!
                      </h4>
                      <p className="text-xs text-gray-200 leading-relaxed font-sans">
                        Ergaan yaadannoo keessan milkaa'inaan ergameera. Galatoomaa.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Notification Alert */}
              {submitError && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-800 shadow-md animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-red-900 mb-0.5">
                        Rakkoon Uumameera
                      </h4>
                      <p className="text-xs text-red-800 leading-relaxed font-sans">
                        {submitError}
                      </p>
                      {errorDetails && (
                        <p className="text-[11px] text-red-700 mt-2 bg-red-100/70 p-2 rounded-lg font-mono leading-tight">
                          {errorDetails}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submission Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* 1. Full Name (Required) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor={`${formId}-name`} 
                      className="text-xs font-bold text-[#0F2E23] flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Maqaa Guutuu</span>
                      <span className="text-red-500 font-bold" title="Dirqama">*</span>
                    </label>
                    <span className="text-[11px] text-gray-400">Dirqama</span>
                  </div>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    onBlur={() => handleBlur('authorName')}
                    placeholder="fkn: Caalaa Raggaasaa"
                    autoComplete="name"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      touched.authorName && !isAuthorNameValid
                        ? 'border-red-400 bg-red-50/40 focus:ring-red-400'
                        : isAuthorNameValid
                        ? 'border-[#C5A059] bg-white focus:ring-[#C5A059]'
                        : 'border-[#D5CAAF] bg-[#FAF7F2] focus:ring-[#C5A059] focus:bg-white'
                    }`}
                  />
                  {touched.authorName && !isAuthorNameValid && (
                    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Maqaan guutuun barbaachisaadha (duwwaa ta'uu hin danda'u).</span>
                    </p>
                  )}
                </div>

                {/* 2. Relationship (Required) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor={`${formId}-relation`} 
                      className="text-xs font-bold text-[#0F2E23] flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Walitti Dhufeenya</span>
                      <span className="text-red-500 font-bold" title="Dirqama">*</span>
                    </label>
                    <span className="text-[11px] text-gray-400">Dirqama</span>
                  </div>
                  <input
                    id={`${formId}-relation`}
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    onBlur={() => handleBlur('relationship')}
                    placeholder="fkn: Ilma, Intala, Akaakayyuu, Fira, Hiriyaa..."
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      touched.relationship && !isRelationshipValid
                        ? 'border-red-400 bg-red-50/40 focus:ring-red-400'
                        : isRelationshipValid
                        ? 'border-[#C5A059] bg-white focus:ring-[#C5A059]'
                        : 'border-[#D5CAAF] bg-[#FAF7F2] focus:ring-[#C5A059] focus:bg-white'
                    }`}
                  />

                  {/* Quick-Pick Relationship Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {quickRelationships.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => {
                          setRelationship(chip);
                          setTouched((prev) => ({ ...prev, relationship: true }));
                        }}
                        disabled={isSubmitting}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                          relationship === chip
                            ? 'bg-[#0F2E23] text-[#F3E5AB] border-[#C5A059] font-bold shadow-sm'
                            : 'bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#5C6D66] border-[#D5CAAF]'
                        }`}
                      >
                        +{chip}
                      </button>
                    ))}
                  </div>

                  {touched.relationship && !isRelationshipValid && (
                    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Walitti dhufeenyi keessan maatii wajjin qabdan barbaachisaadha.</span>
                    </p>
                  )}
                </div>

                {/* 3. Location (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor={`${formId}-location`} 
                      className="text-xs font-bold text-[#0F2E23] flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Bakka / Teessoo</span>
                    </label>
                    <span className="text-[11px] text-gray-400">Dirqama Miti (Optional)</span>
                  </div>
                  <input
                    id={`${formId}-location`}
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="fkn: Finfinnee, Meettaa Walqixxee, USA..."
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5CAAF] bg-[#FAF7F2] text-sm focus:ring-2 focus:ring-[#C5A059] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* 4. Memorial Message (Required) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor={`${formId}-message`} 
                      className="text-xs font-bold text-[#0F2E23] flex items-center gap-1.5"
                    >
                      <Quote className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Ergaa Yaadannoo</span>
                      <span className="text-red-500 font-bold" title="Dirqama">*</span>
                    </label>
                    <span className="text-[11px] text-gray-400">
                      {message.trim().length > 0 ? `${message.trim().length} qubee` : 'Dirqama'}
                    </span>
                  </div>
                  <textarea
                    id={`${formId}-message`}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="Ergaa ykn yaadannoo jaalalaa Obbo Badhaadhaaf qabdan asitti barreessaa..."
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      touched.message && !isMessageValid
                        ? 'border-red-400 bg-red-50/40 focus:ring-red-400'
                        : isMessageValid
                        ? 'border-[#C5A059] bg-white focus:ring-[#C5A059]'
                        : 'border-[#D5CAAF] bg-[#FAF7F2] focus:ring-[#C5A059] focus:bg-white'
                    }`}
                  />
                  {touched.message && !isMessageValid && (
                    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Ergaan yaadannoo guutamuu qaba (duwwaa ta'uu hin danda'u).</span>
                    </p>
                  )}
                </div>

                {/* Submit Button Section */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full py-4 px-6 rounded-2xl font-serif font-bold text-base shadow-lg flex items-center justify-center gap-2.5 border-2 transition-all duration-300 ${
                      canSubmit
                        ? 'bg-gradient-to-r from-[#0F2E23] via-[#16423C] to-[#0F2E23] text-[#F3E5AB] border-[#C5A059] hover:border-[#F3E5AB] hover:shadow-gold-glow hover:scale-[1.01] active:scale-[0.98] cursor-pointer'
                        : 'bg-[#EFE8DA] text-[#8C9B94] border-[#D5CAAF] cursor-not-allowed opacity-75'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#F3E5AB]" />
                        <span>Ergaa jira...</span>
                      </>
                    ) : (
                      <>
                        <Send className={`w-5 h-5 ${canSubmit ? 'text-[#C5A059]' : 'text-[#8C9B94]'}`} />
                        <span>Ergaa Ergi</span>
                      </>
                    )}
                  </button>

                  {/* Informative Guidance if form is incomplete */}
                  {!isFormValid && (
                    <p className="text-[11px] text-center text-[#5C6D66] mt-2 font-medium">
                      Buttooni "Ergaa Ergi" kan banamu yeroo Maqaa, Walitti dhufeenya fi Ergaan guutaman qofadha.
                    </p>
                  )}
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
