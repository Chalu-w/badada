import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore, Firestore, doc, getDoc, setDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth, Auth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseCredentials } from '../types';

export const firebaseConfig: FirebaseCredentials = {
  apiKey: "AIzaSyC4gNXXc_Y6l1eZ5ep272Ig9ZqwO3LSKuA",
  authDomain: "bedada.firebaseapp.com",
  projectId: "bedada",
  storageBucket: "bedada.firebasestorage.app",
  messagingSenderId: "99232413933",
  appId: "1:99232413933:web:bdf948e3204859d670b4e4",
  measurementId: "G-KQ1EH1L7TC"
};

const STORAGE_KEY_FIREBASE_CONFIG = 'brw_firebase_credentials';

export const getSavedFirebaseConfig = (): FirebaseCredentials => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FIREBASE_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read firebase config from storage', err);
  }

  return firebaseConfig;
};

export const saveFirebaseConfig = (config: FirebaseCredentials): void => {
  localStorage.setItem(STORAGE_KEY_FIREBASE_CONFIG, JSON.stringify(config));
};

let appInstance: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;
let authInstance: Auth | null = null;
let analyticsInstance: any = null;

export const initFirebase = (customConfig?: FirebaseCredentials) => {
  const config = customConfig || getSavedFirebaseConfig();

  try {
    if (getApps().length === 0) {
      appInstance = initializeApp(config);
    } else {
      appInstance = getApp();
    }

    firestoreInstance = getFirestore(appInstance);
    storageInstance = getStorage(appInstance);
    authInstance = getAuth(appInstance);

    // Initialize analytics safely in browser if supported
    if (typeof window !== 'undefined' && config.measurementId) {
      isSupported().then((supported) => {
        if (supported && appInstance) {
          analyticsInstance = getAnalytics(appInstance);
        }
      }).catch(() => { });
    }

    return {
      app: appInstance,
      db: firestoreInstance,
      storage: storageInstance,
      auth: authInstance,
      analytics: analyticsInstance,
      isConfigured: true,
    };
  } catch (error) {
    console.warn('Firebase initialization warning:', error);
    return { app: null, db: null, storage: null, auth: null, analytics: null, isConfigured: false, error };
  }
};

// Initial run
const fb = initFirebase();
export const app = fb.app;
export const db = fb.db;
export const storage = fb.storage;
export const auth = fb.auth;
export const analytics = fb.analytics;
export const isFirebaseConfigured = fb.isConfigured;

// Firebase Storage Uploader with Base64 fallback for immediate offline preview
export const uploadImageFile = async (
  file: File,
  folderPath: string = 'gallery'
): Promise<string> => {
  const fbCurrent = initFirebase();
  if (fbCurrent.storage && fbCurrent.isConfigured) {
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const storageRef = ref(fbCurrent.storage, `${folderPath}/${fileName}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      return downloadUrl;
    } catch (e) {
      console.warn('Firebase storage upload failed, falling back to local base64:', e);
    }
  }

  // Graceful client fallback: Convert file to Base64 data URL so it displays and persists immediately!
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as base64 string'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  signInWithEmailAndPassword,
  signOut,
  deleteObject
};
