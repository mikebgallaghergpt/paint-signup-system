const STORAGE_KEY = 'gallagher_signup_progress';
const EXPIRY_DAYS = 7;

export const autoSave = {
  save: (data: any) => {
    console.log('🔵 AUTO-SAVE: Saving data', data);
    const item = {
      data,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
      console.log('✅ AUTO-SAVE: Successfully saved');
    } catch (error) {
      console.error('❌ AUTO-SAVE: Failed', error);
    }
  },

  load: () => {
    console.log('🔍 AUTO-SAVE: Loading...');
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        console.log('⚠️ AUTO-SAVE: No data found');
        return null;
      }

      const item = JSON.parse(stored);
      const now = Date.now();
      const daysSince = (now - item.timestamp) / (1000 * 60 * 60 * 24);

      if (daysSince > EXPIRY_DAYS) {
        console.log('⏰ AUTO-SAVE: Expired, clearing');
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      console.log('✅ AUTO-SAVE: Loaded', item.data);
      return item.data;
    } catch (error) {
      console.error('❌ AUTO-SAVE: Load failed', error);
      return null;
    }
  },

  clear: () => {
    console.log('🗑️ AUTO-SAVE: Clearing');
    localStorage.removeItem(STORAGE_KEY);
  },

  getTimeSince: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return '';

    const item = JSON.parse(stored);
    const now = Date.now();
    const minutesSince = Math.floor((now - item.timestamp) / (1000 * 60));

    if (minutesSince < 1) return 'just now';
    if (minutesSince === 1) return '1 minute ago';
    if (minutesSince < 60) return `${minutesSince} minutes ago`;

    const hoursSince = Math.floor(minutesSince / 60);
    if (hoursSince === 1) return '1 hour ago';
    if (hoursSince < 24) return `${hoursSince} hours ago`;

    const daysSince = Math.floor(hoursSince / 24);
    if (daysSince === 1) return '1 day ago';
    return `${daysSince} days ago`;
  },
};