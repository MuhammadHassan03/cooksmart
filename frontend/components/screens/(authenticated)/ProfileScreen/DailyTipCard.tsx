import { Card, H4, Text, XStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { MotiView } from "moti";
import { Lightbulb } from "@tamagui/lucide-icons";

export default function DailyTipCard() {
  const { colors } = useThemeColors();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
    >
      <Card
        elevate
        bordered
        padding="$4"
        borderRadius="$6"
        marginBottom="$4"
        backgroundColor={colors.surface}
        borderColor={colors.border}
      >
        <XStack alignItems="center" gap="$2" marginBottom="$2">
          <Lightbulb size={16} color={colors.accent} />
          <H4 color={colors.accent}>Today’s Tip</H4>
        </XStack>

        <Text color={colors.textSecondary} fontSize="$3" lineHeight={20}>
          Store herbs like cilantro in a glass of water to keep them fresh longer.
        </Text>
      </Card>
    </MotiView>
  );
}
