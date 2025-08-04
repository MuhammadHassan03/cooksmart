import { ScrollView, XStack, Text, Card, YStack } from "tamagui"
import { MotiView } from "moti"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { memo } from "react"

const recipes = [
  { name: "Pasta", subtitle: "With what's in your fridge" },
  { name: "Omelette", subtitle: "Egg-cellent choice" },
  { name: "Veg Stir Fry", subtitle: "Fresh & fast" },
  { name: "Tomato Soup", subtitle: "Quick & warm" },
]

const CARD_HEIGHT = 100

const SuggestedRecipeCard = memo(
  ({
    recipe,
    index,
    colors,
    fonts,
  }: {
    recipe: { name: string; subtitle: string }
    index: number
    colors: any
    fonts: any
  }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 120, duration: 400 }}
    >
      <Card
        height={CARD_HEIGHT}
        minWidth={140}
        maxWidth={200}
        paddingVertical="$4"
        paddingHorizontal="$5"
        borderRadius="$6"
        backgroundColor={colors.surface}
        borderColor={colors.border}
        borderWidth={1}
        elevate
        justifyContent="space-between"
      >
        <Text
          fontSize={15}
          fontFamily={fonts.medium.fontFamily}
          color={colors.text}
          numberOfLines={1}
        >
          {recipe.name}
        </Text>
        <Text
          fontSize={12}
          fontFamily={fonts.regular.fontFamily}
          color={colors.textSecondary}
          numberOfLines={1}
        >
          {recipe.subtitle}
        </Text>
      </Card>
    </MotiView>
  )
)

export const SuggestedRecipesSection = () => {
  const { colors, fonts } = useThemeColors()

  return (
    <YStack mb="$6">
      <Text
        fontSize={17}
        fontFamily={fonts.bold.fontFamily}
        color={colors.text}
        mb="$3"
      >
        🍝 Recipes You Can Cook
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <XStack gap="$3">
          {recipes.map((r, i) => (
            <SuggestedRecipeCard
              key={r.name}
              recipe={r}
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
