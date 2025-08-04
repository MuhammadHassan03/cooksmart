import { useEffect } from "react"
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from "react-native-reanimated"
import { MotiView } from "moti"
import { YStack, Text, Card, XStack, Paragraph } from "tamagui"
import { Sparkles } from "@tamagui/lucide-icons"
import { useThemeColors } from "@/hooks/theme/useThemeColors"

export const SmartNudgesSection = () => {
  const { colors, fonts } = useThemeColors()
  const translateX = useSharedValue(-120)

  useEffect(() => {
    translateX.value = withTiming(250, {
      duration: 1800,
    })
  }, [])

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: 0.06,
  }))

  return (
    <YStack mb="$6" position="relative">
      <Card
        padding="$4"
        borderRadius="$6"
        backgroundColor={colors.surface}
        borderColor={colors.accent}
        borderWidth={1}
        elevate
        overflow="hidden"
      >
        {/* Lightweight shimmer (single pass only) */}
        <MotiView
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: 40,
              backgroundColor: colors.accent,
              borderRadius: 20,
              zIndex: 0,
            },
            shimmerStyle,
          ]}
        />

        {/* Foreground content */}
        <YStack zIndex={1}>
          <XStack alignItems="center" gap="$2" mb="$2">
            <Sparkles size={16} color={colors.accent} />
            <Text
              color={colors.accent}
              fontFamily={fonts.medium.fontFamily}
              fontSize={13}
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              Smart Nudge
            </Text>
          </XStack>

          <Paragraph
            color={colors.text}
            fontSize={15}
            lineHeight={22}
            fontFamily={fonts.regular.fontFamily}
            mb="$3"
          >
            Don’t forget to use your{" "}
            <Text fontWeight="700" color={colors.primary}>
              spinach
            </Text>{" "}
            today. It’s fresh and ready, and we’d hate to see it go to waste.
          </Paragraph>

          <XStack justifyContent="flex-end">
            <Text
              fontSize={11}
              color={colors.textSecondary}
              fontFamily={fonts.medium.fontFamily}
              opacity={0.8}
            >
              AI-Powered Insight
            </Text>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  )
}
