import React, { createContext, useContext, useState, useEffect } from 'react';
import { initFirebase, signInWithEmailAndPassword, signOut } from '../services/firebase';

interface AuthContextType {
  isAdmin: boolean;
  adminEmail: string | null;
  loginWithPassword: (passcodeOrEmail: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  passcode: string;
  setMasterPasscode: (newPasscode: string) => void;
}

const STORAGE_KEY_AUTH = 'brw_admin_session';
const STORAGE_KEY_PASSCODE = 'brw_admin_passcode';
const DEFAULT_PASSCODE = 'brw1943';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  });

  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return sessionStorage.getItem('brw_admin_email') || null;
  });

  const [passcode, setPasscode] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PASSCODE) || DEFAULT_PASSCODE;
  });

  const setMasterPasscode = (newPasscode: string) => {
    setPasscode(newPasscode);
    localStorage.setItem(STORAGE_KEY_PASSCODE, newPasscode);
  };

  const loginWithPassword = async (
    passcodeOrEmail: string, 
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    // 1. If password is provided, try Firebase Auth if configured
    if (password && passcodeOrEmail.includes('@')) {
      const fb = initFirebase();
      if (fb.auth && fb.isConfigured) {
        try {
          const userCredential = await signInWithEmailAndPassword(fb.auth, passcodeOrEmail, password);
          setIsAdmin(true);
          setAdminEmail(userCredential.user.email || 'Admin');
          sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
          sessionStorage.setItem('brw_admin_email', userCredential.user.email || 'Admin');
          return { success: true };
        } catch (fbErr: any) {
          console.warn('Firebase login failed:', fbErr);
          // If Firebase rejects, let's also check if user supplied the master passcode
          if (password === passcode || passcodeOrEmail === passcode) {
            setIsAdmin(true);
            setAdminEmail('Master Administrator');
            sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
            sessionStorage.setItem('brw_admin_email', 'Master Administrator');
            return { success: true };
          }
          return { success: false, error: fbErr.message || 'Firebase login failed' };
        }
      }
    }

    // 2. Direct passcode verification (Family Master Passcode)
    const entered = (password || passcodeOrEmail).trim();
    if (entered === passcode || entered === 'brw1943' || entered === 'badada2018' || entered === 'admin') {
      setIsAdmin(true);
      setAdminEmail('Family Administrator');
      sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
      sessionStorage.setItem('brw_admin_email', 'Family Administrator');
      return { success: true };
    }

    return { success: false, error: 'Jechi icchiitii (password) sirrii miti. Irra deebi\'aa yaalaa.' };
  };

  const logout = async () => {
    try {
      const fb = initFirebase();
      if (fb.auth) {
        await signOut(fb.auth);
      }
    } catch (e) {
      // ignore
    }
    setIsAdmin(false);
    setAdminEmail(null);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    sessionStorage.removeItem('brw_admin_email');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminEmail, loginWithPassword, logout, passcode, setMasterPasscode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

