import { apiQueue } from "@/utils/apiQueue";
import api from "@/services/api";
import { useRequest } from "@/hooks/useRequest";
import { useAuthActions } from "@/context/AuthContext";
import * as Burnt from "burnt";
import { supabase } from "@/utils/lib/supabase";

type Credentials = {
  email: string;
  password: string;
};

type SignupData = {
  email: string;
  password: string;
  fullName: string;
};

const useAuthentication = () => {
  const { loading, error, success, execute } = useRequest();
  const { login: loginContext } = useAuthActions();
  const login = async ({ email, password }: Credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        Burnt.alert({
          title: "Verify email",
          message: "Please check your inbox.",
        });
        return;
      }
      throw error;
    }

    if (!error) {
      await loginContext({
        token: data.session.access_token,
        user: data.user,
        isOnboarded: data.user.user_metadata.is_onboarded ?? false,
      });
    }
  };

  //   const credentials = { email, password };
  //   const response = await execute(() =>
  //     api.post("/auth/login", credentials).then((res) => res.data)
  //   );

  //   if (response?.error === "EMAIL_NOT_CONFIRMED") {
  //     Burnt.alert({
  //       title: "Verify your email",
  //       message: response.message,
  //     });
  //     return;
  //   }

  //   if (response?.session?.access_token && response?.user) {
  //     await loginContext(
  //       response.session.access_token,
  //       response.user,
  //       response.is_onboarded ?? false
  //     );
  //   }
  // };
  const signup = async ({ email, password, fullName }: SignupData) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName, is_onboarded: false },
        emailRedirectTo: "cooksmart://email-confirmed",
      },
    });

    if (error) throw error;
    Burnt.alert({
      title: "Check your email",
      message: "Verification link sent!",
    });
  };

  const forgot = async (email: string) => {
    return execute(() =>
      api.post("/auth/forgot-password", { email }).then((res) => res.data),
    );

    apiQueue
  };

  return {
    login,
    signup,
    forgot,
    loading,
    error,
    success,
  };
};

export default useAuthentication;
