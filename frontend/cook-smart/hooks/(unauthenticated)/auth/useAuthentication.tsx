import { apiQueue } from "@/utils/apiQueue";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/context/AuthContext";

type Credentials = {
  email: string;
  password: string;
};

const useAuthentication = () => {
  const { loading, error, success, execute } = useRequest();
  const { setIsAuthenticated } = useAuth();

  const login = async ({ email, password }: Credentials) => {
    let credentials = {
      email,
      password,
    };
    const response = await apiQueue.enqueue(() =>
      execute(() => api.post("auth/login", credentials).then((res) => res.data))
    );

    console.log("response", response);

    //  setIsAuthenticated(true);
  };

  const signup = async ({ email, password }: Credentials) => {
    try {
      let credentials = {
        email,
        password,
      };

      const response = await apiQueue.enqueue(() =>
        execute(() =>
          api.post("auth/register", credentials).then((res) => res.data)
        )
      );

      console.log("response", response);
    } catch (error) {
      console.log('Error in Signup Functionality', error)
    }
  };

  const forgot = async () => {};

  return {
    login,
    signup,
    forgot,
    loading,
  };
};

export default useAuthentication;
