import { useAuthStore } from "@/utils/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { View } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export default function AuthLayout() {
  const { colors } = useThemeColors();
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isOnboarded = useAuthStore((state) => state.isOnboarded);

  if (isLoading) {
    return (
      <View flex={1} jc="center" ai="center" bc={colors.background}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    const targetPath = isOnboarded ? "/(tabs)" : "/onboarding/diet";
    return <Redirect href={targetPath} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right", 
        contentStyle: { backgroundColor: colors.background }
      }}
    />
  );
}