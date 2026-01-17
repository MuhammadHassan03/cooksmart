import {
  YStack,
  Text,
  ScrollView,
  Input,
  Button,
  H4,
  Separator,
} from "tamagui"
import { useState } from "react"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader"
import RecipeCard from "@/components/screens/(authenticated)/ReciepeScreen/RecipeCard"
import FilterBar from "@/components/screens/(authenticated)/ReciepeScreen/FilterBar"
import PremiumBanner from "@/components/screens/(authenticated)/ReciepeScreen/PremiumBanner"
import { useAuth } from "@/context/AuthContext"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { SafeAreaView } from "react-native-safe-area-context"

export default function RecipeScreen() {
  const { colors } = useThemeColors()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const tabBarHeight = useBottomTabBarHeight()

  const recommendedRecipes = [
    {
      id: 1,
      title: "Avocado Toast",
      isPremium: false,
      tags: ["Vegan", "Quick"],
    },
    {
      id: 2,
      title: "Creamy Broccoli Pasta",
      isPremium: true,
      tags: ["Vegetarian"],
    },
    {
      id: 3,
      title: "Chickpea Salad Bowl",
      isPremium: false,
      tags: ["High Protein"],
    },
  ]

  const savedRecipes = [
    { id: 101, title: "Thai Green Curry", isPremium: false, tags: ["Dinner"] },
    {
      id: 102,
      title: "Stuffed Bell Peppers",
      isPremium: true,
      tags: ["Low Carb"],
    },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingBottom: tabBarHeight - 30 }}>
      {/* Top Header */}
      <ReusableHeader title="Recipes" />

      {/* Main Scrollable Content */}
      <ScrollView
        padding="$4"
        contentContainerStyle={{
          paddingBottom: tabBarHeight + 30,
        }}
      >
        <YStack space="$4">
          {/* Search Input */}
          <Input
            size="$4"
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            backgroundColor={colors.surface}
            borderColor={colors.border}
            color={colors.text}
          />

          {/* Filters */}
          <FilterBar />

          {/* Premium CTA */}
          {!user?.isPremium && <PremiumBanner />}

          {/* Recommended Recipes (AI-Powered) */}
          <YStack space="$2">
            <H4 color={colors.text}>AI-Powered Suggestions</H4>
            {recommendedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} title={recipe.title} duration="30 min" imageUrl="https://example.com/recipe-image.jpg" isPremium={recipe.isPremium} onPress={() => console.log("Recipe pressed")} />
            ))}
          </YStack>

          <Separator borderColor={colors.border} />

          {/* Saved Recipes */}
          <YStack space="$2">
            <H4 color={colors.text}>Saved Recipes</H4>
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} title={recipe.title} duration="30 min" imageUrl="https://example.com/recipe-image.jpg" isPremium={recipe.isPremium} onPress={() => console.log("Recipe pressed")} />
              ))
            ) : (
              <Text color={colors.textSecondary} fontSize="$3">
                No saved recipes yet.
              </Text>
            )}
          </YStack>

          {/* CTA: AI-Based Generation */}
          <Button
            marginTop="$4"
            size="$4"
            backgroundColor={colors.primary}
            onPress={() => console.log("Generate recipes with AI")}
          >
            What Can I Cook?
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
