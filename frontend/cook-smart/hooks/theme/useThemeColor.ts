import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { scheme } = useThemeColors() ?? "light";
  const colorFromProps = props[scheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[scheme][colorName];
  }
}
