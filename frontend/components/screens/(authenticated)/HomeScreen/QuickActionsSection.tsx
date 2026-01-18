import React, { memo, useCallback } from "react"
import { XStack, YStack, Text, Card, H3, View, Circle } from "tamagui"
import { MotiView } from "moti"
import { Camera, PlusCircle, ChefHat } from "@tamagui/lucide-icons"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { useRouter } from "expo-router"

const ActionCard = memo(({ label, icon, onPress, flex, colors, fonts, isLight }: any) => {
  return (
    <Card
      flex={flex}
      // LIGHT MODE FIX: White background par halka sa primary shadow/glow effect
      backgroundColor={isLight ? "white" : colors.surface}
      padding="$4"
      borderRadius="$6"
      onPress={onPress}
      pressStyle={{ scale: 0.96, opacity: 0.9 }}
      borderWidth={1}
      // Border ko thora base primary se match kiya hy
      borderColor={isLight ? `${colors.primary}30` : colors.border}
      shadowColor={colors.primary}
      shadowRadius={isLight ? 10 : 0}
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={isLight ? 0.06 : 0}
    >
      <YStack alignItems="center" justifyContent="center" gap="$3">
        {/* LIGHT MODE FIX: Circle ko solid primary tint diya hy taake pop kare */}
        <Circle 
          size={48} 
          backgroundColor={isLight ? `${colors.primary}15` : `${colors.primary}10`}
        >
          {icon}
        </Circle>
        
        <Text 
          fontFamily={fonts.bold.fontFamily} 
          fontSize={14} 
          // Text color ko light mode mein primary rakha hy consistency ke liye
          color={isLight ? colors.primary : colors.text} 
          textAlign="center"
        >
          {label}
        </Text>
      </YStack>
    </Card>
  )
})

export const QuickActionsSection = () => {
  const { colors, fonts, isLight } = useThemeColors()
  const router = useRouter()

  const handleScan = useCallback(() => router.push("/(scanner)/ai"), [router])

  return (
    <YStack marginBottom="$4" gap="$3.5">
      <Text fontFamily={fonts.bold.fontFamily} fontSize={18} color={colors.text} letterSpacing={-0.5}>
        Smart Actions
      </Text>

      {/* Main Feature Card */}
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 400 }}
      >
        <Card
          backgroundColor={colors.primary}
          padding="$5"
          borderRadius="$7"
          onPress={handleScan}
          pressStyle={{ scale: 0.98 }}
          shadowColor={colors.primary}
          shadowRadius={20}
          shadowOffset={{ width: 0, height: 10 }}
          shadowOpacity={isLight ? 0.35 : 0}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <YStack gap="$1.5">
              <H3 color="white" fontSize={22} fontFamily={fonts.bold.fontFamily} letterSpacing={-0.5}>
                Scan My Fridge
              </H3>
              <Text color="rgba(255,255,255,0.9)" fontSize={14} fontFamily={fonts.medium.fontFamily}>
                AI-powered detection
              </Text>
            </YStack>
            <View backgroundColor="rgba(255,255,255,0.2)" padding="$3" borderRadius="$10">
               <Camera size={28} color="white" />
            </View>
          </XStack>
        </Card>
      </MotiView>

      {/* Row: Add Item & What to Cook */}
      <XStack gap="$3.5">
        <ActionCard 
          label="Add Item" 
          icon={<PlusCircle size={24} color={colors.primary} />} 
          onPress={() => {}} 
          flex={1}
          colors={colors}
          fonts={fonts}
          isLight={isLight}
        />
        <ActionCard 
          label="What to Cook?" 
          icon={<ChefHat size={24} color={colors.primary} />} 
          onPress={() => {}} 
          flex={1.2}
          colors={colors}
          fonts={fonts}
          isLight={isLight}
        />
      </XStack>
    </YStack>
  )
}