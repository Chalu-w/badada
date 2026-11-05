export type Language = 'om' | 'en' | 'am';

export interface BiographySection {
  id: string;
  order: number;
  title: {
    om: string;
    en: string;
    am: string;
  };
  content: {
    om: string;
    en: string;
    am: string;
  };
  subtitle?: {
    om?: string;
    en?: string;
    am?: string;
  };
  iconName?: string;
  quote?: {
    om?: string;
    en?: string;
    am?: string;
  };
}

export interface PhotoItem {
  id: string;
  url: string;
  title?: {
    om: string;
    en?: string;
    am?: string;
  };
  caption: {
    om: string;
    en: string;
    am: string;
  };
  description?: {
    om?: string;
    en?: string;
    am?: string;
  };
  date?: string;
  category: 'maatii' | 'jireenya' | 'hawaasa' | 'yaadannoo';
  featured?: boolean;
  uploadedAt: string;
  storageProvider?: 'cloudinary' | 'firebase';
}

export interface CloudinarySettings {
  cloudName: string;
  uploadPreset?: string;
  apiKey?: string;
}

export interface TributeItem {
  id: string;
  authorName: string;
  relationship: string;
  location?: string;
  message: string;
  date: string;
  avatarColor?: string;
  verified?: boolean;
  approved: boolean;
}

export interface FamilyMember {
  id: string;
  fullName: string;
  relationship: string; // e.g. 'Haadha Manootaa', 'Ilma', 'Intala', 'Akaakayyuu'
  generation: 1 | 2 | 3; // 1 = Obbo Badhaadhaa & Spouse, 2 = Children, 3 = Grandchildren
  birthYear?: string;
  notes?: string;
  photoUrl?: string;
}

export interface WebsiteConfig {
  personName: string;
  honorific: string; // "Obbo"
  birthDate: string; // "1943"
  birthDateNote: string; // "Qorannoo maatiin kan mirkanaa'u"
  deathDate: string; // "07/04/2018"
  deathDateNote: string; // "Akka lakkoofsa Itoophiyaatti ykn Gregorian calendar"
  heroQuote: {
    om: string;
    en: string;
    am: string;
  };
  heroPortraitUrl: string;
  logoType: 'svg' | 'custom';
  customLogoUrl?: string;
  candleCount: number;
  primaryContact?: string;
  memorialAddress?: string;
  metaTitle: string;
}

export interface FirebaseCredentials {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

