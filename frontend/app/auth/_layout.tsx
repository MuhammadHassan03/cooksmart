import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      setHasToken(!!token);
    };

    checkToken();
  }, []);

  if (isLoading || hasToken === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAuthenticated && hasToken) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{
    headerShown: false
  }}/>;
}
