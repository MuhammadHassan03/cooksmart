import { Redirect, Tabs } from "expo-router";
import React, { memo, useMemo } from "react";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuthStore } from "@/utils/store/useAuthStore";
import { ThemedTabbar } from '@/components/ui/reuseable/ThemedTabBar';
import { FullScreenLoader } from "@/components/ui/reuseable/ThemedFullScreenLoader";

const TAB_ITEMS = [
  { name: "index", title: "Home", icon: "home" },
  { name: "recipes", title: "Recipes", icon: "book-open" },
  { name: "scanner", title: "Scanner", icon: "camera" },
  { name: "planner", title: "Planner", icon: "calendar" },
  { name: "profile", title: "Profile", icon: "user" },
] as const;

function TabLayout() {
  const { colors } = useThemeColors();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isOnboarded = useAuthStore((s) => s.isOnboarded);

  const renderTabBar = useMemo(() => (props: any) => <ThemedTabbar {...props} />, []);

  // ✅ FIX: Screen options ko baar baar calculate na karein
  const screenOptions = useMemo(() => ({
    headerShown: false,
    tabBarStyle: Platform.select({
      ios: { position: "absolute" as const },
      default: { backgroundColor: colors.background, elevation: 0 },
    }),
  }), [colors.background]);

if (isLoading) {
  return <FullScreenLoader />;
}

  if (!isAuthenticated) return <Redirect href="/auth" />;
  if (!isOnboarded) return <Redirect href="/onboarding/diet" />;

  return (
    <Tabs tabBar={renderTabBar} screenOptions={screenOptions}>
      {TAB_ITEMS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Feather name={tab.icon as any} size={size ?? 22} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

export default memo(TabLayout);