import { useTheme as useNavTheme } from "@react-navigation/native";
import type { AppTheme } from "@/constants/Theme";

export function useThemeColors() {
  // unknown use karna parta hy jab types ka overlap na ho rha ho
  const theme = useNavTheme() as unknown as AppTheme;

  return {
    colors: theme.colors,
    fonts: theme.fonts,
    scheme: theme.dark ? "dark" : "light",
    isLight: !theme.dark, // Ab ye logic har jagah available hogi
  };
}