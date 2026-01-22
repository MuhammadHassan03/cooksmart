import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

// SecureStore wrapper for Zustand persistence
const secureStorage = {
  getItem: (name: string) => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string) => SecureStore.setItemAsync(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};

interface FreemiumState {
  currentPlan: 'free' | 'premium';
  // Usage tracking for trials (as per doc)
  usageStats: {
    fridgeScans: number;    // Limit: 3 
    recipeGenerations: number; // Limit: few 
    groceryExports: number; // Limit: 1-2 [cite: 58]
  };
  
  // Actions
  setPlan: (plan: 'free' | 'premium') => void;
  incrementUsage: (key: keyof FreemiumState['usageStats']) => void;
  canUseFeature: (featureId: string) => boolean;
}

export const useFreemiumStore = create<FreemiumState>()(
  persist(
    (set, get) => ({
      currentPlan: 'free',
      usageStats: {
        fridgeScans: 0,
        recipeGenerations: 0,
        groceryExports: 0,
      },

      setPlan: (plan) => set({ currentPlan: plan }),

      incrementUsage: (key) => set((state) => ({
        usageStats: { ...state.usageStats, [key]: state.usageStats[key] + 1 }
      })),

      canUseFeature: (featureId) => {
        const { currentPlan, usageStats } = get();
        if (currentPlan === 'premium') return true;

        // Strict Trial Logic from Project Doc [cite: 9, 24, 43, 58]
        switch (featureId) {
          case 'FRIDGE_SCANNER':
            return usageStats.fridgeScans < 3; // 
          case 'AI_RECIPES':
            return usageStats.recipeGenerations < 5; // 
          case 'GROCERY_EXPORT':
            return usageStats.groceryExports < 2; // [cite: 58]
          case 'MEAL_PLANNER':
            return false; // Premium only after trial [cite: 64]
          default:
            return true; // Basic features like Ingredient Manager are free [cite: 30]
        }
      },
    }),
    {
      name: 'user-auth-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);