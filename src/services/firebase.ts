import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { 
  getFirestore, 
  Firestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore';
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

export interface MemorialMessageData {
  name: string;
  relationship: string;
  location?: string;
  message: string;
  submissionDate?: string;
}

/**
 * Save memorial message to Firestore 'memorial_messages' collection.
 * Storing name, relationship, location, message, and submission date.
 * Strictly throws if Firebase rejects or fails to save.
 */
export const saveMemorialMessageToFirestore = async (
  messageData: MemorialMessageData
): Promise<{ id: string }> => {
  const fbCurrent = initFirebase();
  if (!fbCurrent.db || !fbCurrent.isConfigured) {
    throw new Error('Cloud Firestore is not initialized or configured.');
  }

  const cleanName = messageData.name.trim();
  const cleanRelationship = messageData.relationship.trim();
  const cleanLocation = messageData.location?.trim() || '';
  const cleanMessage = messageData.message.trim();
  const submissionDate = messageData.submissionDate || new Date().toISOString();

  if (!cleanName || !cleanRelationship || !cleanMessage) {
    throw new Error('Required fields are missing or whitespace-only.');
  }

  const docPayload = {
    name: cleanName,
    authorName: cleanName,
    relationship: cleanRelationship,
    location: cleanLocation,
    message: cleanMessage,
    submissionDate: submissionDate,
    date: submissionDate.split('T')[0],
    approved: true,
    createdAt: submissionDate
  };

  const colRef = collection(fbCurrent.db, 'memorial_messages');

  // Timeout promise (8 seconds) to prevent infinite pending state if Firestore backend is unreachable
  const writePromise = addDoc(colRef, docPayload);
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Firebase network timeout while writing memorial message')), 8000)
  );

  const docRef = await Promise.race([writePromise, timeoutPromise]);
  return { id: docRef.id };
};

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
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  signInWithEmailAndPassword,
  signOut,
  deleteObject
};
