import { useEffect, memo } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { TamaguiProvider, View } from "tamagui";
import { PortalProvider } from "@tamagui/portal";
import { ToastProvider } from "@tamagui/toast";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LightTheme, DarkTheme } from "@/constants/Theme";
import { tamaguiConfig } from "@/tamagui.config";

import { AuthProvider } from "@/context/AuthContext";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { ScanProvider } from "@/context/ScanContext";
import { PremiumProvider } from "@/context/PremiumContext";
import { ThemedToast } from "@/components/ui/reuseable/ThemedToast";

// SplashScreen ko lock karein
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const scheme = useColorScheme();

  const [loaded, error] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // IMPORTANT: Agar fonts ready nahi hain toh RETURN NULL. 
  // Koi bhi component (View/Spinner) render mat karein kyunki Provider abhi active nahi hai.
  if (!loaded && !error) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={scheme === "dark" ? "dark" : "light"}>
      <ThemeProvider value={scheme === "dark" ? DarkTheme : LightTheme}>
        <SafeAreaProvider>
          <PortalProvider>
            <ToastProvider duration={4000} native={false}>
              <PremiumProvider>
                <AuthProvider>
                  <OnboardingProvider>
                    <ScanProvider>
                      {/* View ko background color denay ke liye Slot ke bahar rakha hai */}
                      <View f={1} backgroundColor="$background">
                        <Slot />
                        <ThemedToast />
                      </View>
                    </ScanProvider>
                  </OnboardingProvider>
                </AuthProvider>
              </PremiumProvider>
            </ToastProvider>
          </PortalProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

export default memo(RootLayout);