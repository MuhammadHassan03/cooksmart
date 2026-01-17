import { db } from '../client';
import api from '@/services/api';

export const syncManager = {
  pushLocalChanges: async () => {
    // 1. Grab everything the user changed while offline
    const dirtyData = db.getAllSync<{category: string, value: string}>(
      'SELECT category, value FROM user_preferences WHERE is_dirty = 1'
    );

    if (dirtyData.length === 0) return;

    // 2. Format it for your Backend
    const formatted = dirtyData.reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = [];
      acc[curr.category].push(curr.value);
      return acc;
    }, {} as any);

    try {
      // 3. Hit your /auth/complete-onboarding route
      await api.post('/auth/complete-onboarding', { preferences: formatted });

      // 4. If successful, mark as clean
      db.runSync('UPDATE user_preferences SET is_dirty = 0');
      console.log('Successfully synced offline changes');
    } catch (error) {
      console.error('Sync failed - will try again later', error);
    }
  }
};