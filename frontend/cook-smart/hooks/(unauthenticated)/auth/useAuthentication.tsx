import { apiQueue } from "@/utils/apiQueue";
import api from "@/services/api";
import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/context/AuthContext";

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
  const { login: loginContext, setIsAuthenticated } = useAuth();

  const login = async ({ email, password }: Credentials) => {
    const credentials = { email, password };
    const response = await apiQueue.enqueue(() =>
      execute(() => api.post("/auth/login", credentials).then((res) => res.data))
    );

    if (response?.session?.access_token) {
      await loginContext(response.session.access_token, response.user, response.is_onboarded);
    }
  };

  const signup = async ({ email, password, fullName }: SignupData) => {
    const payload = { email, password, fullName };

    const response = await apiQueue.enqueue(() =>
      execute(() => api.post("/auth/register", payload).then((res) => res.data))
    );
    console.log('response', response)
    if (response?.session?.access_token) {
      await loginContext(response.session.access_token, response.user, response.is_onboarded);
    }
  };

  const forgot = async (email: string) => {
    const response = await apiQueue.enqueue(() =>
      execute(() => api.post("/auth/forgot-password", { email }).then((res) => res.data))
    );

    return response;
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
