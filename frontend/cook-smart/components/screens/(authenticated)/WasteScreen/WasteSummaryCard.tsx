import { Card, Text, YStack, XStack, Image } from 'tamagui'
import { useThemeColors } from '@/hooks/theme/useThemeColors'
import { AlertTriangle } from '@tamagui/lucide-icons'

type WasteSummaryCardProps = {
  itemCount: number
  estimatedLoss: number
  label?: string
}

export default function WasteSummaryCard({
  itemCount,
  estimatedLoss,
  label = "This Month's Waste",
}: WasteSummaryCardProps) {
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
          <AlertTriangle size={18} color={colors.text} />
          <Text
            fontSize="$5"
            fontWeight="600"
            color={colors.text}
            accessibilityLabel="Waste summary label"
          >
            {label}
          </Text>
        </XStack>

        <XStack justifyContent="space-between" alignItems="center">
          <Text
            fontSize="$8"
            fontWeight="800"
            color={colors.text}
            accessibilityLabel={`Total items wasted: ${itemCount}`}
          >
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>

          <YStack alignItems="flex-end">
            <Text
              fontSize="$3"
              color={colors.textSecondary}
              accessibilityLabel={`Estimated loss`}
            >
              Estimated loss
            </Text>
            <Text
              fontSize="$6"
              fontWeight="700"
              color={colors.text}
              accessibilityLabel={`Estimated loss: ${estimatedLoss} dollars`}
            >
              ${estimatedLoss.toFixed(2)}
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </Card>
  )
}
