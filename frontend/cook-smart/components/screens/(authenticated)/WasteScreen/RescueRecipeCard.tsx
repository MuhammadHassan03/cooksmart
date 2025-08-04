import { Card, Text, YStack, Button, XStack } from "tamagui"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { Utensils } from "@tamagui/lucide-icons"

export default function RescueRecipeCard() {
  const { colors } = useThemeColors()

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.surface}
      borderColor={colors.border}
      borderWidth={1}
      elevate
      accessibilityRole="summary"
    >
      <YStack gap="$3">
        <XStack alignItems="center" space="$2">
          <Utensils size={18} color={colors.success} />
          <Text fontSize="$5" fontWeight="600" color={colors.text}>
            Rescue Recipe Suggestion
          </Text>
        </XStack>

        <Text fontSize="$3" color={colors.textSecondary}>
          Don’t toss those veggies! Toss them in a pan with soy sauce, garlic, and ginger for a quick stir-fry.
        </Text>

        <Button
          size="$3"
          width={'100%'}
          alignSelf="flex-start"
          accessibilityLabel="View detailed rescue recipe"
        >
          View Recipe
        </Button>
      </YStack>
    </Card>
  )
}
