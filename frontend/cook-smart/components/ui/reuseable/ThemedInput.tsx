import React from "react";
import { Input, InputProps } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

type ThemedInputProps = InputProps & {
  secure?: boolean;
};

export const ThemedInput = ({ secure, ...props }: ThemedInputProps) => {
  const { colors, fonts } = useThemeColors();

  return (
    <Input
      flexShrink={1}
      minWidth={0}
      borderRadius="$3"
      width="100%"
      backgroundColor={colors.card}
      color={colors.text}
      placeholderTextColor={colors.placeholder}
      fontFamily={fonts.regular.fontFamily}
      fontWeight={fonts.regular.fontWeight}
      secureTextEntry={secure}
      {...props}
    />
  );
};