import React from 'react'
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { Sparkles, ArrowRight } from "@tamagui/lucide-icons"
import { View, Text, XStack, YStack, Circle } from "tamagui"
import { MotiView } from "moti"

export const SmartNudgesSection = () => {
  const { colors, fonts, isLight } = useThemeColors()

  return (
    <YStack mb="$4" px="$1">
      <MotiView
        // FIXED: 'y' ki jagah 'translateY' use kiya hy
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <XStack
          backgroundColor={isLight ? colors.card : `${colors.primary}10`} 
          borderRadius="$6"
          paddingVertical="$3"
          paddingHorizontal="$4"
          alignItems="center"
          justifyContent="space-between"
          gap="$3"
          position="relative"
          overflow="hidden"
          borderWidth={1}
          borderColor={colors.border}
          shadowColor={colors.shadow}
          shadowRadius={8}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={isLight ? 0.1 : 0} 
        >
          <Circle 
            size={38} 
            backgroundColor={colors.primarySubtle} 
            justifyContent="center" 
            alignItems="center"
          >
            <Sparkles size={18} color={colors.primary} />
          </Circle>

          <YStack flex={1}>
            <Text 
              color={colors.primary} 
              fontFamily={fonts.bold.fontFamily} 
              fontSize={10}
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              Chef's Tip
            </Text>
            <Text 
              color={colors.text} 
              fontSize={13}
              fontFamily={fonts.medium.fontFamily} 
              lineHeight={16}
            >
              Your <Text color={colors.primary} fontFamily={fonts.bold.fontFamily} fontSize={13}>Spinach</Text> is fresh. Cook today!
            </Text>
          </YStack>

          <View 
            backgroundColor={colors.primary} 
            padding="$1.5" 
            borderRadius={100} 
            pressStyle={{ scale: 0.9, opacity: 0.9 }}
          >
            <ArrowRight size={14} color="white" />
          </View>

          <View 
            position="absolute" 
            top={-15} 
            right={-15} 
            width={70} 
            height={70} 
            borderRadius={100} 
            backgroundColor={colors.primary} 
            opacity={0.05} 
            zIndex={-1} 
          />
        </XStack>
      </MotiView>
    </YStack>
  )
}