import React from "react";
import { XStack, YStack, Text, Circle } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

interface SmartCardProps {
  title: string;
  description: string;
  Icon: any;
  onPress?: () => void;
}

export const SmartCard = ({ title, description, Icon, onPress }: SmartCardProps) => {
  const { colors, fonts } = useThemeColors();

  return (
    <XStack
      bg={colors.primary + "15"}
      p="$4"
      br={20}
      ai="center"
      jc="space-between"
      mb="$5"
      bw={1}
      boc={colors.primary + "20"}
      onPress={onPress}
      pressStyle={{ opacity: 0.8, scale: 0.98 }}
    >
      <XStack ai="center" gap="$3" f={1}>
        <Circle size={40} bg={colors.primary}>
          <Icon size={18} color="white" />
        </Circle>
        <YStack f={1}>
          <Text fontSize={14} fontFamily={fonts.bold.fontFamily} color={colors.text}>
            {title}
          </Text>
          <Text fontSize={12} fontFamily={fonts.regular.fontFamily} color={colors.textSecondary}>
            {description}
          </Text>
        </YStack>
      </XStack>
      <ChevronRight size={18} color={colors.primary} />
    </XStack>
  );
};