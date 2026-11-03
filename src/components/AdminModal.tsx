import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Shield, Key, Lock, X, AlertCircle } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { BiographySection } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEditSection?: BiographySection | null;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, initialEditSection }) => {
  const { t } = useLanguage();
  const { isAdmin, loginWithPassword } = useAuth();

  const [inputVal, setInputVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [useEmailAuth, setUseEmailAuth] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (!isOpen) return null;

  // If already authenticated, show the Admin Dashboard directly!
  if (isAdmin) {
    return <AdminDashboard onClose={onClose} initialEditSection={initialEditSection} />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoggingIn(true);

    try {
      const result = await loginWithPassword(inputVal, useEmailAuth ? passwordVal : undefined);
      if (!result.success) {
        setErrorMsg(result.error || 'Jechi icchiitii dogoggoraadha.');
      }
    } catch (err) {
      setErrorMsg('Galmee irratti rakkoon uumameera.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-[#C5A059] space-y-6 text-[#1A2421]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F2E23] flex items-center justify-center text-[#F3E5AB]">
              <Shield className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0F2E23]">
                {t.adminLoginTitle}
              </h3>
              <p className="text-xs text-[#5C6D66]">
                Bulchiinsa Weebsaayitii Obbo Badhaadhaa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {!useEmailAuth ? (
            <div>
              <label className="block text-xs font-bold text-[#0F2E23] mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t.adminPasswordLabel}</span>
              </label>
              <input
                type="password"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Jecha icchiitii (Passcode: brw1943)"
                className="w-full px-4 py-3 rounded-xl border border-[#D5CAAF] bg-[#FAF7F2] text-sm focus:ring-2 focus:ring-[#C5A059] focus:bg-white focus:outline-none transition-all font-mono"
                required
                autoFocus
              />
              <p className="text-[11px] text-gray-500 mt-1 italic">
                Jecha icchiitii maatii: <strong className="text-[#0F2E23]">brw1943</strong> ykn Firebase password.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Imeelii Bulchaa (Admin Email)
                </label>
                <input
                  type="email"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="admin@family.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CAAF] text-sm font-sans"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                  Jecha Icchiitii (Password)
                </label>
                <input
                  type="password"
                  value={passwordVal}
                  onChange={(e) => setPasswordVal(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CAAF] text-sm"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 rounded-xl bg-[#0F2E23] hover:bg-[#16423C] text-[#F3E5AB] font-serif font-bold text-sm shadow-lg flex items-center justify-center gap-2 border border-[#C5A059]/40 transition-all active:scale-98 disabled:opacity-50"
          >
            <Lock className="w-4 h-4 text-[#C5A059]" />
            <span>{isLoggingIn ? 'Seenaa jira...' : t.adminLoginBtn}</span>
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setUseEmailAuth(!useEmailAuth);
                setErrorMsg(null);
                setInputVal('');
                setPasswordVal('');
              }}
              className="text-xs text-[#5C6D66] hover:text-[#0F2E23] underline"
            >
              {useEmailAuth ? 'Karaa Passcode qofaan seeni' : 'Karaa Firebase Email fi Password seeni'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

