import { Card, Text, YStack, XStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export default function ImpactCard({
  savedEmissions,
  savedWater,
}: {
  savedEmissions: number;
  savedWater: number;
}) {
  const { colors } = useThemeColors();

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.surface}
      elevate
      accessibilityRole="summary"
    >
      <YStack gap="$3">
        <Text
          fontSize="$5"
          fontWeight="700"
          color={colors.text}
          textAlign="center"
        >
          Environmental Impact
        </Text>

        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$4" color={colors.text}>
            🌱 CO₂ Saved
          </Text>
          <Text fontSize="$4" color={colors.textSecondary}>
            {savedEmissions.toFixed(1)} kg
          </Text>
        </XStack>

        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$4" color={colors.text}>
            💧 Water Saved
          </Text>
          <Text fontSize="$4" color={colors.textSecondary}>
            {savedWater.toFixed(0)} L
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
}
