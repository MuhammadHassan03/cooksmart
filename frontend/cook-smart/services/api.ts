import axios from "axios";
import * as SecureStore from "expo-secure-store";


const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("authToken");

  console.log('token', token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;