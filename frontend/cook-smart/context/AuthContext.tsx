import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import api from "@/services/api";

// Define what the user object will look like
interface User {
  id: string;
  fullName: string;
  email: string;
  preferences?: {
    diet: string[];
    allergies: string[];
    cuisines: string[];
  };
  // Add more fields if needed
}

interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean | null) => void;
  login: (token: string, user: User, isOnboarded: boolean) => Promise<void>;
  signup: (token: string, user: User, isOnboarded: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  isOnboarded: boolean | null;
  setIsOnboarded: (value: boolean) => void;
  completeOnboarding: (preferences: {
    diet: string[];
    allergies: string[];
    cuisines: string[];
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const restoreSession = async () => {
      const token = await SecureStore.getItemAsync("token");
      const storedUser = await SecureStore.getItemAsync("user");
      const onboarded = await SecureStore.getItemAsync("isOnboarded");

      setIsAuthenticated(!!token);
      setIsOnboarded(onboarded === "true" || false);

      if (!isOnboarded) {
        router.replace("/onboarding/diet");
      }

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch {
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (token: string, user: User, isOnboarded: boolean) => {
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
    setIsOnboarded(isOnboarded);
    if (isOnboarded) {
      router.replace("/(tabs)");
    } else {
      router.replace("/onboarding/diet");
    }
  };

  const signup = login;

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    setIsAuthenticated(false);
    setUser(null);
    router.replace("/auth");
  };

  const completeOnboarding = async (preferences: {
    diet: string[];
    allergies: string[];
    cuisines: string[];
  }) => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) throw new Error("No auth token available");

    await api.post(
      "/auth/complete-onboarding",
      { preferences },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setIsOnboarded(true);
    await SecureStore.setItemAsync("isOnboarded", "true");

    const updatedUser = {
      ...user,
      preferences,
    };
    setUser(updatedUser as User);
    await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));

    router.replace("/(tabs)");
  };

  useEffect(() => {
    if (user?.preferences){
      router.replace('/(tabs)')
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        signup,
        logout,
        isLoading,
        user,
        setUser,
        isOnboarded,
        setIsOnboarded,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
