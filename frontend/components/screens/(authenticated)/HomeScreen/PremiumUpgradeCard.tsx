import React, { useState } from 'react'
import { Card, Text, Button, YStack, XStack, View, Circle } from "tamagui"
import { MotiView } from "moti"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { Rocket, CheckCircle2, Crown } from "@tamagui/lucide-icons"
import { CustomSheet } from "@/components/ui/reuseable/ThemedSheet"

export const PremiumUpgradeCard = () => {
  const { colors, fonts, isLight } = useThemeColors()
  const [showSheet, setShowSheet] = useState(false)

  const proFeatures = [
    "Unlimited Smart AI Recipes",
    "Real-time Expiry Notifications",
    "Custom Weekly Meal Plans",
    "No Advertisements"
  ]

  return (
    <YStack mb="$6" px="$1">
      <MotiView 
        // FIXED MOTI TS ERROR: translateY use karein y ke bajaye
        from={{ opacity: 0, translateY: 10 }} 
        animate={{ opacity: 1, translateY: 0 }}
      >
        <Card
          padding="$4"
          borderRadius="$7"
          // AUTO THEME COLOR
          backgroundColor={isLight ? colors.card : colors.surface}
          borderWidth={1}
          borderColor={colors.border}
          onPress={() => setShowSheet(true)}
          pressStyle={{ scale: 0.98 }}
          // CONSISTENT SHADOW
          shadowColor={colors.shadow}
          shadowRadius={10}
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={isLight ? 0.1 : 0}
        >
          <XStack ai="center" jc="space-between" gap="$4">
            {/* NO HARDCODED HEX: colors.primarySubtle or Template Literal */}
            <Circle size={45} backgroundColor={`${colors.primary}15`}>
              <Crown size={22} color={colors.primary} />
            </Circle>

            <YStack f={1} gap="$0.5">
              <Text fontFamily={fonts.bold.fontFamily} fontSize={16} color={colors.text}>
                Get Premium Access
              </Text>
              <Text fontSize={12} color={colors.textSecondary} opacity={0.7}>
                Unlock AI recipes & smart meal planning
              </Text>
            </YStack>

            <Button 
              size="$2.5" 
              backgroundColor={colors.primary} 
              borderRadius="$10"
              onPress={() => setShowSheet(true)}
              pressStyle={{ scale: 0.95 }}
            >
              <Text color="white" fontSize={11} fontFamily={fonts.bold.fontFamily}>GO PRO</Text>
            </Button>
          </XStack>
        </Card>
      </MotiView>

      <CustomSheet 
        open={showSheet} 
        onOpenChange={setShowSheet} 
        snapPoints={[70]} 
        portalProps={{ stackZIndex: 20000 }} 
      >
        <YStack gap="$5" pt="$2" pb="$12"> 
          <YStack ai="center" gap="$2">
            <Circle size={65} backgroundColor={`${colors.primary}15`}>
              <Rocket size={32} color={colors.primary} />
            </Circle>
            <Text fontSize={24} fontFamily={fonts.bold.fontFamily} color={colors.text}>
              Upgrade to Pro
            </Text>
            <Text textAlign="center" color={colors.textSecondary} px="$6" fontSize={14} fontFamily={fonts.medium.fontFamily}>
              Take your kitchen to the next level with our AI-powered features.
            </Text>
          </YStack>

          <YStack gap="$3" px="$4">
            {proFeatures.map((feature, i) => (
              <XStack 
                key={i} 
                ai="center" 
                gap="$3" 
                backgroundColor={isLight ? colors.card : colors.surface} 
                p="$3.5" 
                borderRadius="$4" 
                borderWidth={1} 
                borderColor={colors.border}
              >
                <CheckCircle2 size={18} color={colors.primary} />
                <Text fontSize={14} fontFamily={fonts.medium.fontFamily} color={colors.text}>
                  {feature}
                </Text>
              </XStack>
            ))}
          </YStack>

          <YStack px="$4" gap="$3">
            <Button 
              backgroundColor={colors.primary} 
              height={52} 
              borderRadius="$10"
              pressStyle={{ opacity: 0.9, scale: 0.98 }}
            >
              <Text color="white" fontFamily={fonts.bold.fontFamily} fontSize={16}>
                Start 7-Day Free Trial
              </Text>
            </Button>
            
            <YStack ai="center" gap="$1">
              <Text fontSize={12} color={colors.textSecondary} textAlign="center" fontFamily={fonts.medium.fontFamily}>
                Only $4.99/month after trial. Cancel anytime.
              </Text>
              <Text 
                fontSize={10} 
                color={colors.textSecondary} 
                opacity={0.5} 
                textAlign="center"
                px="$8"
              >
                By upgrading, you agree to our Terms of Service and Privacy Policy.
              </Text>
            </YStack>
          </YStack>
        </YStack>
      </CustomSheet>
    </YStack>
  )
}