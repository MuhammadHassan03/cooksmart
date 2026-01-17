import { XStack, YStack, Text, Button, Card } from "tamagui"
import { MotiView, AnimatePresence } from "moti"
import { useThemeColors } from "@/hooks/theme/useThemeColors"

const quickActions = [
  { label: "Scan My Fridge", icon: "📷", onPress: () => {} },
  { label: "Add Ingredient", icon: "🫕", onPress: () => {} },
  { label: "What Can I Cook?", icon: "🍽️", onPress: () => {} },
]

export const QuickActionsSection = () => {
  const { colors, fonts } = useThemeColors()

  return (
    <YStack mb="$6">
      <Text
        fontFamily={fonts.bold.fontFamily}
        fontSize={16}
        mb="$3"
        color={colors.text}
      >
        Quick Actions
      </Text>

      <XStack flexWrap="wrap" gap="$3">
        <AnimatePresence>
          {quickActions.map((action, i) => (
            <MotiView
              key={i}
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 80, duration: 300 }}
              style={{ flexGrow: 1, minWidth: "30%" }}
            >
              <Card
                elevate
                bordered
                backgroundColor={colors.surface}
                padding="$3"
                borderRadius="$5"
                onPress={action.onPress}
                pressStyle={{
                  backgroundColor: colors.backdrop,
                  scale: 0.98,
                }}
              >
                <YStack alignItems="center" justifyContent="center">
                  <Text fontSize={24}>{action.icon}</Text>
                  <Text
                    fontFamily={fonts.medium.fontFamily}
                    fontSize={13}
                    textAlign="center"
                    color={colors.text}
                    mt="$2"
                  >
                    {action.label}
                  </Text>
                </YStack>
              </Card>
            </MotiView>
          ))}
        </AnimatePresence>
      </XStack>
    </YStack>
  )
}
