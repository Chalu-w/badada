import { CloudinarySettings } from '../types';

const STORAGE_KEY_CLOUDINARY = 'brw_cloudinary_settings';
const DEFAULT_FOLDER = 'badada_memorial/gallery';

// Verified image formats: JPG, JPEG, PNG, WEBP
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

/**
 * Retrieve saved Cloudinary settings from localStorage
 */
export const getSavedCloudinaryConfig = (): CloudinarySettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLOUDINARY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.cloudName) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read Cloudinary config from storage', err);
  }

  // Fallback to environment variables if provided
  return {
    cloudName: (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: (import.meta as any).env?.VITE_CLOUDINARY_UPLOAD_PRESET || 'badada_memorial',
    apiKey: (import.meta as any).env?.VITE_CLOUDINARY_API_KEY || ''
  };
};

/**
 * Persist Cloudinary settings to localStorage
 */
export const saveCloudinaryConfig = (config: CloudinarySettings): void => {
  localStorage.setItem(STORAGE_KEY_CLOUDINARY, JSON.stringify(config));
};

/**
 * Convert a File object to Base64 data URL
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Faayilii jijjiiruun hin danda\'amne (Failed to encode file).'));
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

/**
 * Upload an image to Cloudinary securely.
 * 
 * 1. Primary: Uses server-side Vercel Serverless Function (/api/upload).
 *    Never exposes API secrets in client code.
 * 2. Fallback: If client-side unsigned preset is configured, uploads directly to Cloudinary.
 * 3. Saves image URL in Firebase Firestore.
 */
export const uploadImageToCloudinary = async (
  file: File,
  folderPath: string = DEFAULT_FOLDER
): Promise<string> => {
  // 1. Validate file existence
  if (!file) {
    throw new Error('Maaloo dura suuraa filadhaa (Please select an image file).');
  }

  // 2. Validate format (JPG, JPEG, PNG, WEBP)
  const fileExt = '.' + (file.name.split('.').pop() || '').toLowerCase();
  const fileMime = (file.type || '').toLowerCase();
  const isTypeValid = ALLOWED_MIME_TYPES.includes(fileMime) || ALLOWED_EXTENSIONS.includes(fileExt);

  if (!isTypeValid) {
    throw new Error(
      'Gosa faayilii hin eeyyamamne. Maaloo suuraa JPG, JPEG, PNG ykn WEBP qofa filadhaa.'
    );
  }

  // 3. Validate size (Max 15MB)
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(
      "Guddinni suuraa baay'ee guddaadha (hanga 15MB qofa eeyyamama). Maaloo suuraa salphaa filadhaa."
    );
  }

  // Retrieve current admin passcode for authorization
  const adminPasscode = 
    localStorage.getItem('brw_admin_passcode') || 
    sessionStorage.getItem('brw_admin_passcode') || 
    'brw1943';

  // 4. Primary: Attempt secure server-side upload via /api/upload
  try {
    const base64Data = await fileToBase64(file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s timeout

    const apiResponse = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminPasscode}`
      },
      body: JSON.stringify({
        file: base64Data,
        folder: folderPath
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data: any = await apiResponse.json().catch(() => null);

    if (apiResponse.ok && data?.success && data?.url) {
      return data.url;
    }

    // If server returned an actionable error message
    if (data?.error && !data.error.includes('CLOUDINARY_CLOUD_NAME is not configured')) {
      throw new Error(`Server Upload Error: ${data.error}`);
    }
  } catch (serverErr: any) {
    // If it was an explicit abort or permission error, throw directly
    if (serverErr?.name === 'AbortError') {
      throw new Error("Yeroon suuraa olkaa'uu dhumateera (Upload Timeout). Maaloo intarneetii to'adhaa.");
    }
    console.warn('Server-side upload attempt notification, checking direct preset:', serverErr.message);
  }

  // 5. Client-Side Fallback using Cloudinary Unsigned Preset (No Secret Exposed!)
  const localConfig = getSavedCloudinaryConfig();
  if (localConfig.cloudName && localConfig.uploadPreset) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', localConfig.uploadPreset);
      formData.append('folder', folderPath);

      const directRes = await fetch(
        `https://api.cloudinary.com/v1_1/${localConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const directData: any = await directRes.json();
      if (directRes.ok && (directData.secure_url || directData.url)) {
        return directData.secure_url || directData.url;
      }

      if (directData?.error?.message) {
        throw new Error(directData.error.message);
      }
    } catch (directErr: any) {
      console.error('Direct Cloudinary preset upload error:', directErr);
      throw new Error(
        `Cloudinary Upload Error: ${directErr?.message || "Suuraa olkaa'uun hin milkoofne."}`
      );
    }
  }

  // If both server and client lacked configuration
  throw new Error(
    "Cloudinary hin qindeeffamne! Maaloo Vercel Environment Variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) galchaa, ykn Admin Dashboard -> 'Cloudinary Settings' keessatti qindeessaa."
  );
};
