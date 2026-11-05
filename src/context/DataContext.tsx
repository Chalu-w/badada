import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BiographySection, 
  FamilyMember, 
  PhotoItem, 
  TributeItem, 
  WebsiteConfig 
} from '../types';
import { 
  initialWebsiteConfig, 
  initialBiographySections, 
  initialFamilyMembers, 
  initialPhotos, 
  initialTributes 
} from '../data/initialData';
import { 
  initFirebase, 
  doc, 
  getDoc, 
  setDoc,
  collection,
  getDocs,
  saveMemorialMessageToFirestore,
  savePhotoToFirestore,
  fetchPhotosFromFirestore,
  updatePhotoInFirestore,
  deletePhotoFromFirestore
} from '../services/firebase';

interface DataContextType {
  config: WebsiteConfig;
  biography: BiographySection[];
  photos: PhotoItem[];
  tributes: TributeItem[];
  family: FamilyMember[];
  isLoading: boolean;
  isFirebaseActive: boolean;
  updateConfig: (newConfig: Partial<WebsiteConfig>) => Promise<boolean>;
  updateBiographySection: (updatedSection: BiographySection) => Promise<boolean>;
  addPhoto: (photo: Omit<PhotoItem, 'id' | 'uploadedAt'>) => Promise<boolean>;
  updatePhoto: (id: string, updatedFields: Partial<PhotoItem>) => Promise<boolean>;
  deletePhoto: (id: string) => Promise<boolean>;
  addTribute: (tribute: Omit<TributeItem, 'id' | 'date' | 'approved'>) => Promise<boolean>;
  deleteTribute: (id: string) => Promise<boolean>;
  approveTribute: (id: string) => Promise<boolean>;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => Promise<boolean>;
  deleteFamilyMember: (id: string) => Promise<boolean>;
  updateFamilyMember: (member: FamilyMember) => Promise<boolean>;
  lightCandle: () => Promise<void>;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  VERSION: 'brw_data_version_v3',
  CONFIG: 'brw_data_config',
  BIO: 'brw_data_biography',
  PHOTOS: 'brw_data_photos',
  TRIBUTES: 'brw_data_tributes',
  FAMILY: 'brw_data_family',
};

