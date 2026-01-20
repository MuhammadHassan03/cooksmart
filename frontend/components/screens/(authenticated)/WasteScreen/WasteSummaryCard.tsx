import { Card, Text, YStack, XStack, View } from 'tamagui'
import { useThemeColors } from '@/hooks/theme/useThemeColors'
import { AlertTriangle, ArrowDownRight, ArrowUpRight } from '@tamagui/lucide-icons'

type WasteSummaryCardProps = {
  itemCount: number
  estimatedLoss: number
  percentageChange?: number // Static example: -5 ya +10
  label?: string
}

export default function WasteSummaryCard({
  itemCount,
  estimatedLoss,
  percentageChange = -5.2, // Static: Ye show karega ke waste kam hua hy
  label = "This Month's Waste",
}: WasteSummaryCardProps) {
  const { colors } = useThemeColors()
  const isImprovement = percentageChange < 0

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.card} // 'surface' se thora better contrast
      borderColor={colors.border}
      borderWidth={1}
      shadowColor={colors.shadow}
      shadowRadius={10}
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.05}
    >
      <YStack gap="$4">
        {/* Header with Title and Comparison Badge */}
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" gap="$2">
            <View backgroundColor={colors.error + '15'} p="$1.5" borderRadius="$3">
               <AlertTriangle size={16} color={colors.error} />
            </View>
            <Text fontSize="$4" fontWeight="700" color={colors.textSecondary} textTransform="uppercase" letterSpacing={0.5}>
              {label}
            </Text>
          </XStack>

          {/* Static Comparison Badge */}
          <XStack 
            backgroundColor={isImprovement ? '#E6F9F1' : '#FFF1F0'} 
            px="$2" py="$1" borderRadius="$4" alignItems="center" gap="$1"
          >
            {isImprovement ? <ArrowDownRight size={12} color="#00C38B" /> : <ArrowUpRight size={12} color="#D92D20" />}
            <Text fontSize={11} fontWeight="800" color={isImprovement ? "#00C38B" : "#D92D20"}>
              {Math.abs(percentageChange)}%
            </Text>
          </XStack>
        </XStack>

        {/* Main Stats Row */}
        <XStack justifyContent="space-between" alignItems="flex-end">
          <YStack>
            <Text fontSize="$8" fontWeight="800" color={colors.text} lineHeight="$8">
              {itemCount}
            </Text>
            <Text fontSize="$3" color={colors.textSecondary} fontWeight="500">
               Items Wasted
            </Text>
          </YStack>

          <YStack alignItems="flex-end">
             <Text fontSize="$7" fontWeight="800" color={colors.text} lineHeight="$7">
              ${estimatedLoss.toFixed(2)}
            </Text>
            <Text fontSize="$3" color={colors.textSecondary} fontWeight="500">
               Financial Loss
            </Text>
          </YStack>
        </XStack>

        {/* Bottom Context Message */}
        <View borderTopWidth={1} borderColor={colors.border} pt="$3" mt="$1">
            <Text fontSize={12} color={colors.textSecondary} fontStyle="italic">
                {isImprovement 
                  ? "Great! You saved $12 more than last month. 🌿" 
                  : "Watch out! Waste is increasing this month. ⚠️"}
            </Text>
        </View>
      </YStack>
    </Card>
  )
}