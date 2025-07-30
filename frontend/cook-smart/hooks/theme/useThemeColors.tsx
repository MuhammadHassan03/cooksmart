import { useTheme as useNavTheme } from "@react-navigation/native";
import type { AppTheme } from "@/constants/Theme";

export function useThemeColors() {
  const theme = useNavTheme() as AppTheme;

  return {
    colors: theme.colors,
    fonts: theme.fonts,
    scheme: theme.dark ? "dark" : "light",
  };
}