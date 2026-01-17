import { AuthProvider } from "@/context/AuthContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { TamaguiProvider, createTamagui } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

const tamaguiConfig = createTamagui(defaultConfig);

export default function App() {
  const { scheme: colorScheme } = useThemeColors();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={tamaguiConfig}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </TamaguiProvider>
    </ThemeProvider>
  );
}
