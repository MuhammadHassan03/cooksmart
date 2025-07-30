import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { LightTheme, DarkTheme } from "@/constants/Theme";
import { useColorScheme } from "react-native";
import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { PortalProvider } from "@tamagui/portal";
import { ThemedToast } from "@/components/ui/reuseable/ThemedToast";

export default function RootLayout() {
  const scheme = useColorScheme();
  const config = createTamagui(defaultConfig);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PortalProvider>
      <ThemeProvider value={scheme === "dark" ? DarkTheme : LightTheme}>
        <TamaguiProvider config={config}>
          <ToastProvider
            duration={4000}
            native
            burntOptions={{ preset: "done", from: "bottom" }}
          >
            <AuthProvider>
              <Slot />
              {/* <ToastViewport /> */}
              <ThemedToast/>
            </AuthProvider>
          </ToastProvider>
        </TamaguiProvider>
      </ThemeProvider>
    </PortalProvider>
  );
}
