const STORAGE_KEY = 'signup_progress';
const EXPIRY_DAYS = 7;

export interface SignupProgress {
  goals: string[];
  experienceLevel: string;
  artForms: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newsletter: boolean;
  currentStep: number;
  savedAt: string;
}

export const autoSave = {
  save: (progress: Partial<SignupProgress>) => {
    try {
      const existing = autoSave.load();
      const updated = {
        ...existing,
        ...progress,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (err) {
      console.error('Failed to save progress:', err);
      return false;
    }
  },

  load: (): Partial<SignupProgress> | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;

      const progress = JSON.parse(saved);
      
      const savedDate = new Date(progress.savedAt);
      const daysSince = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSince > EXPIRY_DAYS) {
        autoSave.clear();
        return null;
      }

      return progress;
    } catch (err) {
      console.error('Failed to load progress:', err);
      return null;
    }
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  hasSaved: (): boolean => {
    return !!autoSave.load();
  },

  getTimeSince: (): string => {
    const progress = autoSave.load();
    if (!progress?.savedAt) return '';

    const savedDate = new Date(progress.savedAt);
    const minutesSince = Math.floor((Date.now() - savedDate.getTime()) / 60000);

    if (minutesSince < 1) return 'just now';
    if (minutesSince < 60) return `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`;
    
    const hoursSince = Math.floor(minutesSince / 60);
    if (hoursSince < 24) return `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`;
    
    const daysSince = Math.floor(hoursSince / 24);
    return `${daysSince} day${daysSince > 1 ? 's' : ''} ago`;
  },
};