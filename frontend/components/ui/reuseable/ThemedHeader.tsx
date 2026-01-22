import React from "react";
import { YStack, XStack, Text, H1, View } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode; // Buttons wagera ke liye
}

export const AppHeader = ({ title, subtitle, rightElement }: AppHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { colors, fonts, isLight } = useThemeColors();

  return (
    <YStack
      bg={isLight ? "white" : "$surface"}
      borderBottomLeftRadius={35}
      borderBottomRightRadius={35}
      pt={insets.top}
      pb="$5"
      shadowColor="#000"
      shadowRadius={15}
      shadowOpacity={0.05}
      zIndex={10}
    >
      <XStack jc="space-between" ai="center" px="$5" py="$3">
        <YStack>
          {subtitle && (
            <Text
              color={colors.primary}
              fontSize={10}
              fontFamily={fonts.bold.fontFamily}
              ls={1.5}
              tt="uppercase"
            >
              {subtitle}
            </Text>
          )}
          <H1
            fontSize={32}
            fontFamily={fonts.bold.fontFamily}
            color={colors.text}
            ls={-1.5}
          >
            {title}
          </H1>
        </YStack>

        {/* Right Side Buttons (Share, Plus, etc.) */}
        <XStack gap="$2">
          {rightElement}
        </XStack>
      </XStack>
    </YStack>
  );
};