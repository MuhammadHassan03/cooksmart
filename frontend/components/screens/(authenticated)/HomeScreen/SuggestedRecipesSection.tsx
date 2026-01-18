import React, { memo } from 'react'
import { ScrollView, XStack, Text, Card, YStack, View, Button } from "tamagui"
import { MotiView } from "moti"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { ArrowRight, Timer, Sparkles } from "@tamagui/lucide-icons"

interface Recipe {
  name: string
  time: string
  match: string
  type: string
}

const recipes: Recipe[] = [
  { name: "Pasta Primavera", time: "15m", match: "4/5", type: "Lunch" },
  { name: "Golden Omelette", time: "5m", match: "All", type: "Breakfast" },
  { name: "Quick Stir Fry", time: "12m", match: "3/4", type: "Dinner" },
  { name: "Creamy Soup", time: "20m", match: "All", type: "Appetizer" },
]

const SuggestedRecipeCard = memo(({ recipe, index, colors, fonts, isLight }: any) => (
  <MotiView
    from={{ opacity: 0, scale: 0.9, translateY: 10 }} // FIXED: y -> translateY
    animate={{ opacity: 1, scale: 1, translateY: 0 }} // FIXED: y -> translateY
    transition={{ delay: index * 100, type: 'spring', damping: 15 }}
  >
    <Card
      width={175} 
      height={150} 
      borderRadius="$6" // FIXED: br -> borderRadius
      backgroundColor={colors.card}
      borderWidth={1} // FIXED: bw -> borderWidth
      borderColor={colors.border} // FIXED: boc -> borderColor
      padding="$4" // FIXED: p -> padding
      justifyContent="space-between"
      shadowColor={isLight ? colors.shadow : "transparent"} // FIXED: shc -> shadowColor
      shadowRadius={10}
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={isLight ? 0.1 : 0}
      pressStyle={{ scale: 0.97 }}
    >
      <YStack gap="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <View backgroundColor={colors.primarySubtle} px="$2" py="$0.5" borderRadius="$2">
            <Text fontSize={9} fontWeight="800" color={colors.primary} textTransform="uppercase">
              {recipe.type}
            </Text>
          </View>
          <Sparkles size={14} color={colors.primary} opacity={0.8} />
        </XStack>
        
        <Text 
          fontSize={16} 
          fontFamily={fonts.bold.fontFamily} 
          color={colors.text} 
          numberOfLines={2}
          lineHeight={18}
          marginTop="$1"
        >
          {recipe.name}
        </Text>
      </YStack>

      <XStack justifyContent="space-between" alignItems="center">
        <YStack gap="$1">
            <Text fontSize={10} color={colors.textSecondary} fontFamily={fonts.medium.fontFamily}>
               {recipe.match === "All" ? "Full Match ✨" : `${recipe.match} ingredients`}
            </Text>
            <XStack alignItems="center" gap="$1.5">
              <Timer size={12} color={colors.textSecondary} />
              <Text fontSize={11} color={colors.textSecondary} fontFamily={fonts.medium.fontFamily}>
                {recipe.time}
              </Text>
            </XStack>
        </YStack>
        
        <View 
          backgroundColor={colors.primary} 
          padding="$1.5" 
          borderRadius="$10"
          shadowColor={colors.primary}
          shadowRadius={5}
          shadowOpacity={0.3}
        >
          <ArrowRight size={14} color="white" />
        </View>
      </XStack>
    </Card>
  </MotiView>
))

export const SuggestedRecipesSection = () => {
  // isLight ab seedha hook se mil raha hy
  const { colors, fonts, isLight } = useThemeColors()

  return (
    <YStack mb="$6" gap="$4">
      <XStack justifyContent="space-between" alignItems="flex-end" px="$1">
        <YStack gap="$0.5">
          <Text fontSize={18} fontFamily={fonts.bold.fontFamily} color={colors.text} letterSpacing={-0.5}>
            Pantry Recipes 🍝
          </Text>
          <Text fontSize={13} color={colors.textSecondary} fontFamily={fonts.medium.fontFamily}>
            Based on your ingredients
          </Text>
        </YStack>
        <Button backgroundColor="transparent" p={0} h="auto">
          <Text fontSize={14} color={colors.primary} fontFamily={fonts.bold.fontFamily}>
            View More
          </Text>
        </Button>
      </XStack>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 4 }} // ScrollView spacing fix
      >
        <XStack gap="$4" paddingRight="$4">
          {recipes.map((r, i) => (
            <SuggestedRecipeCard 
              key={i} 
              recipe={r} 
              index={i} 
              colors={colors} 
              fonts={fonts} 
              isLight={isLight}
            />
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  )
}