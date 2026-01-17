import React from "react"
import { Dimensions } from "react-native"
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown } from "react-native-reanimated"
import { XStack, YStack, Paragraph, H4, Button, Text, View } from "tamagui"
import { usePremium } from "@/context/PremiumContext"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { CheckCircle, Lock } from "@tamagui/lucide-icons"
import { router } from "expo-router"

type UpsellModalProps = {
  open: boolean
  onClose: () => void
}

export function UpsellModal({ open, onClose }: UpsellModalProps) {
  const { colors, fonts } = useThemeColors()
  const { purchasePremium } = usePremium()

  if (!open) return null

  const { height } = Dimensions.get("window")

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
        zIndex: 1000,
      }}
    >
      <Animated.View
        entering={SlideInUp.duration(300)}
        exiting={SlideOutDown.duration(200)}
        style={{ backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
      >
        <YStack padding="$5" space="$5" alignItems="center">
          <XStack alignItems="center" space="$3">
            <Lock size={22} color={colors.primary} />
            <H4 fontFamily={fonts.bold.fontFamily} color={colors.text} fontSize={18}>
              Go Premium
            </H4>
          </XStack>

          <Paragraph fontSize={14} color={colors.textSecondary} textAlign="center" maxWidth={300}>
            Unlock unlimited scans, faster AI, and priority updates with Premium.
          </Paragraph>

          <YStack space="$3" width="100%">
            {[
              "Unlimited document scans",
              "Early access to new features",
              "Priority support",
            ].map((item) => (
              <XStack key={item} alignItems="center" space="$2">
                <CheckCircle size={16} color={colors.primary} />
                <Text color={colors.text} fontSize={13}>
                  {item}
                </Text>
              </XStack>
            ))}
          </YStack>

          <Button
            backgroundColor={colors.primary}
            color={colors.background}
            borderRadius="$10"
            size="$4"
            width="100%"
            onPress={purchasePremium}
          >
            Upgrade Now 🚀
          </Button>

          <Text fontSize={12} color={colors.textSecondary}>
            Cancel anytime. No hidden fees.
          </Text>

          <Button unstyled size="$2" onPress={onClose}>
            <Text fontSize={13} color={colors.textSecondary} onPress={() => router.back()}>
              Not now
            </Text>
          </Button>
        </YStack>
      </Animated.View>
    </Animated.View>
  )
}
