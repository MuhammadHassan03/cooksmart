import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { LightTheme, DarkTheme } from "@/constants/Theme";
import { useColorScheme } from "react-native";
import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { ToastProvider } from "@tamagui/toast";
import { PortalProvider } from "@tamagui/portal";
import { ThemedToast } from "@/components/ui/reuseable/ThemedToast";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { ScanProvider } from "@/context/ScanContext";
import { tamaguiConfig } from "@/tamagui.config";
import { PremiumProvider } from "@/context/PremiumContext";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <PortalProvider>
        <ThemeProvider value={scheme === "dark" ? DarkTheme : LightTheme}>
          <TamaguiProvider config={tamaguiConfig}>
            <ToastProvider
              duration={4000}
              // native={false}
              burntOptions={{ preset: "done", from: "bottom" }}
            >
              <PremiumProvider>
                <AuthProvider>
                  <OnboardingProvider>
                    <ScanProvider>
                      <Slot />
                      <ThemedToast />
                    </ScanProvider>
                  </OnboardingProvider>
                </AuthProvider>
              </PremiumProvider>
            </ToastProvider>
          </TamaguiProvider>
        </ThemeProvider>
    </PortalProvider>
  );
}
