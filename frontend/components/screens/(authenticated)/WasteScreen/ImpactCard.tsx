import { Card, Text, YStack, XStack, View } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Leaf, Droplets, Info } from "@tamagui/lucide-icons";

interface ImpactProps {
  savedEmissions: number;
  savedWater: number;
}

export default function ImpactCard({ savedEmissions, savedWater }: ImpactProps) {
  const { colors } = useThemeColors();

  return (
    <Card
      padding="$5"
      borderRadius="$8"
      backgroundColor={colors.card}
      borderWidth={1}
      borderColor={colors.border}
      elevate
    >
      <YStack gap="$4">
        {/* Header with Tooltip-like icon */}
        <XStack jc="space-between" ai="center">
          <Text fontSize="$5" fontWeight="900" letterSpacing={0.5}>
            Your Green Impact 🌍
          </Text>
          <View p="$1.5" br="$10" bc={colors.surface}>
            <Info size={14} color={colors.textSecondary} />
          </View>
        </XStack>

        <XStack gap="$3">
          {/* CO2 Section */}
          <View f={1} bc={colors.surface} p="$3" br="$6" ai="center" gap="$2">
            <View p="$2" br="$10" bc="#4ADE8020">
              <Leaf size={20} color="#4ADE80" />
            </View>
            <YStack ai="center">
              <Text fontSize="$6" fontWeight="900" color={colors.text}>
                {savedEmissions.toFixed(1)}
              </Text>
              <Text fontSize="$2" fontWeight="700" color={colors.textSecondary} opacity={0.7}>
                kg CO₂ Saved
              </Text>
            </YStack>
          </View>

          {/* Water Section */}
          <View f={1} bc={colors.surface} p="$3" br="$6" ai="center" gap="$2">
            <View p="$2" br="$10" bc="#3B82F620">
              <Droplets size={20} color="#3B82F6" />
            </View>
            <YStack ai="center">
              <Text fontSize="$6" fontWeight="900" color={colors.text}>
                {savedWater.toFixed(0)}
              </Text>
              <Text fontSize="$2" fontWeight="700" color={colors.textSecondary} opacity={0.7}>
                Liters Water
              </Text>
            </YStack>
          </View>
        </XStack>

        {/* Actionable Small Footer */}
        <View ai="center" pt="$1">
            <Text fontSize={11} color={colors.textSecondary} textAlign="center">
                That's equivalent to planting <Text fontWeight="bold" color={colors.text}>2 trees</Text> this month! 🌳
            </Text>
        </View>
      </YStack>
    </Card>
  );
}