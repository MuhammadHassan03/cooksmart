import { Card, Text, YStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Flame } from "@tamagui/lucide-icons"; // Optional icon

type StreakCardProps = {
  currentStreak: number;
};

export default function StreakCard({ currentStreak }: StreakCardProps) {
  const { colors } = useThemeColors();

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.surface}
      elevate
      accessibilityRole="summary"
      borderColor={colors.border}
    >
      <YStack alignItems="center" gap="$3">
        <Flame size={28} color={colors.primary} />
        
        <Text fontSize="$5" fontWeight="700" color={colors.text}>
          {currentStreak} {currentStreak === 1 ? "day" : "days"}
        </Text>

        <Text fontSize="$3" color={colors.textSecondary} textAlign="center">
          Waste-free cooking streak
        </Text>
      </YStack>
    </Card>
  );
}
