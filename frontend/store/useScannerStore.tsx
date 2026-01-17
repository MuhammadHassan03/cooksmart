import { create } from "zustand";

export const useScannerStore = create((set) => ({
  suggestedRecipes: [],
  expiringItems: [],
  aiNudges: [],
  isLoading: false,

  fetchHomeScreenData: async () => {
    set({ isLoading: true });
    try {
      //   const { recipes, expiring, nudges } = await fetchHomeData()
      //   set({
      //     suggestedRecipes: recipes,
      //     expiringItems: expiring,
      //     aiNudges: nudges,
      //     isLoading: false
      //   })
    } catch (error) {
      console.error("Failed to load home screen data:", error);
      set({ isLoading: false });
    }
  },
}));
