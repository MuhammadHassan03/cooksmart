import { Card, Text, XStack, YStack } from "tamagui";
import { Sparkles } from "@tamagui/lucide-icons";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export default function InsightCard() {
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
        <XStack alignItems="center" gap="$2">
          <Sparkles size={18} color={colors.accent} />
          <Text fontWeight="700" fontSize="$5" color={colors.text}>
            Smart Insight
          </Text>
        </XStack>

        <Text fontSize="$4" color={colors.text} lineHeight={22}>
          You frequently waste <Text fontWeight="600" color={colors.accent}>leafy greens</Text>. Consider buying smaller packs or freezing extras before they expire.

        </Text>
      </YStack>
    </Card>
  );
}
