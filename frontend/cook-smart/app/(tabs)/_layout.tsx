import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuth } from "@/context/AuthContext";
import { ThemedTabbar } from '@/components/ui/reuseable/ThemedTabBar'

// Define tab items in one place
const tabItems = [
  { name: "index", title: "Home", icon: "home" },
  { name: "recipes", title: "Recipes", icon: "book-open" },
  { name: "scanner", title: "Scanner", icon: "camera" },
  { name: "waste", title: "Waste", icon: "activity" },
  { name: "profile", title: "Profile", icon: "user" },
] as const;

export default function TabLayout() {
  const { scheme: colorScheme } = useThemeColors();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs
      tabBar={(props) => <ThemedTabbar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      {tabItems.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Feather name={tab.icon} size={size ?? 24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
