import { createContext, ReactNode, useContext, useEffect, useCallback, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import api from "@/services/api";
import { apiQueue } from "@/utils/apiQueue";
import * as Linking from "expo-linking";
import { supabase } from "@/utils/lib/supabase";
import { userQueries } from "@/database/queries/user.queries";
import { initDatabase } from "@/database/client";
import { systemQueries } from "@/database/queries/systemQueries";
import { useAuthStore } from "@/utils/store/useAuthStore"; 

const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setAuth, resetAuth, setLoading } = useAuthStore();
  const lastProcessedToken = useRef<string | null>(null);

  const handleSession = useCallback(async (session: any) => {
    const currentToken = session?.access_token || "logged-out";
    if (lastProcessedToken.current === currentToken) {
      setLoading(false);
      return;
    }
    lastProcessedToken.current = currentToken;

    if (session) {
      const currentUser = session.user;
      const onboardedFlag = currentUser.user_metadata?.is_onboarded || false;

      await SecureStore.setItemAsync("token", session.access_token);
      
      // ✅ Update Zustand State
      setAuth(currentUser, onboardedFlag);

      userQueries.saveUser(
        currentUser.id,
        currentUser.email,
        currentUser.user_metadata?.fullName || "",
        onboardedFlag
      );

      router.replace(onboardedFlag ? "/(tabs)" : "/onboarding/diet");
    } else {
      resetAuth();
      await SecureStore.deleteItemAsync("token");
      router.replace("/auth");
    }
  }, [setAuth, resetAuth, setLoading]);

  useEffect(() => {
    initDatabase();
    
    // Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    // Initial Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const logout = async () => {
    lastProcessedToken.current = null;
    await supabase.auth.signOut();
    systemQueries.resetDatabase();
    await SecureStore.deleteItemAsync("token");
    resetAuth();
  };

  const completeOnboarding = async (preferences: any) => {
    try {
      await apiQueue.enqueue(
        () => api.post("/auth/complete-onboarding", { preferences }),
        { url: "/auth/complete-onboarding", method: "POST", data: { preferences } }
      );

      const { error } = await supabase.auth.updateUser({
        data: { is_onboarded: true, preferences },
      });

      if (error) throw error;

      const { data: refetch } = await supabase.auth.refreshSession();
      lastProcessedToken.current = null;
      handleSession(refetch.session);
    } catch (error) {
      console.error("Onboarding Sync Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use Auth Actions
export const useAuthActions = () => useContext(AuthContext);