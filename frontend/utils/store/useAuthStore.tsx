import { create } from 'zustand';
import { User } from "@/utils/types/user";
import { AuthState } from '../types/zustand';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isOnboarded: false,
  isLoading: true,
  setAuth: (user, onboarded) => set({ 
    user, 
    isAuthenticated: !!user, 
    isOnboarded: onboarded,
    isLoading: false 
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  resetAuth: () => set({ 
    user: null, 
    isAuthenticated: false, 
    isOnboarded: false, 
    isLoading: false 
  }),
}));