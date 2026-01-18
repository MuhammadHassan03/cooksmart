import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Platform } from "react-native";

const BASE_URL = Platform.OS === "android" 
  ? "https://0a3afe82bd90.ngrok-free.app/api/v1" 
  : "http://localhost:5000/api/v1/";

const api = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to requests
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Graceful UX on token failure
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Token is expired or invalid
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      await SecureStore.deleteItemAsync("isOnboarded");

      // Optionally: show a toast/snackbar before redirecting
      // Toast.show({ type: "error", text1: "Session expired", text2: "Please login again" });

      router.replace("/auth");
    }

    return Promise.reject(error);
  }
);

export default api;
