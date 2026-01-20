import { User } from "@/utils/types/user";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  isOnboarded: boolean;
  login: (token: string, user: any, onboarded: boolean) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (preferences: any) => Promise<void>;
}