import { Card, Text, YStack, XStack } from 'tamagui'
import { useThemeColors } from '@/hooks/theme/useThemeColors'
import { Clock } from '@tamagui/lucide-icons'

type ForecastedWasteCardProps = {
  forecastedItems: number
}

export default function ForecastedWasteCard({ forecastedItems = 0 }: ForecastedWasteCardProps) {
  const { colors } = useThemeColors()

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.surface}
      borderColor={colors.warning}
      borderWidth={1}
      elevate
      accessibilityRole="summary"
    >
      <YStack gap="$3">
        <XStack alignItems="center" space="$2">
          <Clock size={18} color={colors.warning} />
          <Text fontSize="$5" fontWeight="600" color={colors.text}>
            Upcoming Waste Forecast
          </Text>
        </XStack>

        <Text
          fontSize="$7"
          fontWeight="800"
          color={colors.warning}
          accessibilityLabel={`Forecasted waste: ${forecastedItems} items`}
        >
          {forecastedItems} {forecastedItems === 1 ? "item" : "items"}
        </Text>

        <Text fontSize="$3" color={colors.textSecondary}>
          Likely to expire in the next 7 days based on current data
        </Text>
      </YStack>
    </Card>
  )
}
