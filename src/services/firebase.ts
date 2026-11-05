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
import { FirebaseCredentials, PhotoItem } from '../types';

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
    // Crucial: Set max retry time to 12 seconds (default is 10 minutes / 600,000ms!)
    // This prevents the SDK from hanging when a bucket is missing, restricted, or offline
    try {
      storageInstance.maxUploadRetryTime = 12000;
      storageInstance.maxOperationRetryTime = 12000;
    } catch {
      // ignore
    }
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

// Verified image extensions & mime types per requirement: JPG, JPEG, PNG, WEBP
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

/**
 * Upload an image file to Firebase Storage and obtain the genuine download URL.
 * Strictly verifies file format (JPG, JPEG, PNG, WEBP) and size (<= 10MB).
 * Enforces timeout guard so the upload NEVER hangs indefinitely on "Olkaa'aa jira...".
 * Never saves fake or Base64 fallback URLs.
 */
export const uploadImageFile = async (
  file: File,
  folderPath: string = 'gallery'
): Promise<string> => {
  // 1. Validate file existence
  if (!file) {
    throw new Error("Maaloo suuraa filadhaa (Please select an image file).");
  }

  // 2. Validate format (JPG, JPEG, PNG, WEBP)
  const fileExt = '.' + (file.name.split('.').pop() || '').toLowerCase();
  const fileMime = (file.type || '').toLowerCase();
  const isTypeValid = ALLOWED_IMAGE_TYPES.includes(fileMime) || ALLOWED_IMAGE_EXTS.includes(fileExt);

  if (!isTypeValid) {
    throw new Error(
      "Gosa faayilii hin eeyyamamne. Maaloo suuraa JPG, JPEG, PNG ykn WEBP qofa filadhaa."
    );
  }

  // 3. Validate file size (10MB maximum)
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(
      "Guddinni suuraa baay'ee guddaadha (hanga 10MB qofa eeyyamama). Maaloo suuraa salphaa filadhaa."
    );
  }

  // 4. Check Firebase Storage initialization
  const fbCurrent = initFirebase();
  if (!fbCurrent.storage || !fbCurrent.isConfigured) {
    throw new Error(
      "Firebase Storage hin qindeeffamne. Maaloo qindaa'ina Firebase to'adhaa."
    );
  }

  // 5. Upload to Firebase Storage with timeout guard
  const sanitizedFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const storageRef = ref(fbCurrent.storage, `${folderPath}/${sanitizedFileName}`);

  try {
    // 25-second timeout promise to prevent infinite retry loop if bucket is not created or network fails
    const uploadPromise = uploadBytes(storageRef, file, {
      contentType: file.type || 'image/jpeg'
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error('timeout: Yeroon olkaa’uu dhumateera (Upload timeout). Firebase Storage to\'adhaa.')),
        25000
      )
    );

    const uploadResult = await Promise.race([uploadPromise, timeoutPromise]);
    const downloadUrl = await getDownloadURL(uploadResult.ref);

    if (!downloadUrl) {
      throw new Error("Download URL hin argamne.");
    }

    return downloadUrl;
  } catch (err: any) {
    console.error('Firebase Storage upload error:', err);
    const errCode = (err?.code || '').toLowerCase();
    const errMsg = (err?.message || '').toLowerCase();

    // Specific user-friendly Afaan Oromoo error translations
    if (errCode.includes('unauthorized') || errMsg.includes('unauthorized') || errMsg.includes('permission')) {
      throw new Error(
        "Eeyyamni Firebase Storage hin jiru (Permission Denied). Maaloo seera Storage qindeessaa ykn akka bulchaatti seenaa."
      );
    } else if (errCode.includes('quota') || errMsg.includes('quota')) {
      throw new Error("Hangi kuusaa (Storage Quota) Firebase guuteera.");
    } else if (
      errCode.includes('bucket-not-found') || 
      errMsg.includes('404') || 
      errMsg.includes('not exist') || 
      errMsg.includes('not found')
    ) {
      throw new Error(
        "Kallattiin kuusaa Firebase Storage (bedada.firebasestorage.app) Firebase Console keessatti hin banamne. Maaloo Firebase Console -> Storage -> 'Get started' jedhaa banaa."
      );
    } else if (errMsg.includes('timeout')) {
      throw new Error(
        "Yeroon suuraa olkaa'uu dhumateera (Upload Timeout). Maaloo intarneetii to'adhaatii irra deebi'aa yaalaa."
      );
    }

    throw new Error(
      err?.message || "Suuraa olkaa'uun hin milkoofne. Maaloo irra deebi'aa yaalaa."
    );
  }
};

/**
 * Save photo metadata and genuine Firebase Storage URL to Firestore 'photos' collection.
 */
export const savePhotoToFirestore = async (
  photoData: Omit<PhotoItem, 'id' | 'uploadedAt'>
): Promise<{ id: string }> => {
  const fbCurrent = initFirebase();
  if (!fbCurrent.db || !fbCurrent.isConfigured) {
    throw new Error('Cloud Firestore is not initialized or configured.');
  }

  const uploadedAt = new Date().toISOString();
  const docPayload = {
    url: photoData.url,
    caption: photoData.caption,
    date: photoData.date || new Date().getFullYear().toString(),
    category: photoData.category,
    featured: photoData.featured || false,
    uploadedAt: uploadedAt,
    createdAt: serverTimestamp()
  };

  const colRef = collection(fbCurrent.db, 'photos');
  const writePromise = addDoc(colRef, docPayload);
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Firebase timeout while saving photo to Firestore')), 10000)
  );

  const docRef = await Promise.race([writePromise, timeoutPromise]);
  return { id: docRef.id };
};

/**
 * Fetch photos from Firestore 'photos' collection.
 */
export const fetchPhotosFromFirestore = async (): Promise<PhotoItem[]> => {
  const fbCurrent = initFirebase();
  if (!fbCurrent.db || !fbCurrent.isConfigured) return [];

  try {
    const colRef = collection(fbCurrent.db, 'photos');
    const snap = await getDocs(colRef);
    const results: PhotoItem[] = [];
    snap.forEach((docItem) => {
      const data = docItem.data();
      if (data && data.url) {
        results.push({
          id: docItem.id,
          url: data.url,
          caption: data.caption || {
            om: 'Suuraa Maatii',
            en: 'Family Photograph',
            am: 'የቤተሰብ ፎቶ'
          },
          date: data.date || '',
          category: data.category || 'maatii',
          featured: data.featured || false,
          uploadedAt: data.uploadedAt || new Date().toISOString()
        });
      }
    });
    return results;
  } catch (err) {
    console.warn('Failed to fetch photos from Firestore:', err);
    return [];
  }
};

/**
 * Delete photo document from Firestore 'photos' collection.
 */
export const deletePhotoFromFirestore = async (id: string): Promise<void> => {
  const fbCurrent = initFirebase();
  if (!fbCurrent.db || !fbCurrent.isConfigured) return;
  try {
    const docRef = doc(fbCurrent.db, 'photos', id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Failed to delete photo from Firestore:', err);
  }
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
