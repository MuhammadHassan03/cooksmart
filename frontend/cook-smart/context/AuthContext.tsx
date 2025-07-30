import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";


interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean | null) => void;
  login: (token: string) => Promise<void>;
  signup: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await SecureStore.setItemAsync('token', token);
    setIsAuthenticated(true);
    router.replace('/(tabs)');
  };

  const signup = async (token: string) => {
    await SecureStore.setItemAsync('token', token);
    setIsAuthenticated(true);
    router.replace('/(tabs)');
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setIsAuthenticated(false);
    router.replace('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
