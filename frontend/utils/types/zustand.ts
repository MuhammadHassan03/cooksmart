import { User } from "./user";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isLoading: boolean;
  setAuth: (user: User | null, onboarded: boolean) => void;
  setLoading: (loading: boolean) => void;
  resetAuth: () => void;
}