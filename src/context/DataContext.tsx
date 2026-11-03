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
  setDoc 
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
            if (data.tributes) {
              setTributes(data.tributes);
              localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(data.tributes));
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
    const newPhoto: PhotoItem = {
      ...photoData,
      id: 'photo_' + Date.now(),
      uploadedAt: new Date().toISOString()
    };
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));
    await persistFirebaseData(config, biography, updated);
    return true;
  };

  const deletePhoto = async (id: string): Promise<boolean> => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));
    await persistFirebaseData(config, biography, updated);
    return true;
  };

  const addTribute = async (tributeData: Omit<TributeItem, 'id' | 'date' | 'approved'>): Promise<boolean> => {
    const newTribute: TributeItem = {
      ...tributeData,
      id: 'tribute_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      approved: true
    };
    const updated = [newTribute, ...tributes];
    setTributes(updated);
    localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(updated));
    await persistFirebaseData(config, biography, photos, updated);
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
