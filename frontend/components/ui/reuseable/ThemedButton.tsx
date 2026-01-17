import React from "react";
import { Button, Spinner, Text, XStack, ButtonProps } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

type ThemedButtonProps = ButtonProps & {
  label?: string;
  loading?: boolean;
  loadingLabel?: string;
};

export const ThemedButton = ({
  label,
  loading = false,
  loadingLabel = "Loading...",
  children,
  ...props
}: ThemedButtonProps) => {
  const { colors, fonts } = useThemeColors();

  return (
    <Button
      width="100%"
      backgroundColor={colors.primary}
      disabled={loading || props.disabled}
      borderRadius="$3"
      paddingVertical="$2"
      {...props}
    >
      {loading ? (
        <XStack alignItems="center" justifyContent="center" space="$2">
          <Spinner size="small" color={colors.background} />
          <Text
            color={colors.background}
            fontFamily={fonts.bold.fontFamily}
            fontWeight={fonts.bold.fontWeight}
          >
            {loadingLabel}
          </Text>
        </XStack>
      ) : children ? (
        children
      ) : (
        <Text
          color={colors.background}
          fontFamily={fonts.bold.fontFamily}
          fontWeight={fonts.bold.fontWeight}
        >
          {label}
        </Text>
      )}
    </Button>
  );
};
