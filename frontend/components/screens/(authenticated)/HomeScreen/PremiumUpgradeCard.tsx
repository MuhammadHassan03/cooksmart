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
        backgroundColor={colors.card}
        borderColor={colors.accent}
        borderWidth={1}
        alignItems="center"
        justifyContent="center"
        elevate
        gap="$4"
      >
        <YStack alignItems="center" space="$3">
          <Rocket size={28} color={colors.accent} opacity={0.8} />

          <Text
            fontSize="$6"
            fontFamily={fonts.bold.fontFamily}
            textAlign="center"
            color={colors.text}
          >
            Go Premium
          </Text>

          <Text
            fontSize="$4"
            fontFamily={fonts.medium.fontFamily}
            textAlign="center"
            color={colors.text}
            maxWidth={280}
            lineHeight={22}
          >
            Unlock meal planning, smart AI recipes, and personalized nudges with{" "}
            <Text color={colors.accent} fontFamily={fonts.bold.fontFamily}>
              Premium
            </Text>
          </Text>

          <Button
            size="$3"
            backgroundColor={colors.accent}
            color="$white"
            borderRadius="$10"
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
