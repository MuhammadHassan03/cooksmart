import { Card, Text, YStack, XStack } from "tamagui"
import { MotiView } from "moti"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { Sparkles } from "@tamagui/lucide-icons"

export const AISnippetCard = () => {
  const { colors, fonts } = useThemeColors()

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 500 }}
    >
      <Card
        paddingVertical="$4"
        paddingHorizontal="$5"
        borderRadius="$6"
        backgroundColor={colors.surface}
        borderColor={colors.border}
        borderWidth={1}
        elevate
      >
        <XStack alignItems="center" gap="$2" mb="$2">
          <Sparkles size={16} color={colors.accent} />
          <Text
            fontFamily={fonts.medium.fontFamily}
            fontSize={13}
            color={colors.accent}
            textTransform="uppercase"
            letterSpacing={0.5}
          >
            AI Insight
          </Text>
        </XStack>

        <Text
          fontSize={15}
          fontFamily={fonts.regular.fontFamily}
          color={colors.text}
          lineHeight={22}
        >
          Based on your fridge, try cooking a{" "}
          <Text fontWeight="700" color={colors.textSecondary}>
            creamy spinach soup
          </Text>{" "}
          tonight.
        </Text>
      </Card>
    </MotiView>
  )
}
