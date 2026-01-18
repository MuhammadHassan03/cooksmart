import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // 1. Scheme ko explicit type dein taake TS ko pata ho ye sirf 'light' ya 'dark' hy
  const themeData = useThemeColors();
  const scheme: "light" | "dark" = themeData.scheme === "dark" ? "dark" : "light";

  const colorFromProps = props[scheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // 2. Ab TS ko pata hy ke Colors[scheme] hamesha valid key hogi
    return Colors[scheme][colorName];
  }
}