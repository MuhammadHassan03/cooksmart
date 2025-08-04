import { ScrollView, XStack, YStack, Text, Card } from "tamagui"
import { MotiView } from "moti"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { memo } from "react"

const CARD_HEIGHT = 100

const expiringItems = [
  { name: "Milk", days: 2 },
  { name: "Spinach", days: 1 },
  { name: "Yogurt", days: 3 },
  { name: "Fresh Strawberries", days: 1 },
]

const ExpiringCard = memo(
  ({
    item,
    index,
    colors,
    fonts,
  }: {
    item: { name: string; days: number }
    index: number
    colors: any
    fonts: any
  }) => {
    const getUrgencyColor = (days: number) => {
      if (days <= 1) return colors.text
      if (days <= 3) return colors.warning
      return colors.text
    }

    const getUrgencyText = (days: number) => {
      if (days <= 1) return "Use today"
      if (days === 2) return "Use in 2 days"
      return `Expiring in ${days} days`
    }

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100, duration: 400 }}
      >
        <Card
          paddingVertical="$4"
          paddingHorizontal="$5"
          height={CARD_HEIGHT}
          borderRadius="$6"
          backgroundColor={colors.surface}
          borderColor={getUrgencyColor(item.days)}
          borderWidth={1}
          elevate
          justifyContent="space-between"
          minWidth={120}
          maxWidth={200}
        >
          <Text
            fontFamily={fonts.medium.fontFamily}
            fontSize={15}
            color={colors.text}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text
            fontSize={13}
            fontFamily={fonts.regular.fontFamily}
            color={getUrgencyColor(item.days)}
          >
            {getUrgencyText(item.days)}
          </Text>
        </Card>
      </MotiView>
    )
  }
)

export const ExpiringSoonSection = () => {
  const { colors, fonts } = useThemeColors()

  return (
    <YStack mb="$6">
      <Text
        fontSize={17}
        fontFamily={fonts.bold.fontFamily}
        color={colors.text}
        mb="$3"
      >
        🕒 Items Expiring Soon
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <XStack gap="$3" alignItems="flex-start">
          {expiringItems.map((item, i) => (
            <ExpiringCard
              key={item.name}
              item={item}
              index={i}
              colors={colors}
              fonts={fonts}
            />
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  )
}
