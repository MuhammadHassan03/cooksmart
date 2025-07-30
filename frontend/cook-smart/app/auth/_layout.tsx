import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // return (
    //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //     <ActivityIndicator size="large" />
    //   </View>
    // );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{
    headerShown: false
  }}/>;
}