const CURRENT_VERSION = 'v3_portrait_integrated';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<WebsiteConfig>(() => {
    const v = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (v !== CURRENT_VERSION) {
      localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(initialWebsiteConfig));
      return initialWebsiteConfig;
    }
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return saved ? JSON.parse(saved) : initialWebsiteConfig;
  });

  const [biography, setBiography] = useState<BiographySection[]>(() => {
    const v = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (v !== CURRENT_VERSION) {
      localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(initialBiographySections));
      return initialBiographySections;
    }
    const saved = localStorage.getItem(STORAGE_KEYS.BIO);
    return saved ? JSON.parse(saved) : initialBiographySections;
  });

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    return saved ? JSON.parse(saved) : initialPhotos;
  });

  const [tributes, setTributes] = useState<TributeItem[]>(() => {
    const v = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (v !== CURRENT_VERSION) {
      localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(initialTributes));
      return initialTributes;
    }
    const saved = localStorage.getItem(STORAGE_KEYS.TRIBUTES);
    return saved ? JSON.parse(saved) : initialTributes;
  });

  const [family, setFamily] = useState<FamilyMember[]>(() => {
    const v = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (v !== CURRENT_VERSION) {
      localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(initialFamilyMembers));
      return initialFamilyMembers;
    }
    const saved = localStorage.getItem(STORAGE_KEYS.FAMILY);
    return saved ? JSON.parse(saved) : initialFamilyMembers;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirebaseActive, setIsFirebaseActive] = useState<boolean>(false);

  // Sync with Firestore if connected
  useEffect(() => {
    const loadFromFirebase = async () => {
      try {
        const fb = initFirebase();
        if (fb.db && fb.isConfigured) {
          setIsFirebaseActive(true);
          const docRef = doc(fb.db, 'memorial', 'website_data');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.config) {
              setConfig(data.config);
              localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(data.config));
            }
            if (data.biography) {
              setBiography(data.biography);
              localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(data.biography));
            }
            if (data.photos) {
              setPhotos(data.photos);
              localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(data.photos));
            }
          // Fetch individual photos from 'photos' Firestore collection
          try {
            const firestorePhotos = await fetchPhotosFromFirestore();
            if (firestorePhotos && firestorePhotos.length > 0) {
              setPhotos((prev) => {
                const existingMap = new Map(prev.map(p => [p.id, p]));
                const existingUrls = new Set(prev.map(p => p.url));
                firestorePhotos.forEach(item => {
                  if (!existingUrls.has(item.url)) {
                    existingMap.set(item.id, item);
                  }
                });
                const merged = Array.from(existingMap.values());
                localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(merged));
                return merged;
              });
            }
          } catch (photoColErr) {
            console.warn('Could not read photos collection:', photoColErr);
          }

          // Fetch any individual messages from 'memorial_messages' collection
          try {
            const messagesCol = collection(fb.db, 'memorial_messages');
            const messagesSnap = await getDocs(messagesCol);
            if (!messagesSnap.empty) {
              const fetchedList: TributeItem[] = [];
              messagesSnap.forEach((docItem) => {
                const itemData = docItem.data();
                fetchedList.push({
                  id: docItem.id,
                  authorName: itemData.name || itemData.authorName || 'Jaallataa',
                  relationship: itemData.relationship || 'Maatii',
                  location: itemData.location || '',
                  message: itemData.message || '',
                  date: itemData.date || (itemData.submissionDate ? itemData.submissionDate.split('T')[0] : '2026'),
                  approved: itemData.approved !== false
                });
              });

              if (fetchedList.length > 0) {
                setTributes((prev) => {
                  const existingMap = new Map(prev.map(p => [p.id, p]));
                  fetchedList.forEach(item => {
                    existingMap.set(item.id, item);
                  });
                  const merged = Array.from(existingMap.values());
                  localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(merged));
                  return merged;
                });
              }
            }
          } catch (colErr) {
            console.warn('Could not read memorial_messages collection:', colErr);
          }
            if (data.family) {
              setFamily(data.family);
              localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(data.family));
            }
          }
        }
      } catch (err) {
        console.warn('Could not sync with Firebase on load, using offline storage:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromFirebase();
  }, []);

  const persistFirebaseData = async (
    newConfig = config,
    newBio = biography,
    newPhotos = photos,
    newTributes = tributes,
    newFamily = family
  ) => {
    try {
      const fb = initFirebase();
      if (fb.db && fb.isConfigured) {
        const docRef = doc(fb.db, 'memorial', 'website_data');
        await setDoc(docRef, {
          config: newConfig,
          biography: newBio,
          photos: newPhotos,
          tributes: newTributes,
          family: newFamily,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setIsFirebaseActive(true);
      }
    } catch (e) {
      console.warn('Failed to persist to Firebase:', e);
    }
  };

  const updateConfig = async (newProps: Partial<WebsiteConfig>): Promise<boolean> => {
    const updated = { ...config, ...newProps };
    setConfig(updated);
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
    await persistFirebaseData(updated);
    return true;
  };

  const updateBiographySection = async (updatedSection: BiographySection): Promise<boolean> => {
    const updatedBio = biography.map(sec => sec.id === updatedSection.id ? updatedSection : sec);
    setBiography(updatedBio);
    localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(updatedBio));
    await persistFirebaseData(config, updatedBio);
    return true;
  };

  const addPhoto = async (photoData: Omit<PhotoItem, 'id' | 'uploadedAt'>): Promise<boolean> => {
    // 1. Save photo metadata and URL to Firestore 'photos' collection
    let photoId = 'photo_' + Date.now();
    try {
      const firestoreRes = await savePhotoToFirestore(photoData);
      if (firestoreRes && firestoreRes.id) {
        photoId = firestoreRes.id;
      }
    } catch (saveErr) {
      console.warn('Direct save to photos collection failed, falling back to document persist:', saveErr);
    }

    const newPhoto: PhotoItem = {
      ...photoData,
      id: photoId,
      uploadedAt: new Date().toISOString()
    };

    // 2. Prevent duplicate entries
    const updated = [newPhoto, ...photos.filter(p => p.id !== photoId && p.url !== photoData.url)];
    setPhotos(updated);
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));

    // 3. Persist to website_data document for fast full retrieval
    await persistFirebaseData(config, biography, updated);
    return true;
  };

  const updatePhoto = async (id: string, updatedFields: Partial<PhotoItem>): Promise<boolean> => {
    try {
      await updatePhotoInFirestore(id, updatedFields);
    } catch (updateErr) {
      console.warn('Failed to update photo in Firestore:', updateErr);
    }

    const updated = photos.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setPhotos(updated);
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));
    await persistFirebaseData(config, biography, updated);
    return true;
  };

  const deletePhoto = async (id: string): Promise<boolean> => {
    try {
      await deletePhotoFromFirestore(id);
    } catch (delErr) {
      console.warn('Failed to delete photo doc from Firestore:', delErr);
    }
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));
    await persistFirebaseData(config, biography, updated);
    return true;
  };

  const addTribute = async (tributeData: Omit<TributeItem, 'id' | 'date' | 'approved'>): Promise<boolean> => {
    const submissionDate = new Date().toISOString();
    const dateStr = submissionDate.split('T')[0];

    // Must save to Firestore per requirement 3:
    // "Save submitted memorial messages to Firestore.
    // Store name, relationship, location, message, and submission date.
    // Handle Firebase errors properly.
    // Never show a success message unless the message is actually saved."
    const saveResult = await saveMemorialMessageToFirestore({
      name: tributeData.authorName,
      relationship: tributeData.relationship,
      location: tributeData.location,
      message: tributeData.message,
      submissionDate
    });

    // ONLY reaches here if Firestore save succeeded without throwing:
    const newTribute: TributeItem = {
      ...tributeData,
      id: saveResult.id || ('tribute_' + Date.now()),
      date: dateStr,
      approved: true
    };
    const updated = [newTribute, ...tributes];
    setTributes(updated);
    localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(updated));

    // Best-effort sync to website_data doc
    try {
      await persistFirebaseData(config, biography, photos, updated);
    } catch {
      // already saved in memorial_messages collection
    }

    return true;
  };

  const deleteTribute = async (id: string): Promise<boolean> => {
    const updated = tributes.filter(t => t.id !== id);
    setTributes(updated);
    localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(updated));
    await persistFirebaseData(config, biography, photos, updated);
    return true;
  };

  const approveTribute = async (id: string): Promise<boolean> => {
    const updated = tributes.map(t => t.id === id ? { ...t, approved: true } : t);
    setTributes(updated);
    localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(updated));
    await persistFirebaseData(config, biography, photos, updated);
    return true;
  };

  const addFamilyMember = async (memberData: Omit<FamilyMember, 'id'>): Promise<boolean> => {
    const newMember: FamilyMember = {
      ...memberData,
      id: 'fam_' + Date.now()
    };
    const updated = [...family, newMember];
    setFamily(updated);
    localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(updated));
    await persistFirebaseData(config, biography, photos, tributes, updated);
    return true;
  };

  const deleteFamilyMember = async (id: string): Promise<boolean> => {
    const updated = family.filter(f => f.id !== id);
    setFamily(updated);
    localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(updated));
    await persistFirebaseData(config, biography, photos, tributes, updated);
    return true;
  };

  const updateFamilyMember = async (member: FamilyMember): Promise<boolean> => {
    const updated = family.map(f => f.id === member.id ? member : f);
    setFamily(updated);
    localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(updated));
    await persistFirebaseData(config, biography, photos, tributes, updated);
    return true;
  };

  const lightCandle = async (): Promise<void> => {
    const newCount = (config.candleCount || 0) + 1;
    const updatedConfig = { ...config, candleCount: newCount };
    setConfig(updatedConfig);
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updatedConfig));
    await persistFirebaseData(updatedConfig);
  };

  const resetToDefaults = () => {
    setConfig(initialWebsiteConfig);
    setBiography(initialBiographySections);
    setPhotos(initialPhotos);
    setTributes(initialTributes);
    setFamily(initialFamilyMembers);
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(initialWebsiteConfig));
    localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(initialBiographySections));
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(initialPhotos));
    localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(initialTributes));
    localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(initialFamilyMembers));
  };

  return (
    <DataContext.Provider
      value={{
        config,
        biography,
        photos,
        tributes,
        family,
        isLoading,
        isFirebaseActive,
        updateConfig,
        updateBiographySection,
        addPhoto,
        updatePhoto,
        deletePhoto,
        addTribute,
        deleteTribute,
        approveTribute,
        addFamilyMember,
        deleteFamilyMember,
        updateFamilyMember,
        lightCandle,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
