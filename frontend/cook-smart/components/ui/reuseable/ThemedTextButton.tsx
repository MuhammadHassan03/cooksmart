import React from "react";
import { Text, TextProps } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

type ThemedTextButtonProps = TextProps & {
  label: string;
  onPress?: () => void;
  underline?: boolean;
  colorType?: "text" | "textSecondary";
};

export const ThemedTextButton = ({
  label,
  onPress,
  underline = false,
  colorType = "textSecondary",
  ...props
}: ThemedTextButtonProps) => {
  const { colors, fonts } = useThemeColors();

  return (
    <Text
      onPress={onPress}
      fontFamily={fonts.medium.fontFamily}
      fontWeight={fonts.medium.fontWeight}
      color={colors[colorType]}
      fontSize={13}
      textDecorationLine={underline ? "underline" : "none"}
      {...props}
    >
      {label}
    </Text>
  );
};
