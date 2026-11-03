import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, doc, getDoc, setDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth, Auth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseCredentials } from '../types';

const STORAGE_KEY_FIREBASE_CONFIG = 'brw_firebase_credentials';

export const getSavedFirebaseConfig = (): FirebaseCredentials | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FIREBASE_CONFIG);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read firebase config from storage', err);
  }
  
  // Also check Vite env variables if present
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
    };
  }

  return null;
};

export const saveFirebaseConfig = (config: FirebaseCredentials): void => {
  localStorage.setItem(STORAGE_KEY_FIREBASE_CONFIG, JSON.stringify(config));
};

let appInstance: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;
let authInstance: Auth | null = null;

export const initFirebase = (customConfig?: FirebaseCredentials) => {
  const config = customConfig || getSavedFirebaseConfig();
  if (!config || !config.apiKey || !config.projectId) {
    return { app: null, db: null, storage: null, auth: null, isConfigured: false };
  }

  try {
    if (getApps().length === 0) {
      appInstance = initializeApp(config);
    } else {
      appInstance = getApp();
    }

    firestoreInstance = getFirestore(appInstance);
    storageInstance = getStorage(appInstance);
    authInstance = getAuth(appInstance);

    return {
      app: appInstance,
      db: firestoreInstance,
      storage: storageInstance,
      auth: authInstance,
      isConfigured: true,
    };
  } catch (error) {
    console.warn('Firebase initialization warning:', error);
    return { app: null, db: null, storage: null, auth: null, isConfigured: false, error };
  }
};

// Initial run
const fb = initFirebase();
export const db = fb.db;
export const storage = fb.storage;
export const auth = fb.auth;
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
  signOut
};

