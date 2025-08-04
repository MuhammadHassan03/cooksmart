import { Card, Text, Button, YStack } from "tamagui"
import { MotiView } from "moti"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { Rocket } from "@tamagui/lucide-icons"

export const PremiumUpgradeCard = () => {
  const { colors, fonts } = useThemeColors()

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 400 }}
    >
      <Card
        padding="$5"
        borderRadius="$6"
        backgroundColor={colors.accentLight}
        borderColor={colors.accent}
        borderWidth={1}
        alignItems="center"
        justifyContent="center"
        elevate
      >
        <YStack alignItems="center" gap="$3">
          <Rocket size={20} color={colors.accent} />

          <Text
            fontSize={16}
            fontFamily={fonts.bold.fontFamily}
            textAlign="center"
            color={colors.text}
            lineHeight={22}
          >
            Unlock Meal Planning, AI Recipes, and more with{" "}
            <Text color={colors.accent}>Premium</Text>
          </Text>

          <Button
            size="$3"
            backgroundColor={colors.accent}
            color="$white"
            borderRadius="$4"
            fontFamily={fonts.medium.fontFamily}
            mt="$2"
          >
            Upgrade Now
          </Button>
        </YStack>
      </Card>
    </MotiView>
  )
}
