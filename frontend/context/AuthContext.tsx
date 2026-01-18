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
import { apiQueue } from "@/utils/apiQueue";
import * as Linking from "expo-linking";
import { supabase } from "@/utils/lib/supabase";
import { userQueries } from "@/database/queries/user.queries";
import { db, initDatabase } from "@/database/client";
import { systemQueries } from "@/database/queries/systemQueries";

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
  login: ({
    token,
    user,
    isOnboarded,
  }: {
    token: string;
    user: User;
    isOnboarded: boolean;
  }) => Promise<void>;
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
    const handleDeepLink = async (url: string) => {
      const { queryParams } = Linking.parse(url);

      // Supabase puts tokens after the # (hash)
      const hash = url.split("#")[1];
      if (hash) {
        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token && refresh_token) {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (data.session) {
            // User is now logged in!
            setIsAuthenticated(true);
            setUser(data.session.user as any);
            // Check metadata to route them
            const onboarded = data.session.user.user_metadata.is_onboarded;
            router.replace(onboarded ? "/(tabs)" : "/onboarding/diet");
          }
        }
      }
    };

    const subscription = Linking.addEventListener("url", (event) =>
      handleDeepLink(event.url),
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
  // 1. Supabase Auth State Change Listener
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Supabase Auth Event:", event);

    if (session?.access_token) {
      console.log('TOKEN', session.access_token)
      // JAB BHI TOKEN REFRESH HO: Naya token SecureStore mein save karein
      // Taake Express Backend wala 'api' hamesha fresh token use kare
      await SecureStore.setItemAsync("token", session.access_token);
      
      // Local state update karein
      setIsAuthenticated(true);
      setUser(session.user as any);
      
      console.log("Express API token updated after refresh.");
    } else if (event === 'SIGNED_OUT') {
      // Safaya karein agar logout ho jaye
      await SecureStore.deleteItemAsync("token");
      setIsAuthenticated(false);
      setUser(null);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

  useEffect(() => {
    const restoreSession = async () => {
      initDatabase();
      console.log("Database initialized successfully");

      const token = await SecureStore.getItemAsync("token");
      const storedUser = userQueries.getFullUser();
      const onboarded = await SecureStore.getItemAsync("isOnboarded");

      const isOnboardedFlag = onboarded === "true";

      setIsAuthenticated(!!token);
      setIsOnboarded(isOnboardedFlag);

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch {
          setUser(null);
        }
      }

      if (token) {
        if (isOnboardedFlag) {
          router.replace("/(tabs)");
        } else {
          router.replace("/onboarding/diet");
        }
      } else {
        router.replace("/auth");
      }

      await apiQueue.sync(api);

      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const login = async ({
    token,
    user,
    isOnboarded,
  }: {
    token: string;
    user: User;
    isOnboarded: boolean;
  }) => {
    try {
      await SecureStore.setItemAsync("token", token);

      userQueries.saveUser(
        user.id,
        user.email,
        user.user_metadata.fullName,
        isOnboarded,
      );
      await SecureStore.setItemAsync(
        "isOnboarded",
        isOnboarded ? "true" : "false",
      );
      setIsAuthenticated(true);
      setUser(user);
      setIsOnboarded(isOnboarded);
      if (isOnboarded) {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding/diet");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const signup = login;

  const logout = async () => {
    console.log("Initiating secure logout...");
    systemQueries.resetDatabase();
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    setIsAuthenticated(false);
    setUser(null);
    router.replace("/auth");
  };

  // const completeOnboarding = async (preferences: {
  //   diet: string[];
  //   allergies: string[];
  //   cuisines: string[];
  // }) => {
  //   const token = await SecureStore.getItemAsync("token");
  //   if (!token) {
  //     router.replace('/auth')
  //   };

  //   await apiQueue.enqueue(
  //     () =>
  //       api.post(
  //         "/auth/complete-onboarding",
  //         { preferences },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       ),
  //     {
  //       url: "/auth/complete-onboarding",
  //       method: "POST",
  //       data: { preferences },
  //     }
  //   );

  //   setIsOnboarded(true);
  //   await SecureStore.setItemAsync("isOnboarded", "true");

  //   const updatedUser = {
  //     ...user,
  //     preferences,
  //   };
  //   setUser(updatedUser as User);
  //   await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));

  //   router.replace("/(tabs)");
  // };

  const completeOnboarding = async (preferences: {
    diet: string[];
    allergies: string[];
    cuisines: string[];
  }) => {
    try {
      await apiQueue.enqueue(
        () => api.post("/auth/complete-onboarding", { preferences }),
        {
          url: "/auth/complete-onboarding",
          method: "POST",
          data: { preferences },
        },
      );

      const { data, error } = await supabase.auth.refreshSession();

      if (error) throw error;

      if (data.session) {
        // 3. Update all states based on the FRESH data from Supabase
        const freshUser = data.session.user;

        setUser(freshUser as any);
        setIsOnboarded(true);

        // Keep your SecureStore in sync
        await SecureStore.setItemAsync("isOnboarded", "true");
        // await SecureStore.setItemAsync("user", JSON.stringify(freshUser));

        // 4. Navigate
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Onboarding failed:", error);
      // You could show a Burnt.alert here if it fails
    }
  };
  useEffect(() => {
    if (user?.preferences) {
      router.replace("/(tabs)");
    }
  }, [user]);

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
