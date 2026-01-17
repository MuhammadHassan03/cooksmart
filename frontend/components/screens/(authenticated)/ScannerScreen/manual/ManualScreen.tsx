import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useIngredientsManager } from "@/hooks/(authenticated)/useIngredientsManager";
import { COMMON_INGREDIENTS } from "@/constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { KeyboardAvoidingView, Platform, FlatList, TouchableOpacity } from "react-native";
import { H4, Paragraph, YStack, XStack, Text, Button, Theme, Separator } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Trash2 } from "@tamagui/lucide-icons";

import { IngredientForm } from "./IngredientForm";
import { IngredientList } from "./IngredientList";

export default function ManualScreen() {
  const { colors, fonts } = useThemeColors();
  const router = useRouter();
  const { detectedItems } = useLocalSearchParams<{ detectedItems?: string }>();
  
  const {
    name, quantity, unit, ingredients,
    setName, setQuantity, setUnit,
    addOrUpdateIngredient, deleteIngredient,
    startEdit, setFromSuggestion, hydrateIngredients, setIngredients,
    saveToPentry
  } = useIngredientsManager();

  // 1. Optimized Hydration
  useEffect(() => {
    if (!detectedItems) return;
    try {
      const parsed = JSON.parse(detectedItems);
      if (Array.isArray(parsed)) hydrateIngredients(parsed);
    } catch (e) {
      console.error("Hydration Error:", e);
    }
  }, [detectedItems]);

  const renderSuggestion = ({ item }: { item: typeof COMMON_INGREDIENTS[0] }) => (
    <TouchableOpacity onPress={() => setFromSuggestion(item)}>
      <YStack
        paddingVertical="$1.5"
        paddingHorizontal="$3"
        marginRight="$2"
        borderRadius="$10" // Pill shape looks more modern
        backgroundColor={colors.surface}
        borderColor={colors.border}
        borderWidth={1}
      >
        <Text fontSize={12} fontWeight="500" color={colors.textSecondary}>{item.name}</Text>
      </YStack>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <YStack flex={1} paddingHorizontal="$4" space="$3">
          
          {/* Header Section */}
          <XStack justifyContent="space-between" alignItems="center" paddingTop="$2">
            <YStack maxWidth="70%">
              <H4 fontFamily={fonts.bold.fontFamily} color={colors.text}>
                Inventory {ingredients.length > 0 && `(${ingredients.length})`}
              </H4>
            </YStack>
            {ingredients.length > 0 && (
              <Button 
                size="$2" 
                chromeless 
                icon={<Trash2 size={14} color={colors.warning} />}
                onPress={() => setIngredients([])}
              >
                <Text color={colors.warning} fontSize={12}>Clear</Text>
              </Button>
            )}
          </XStack>

          {/* Form Card - Separated for Focus */}
          <YStack 
            backgroundColor={colors.surface} 
            padding="$3" 
            borderRadius="$4" 
            borderWidth={1} 
            borderColor={colors.border}
            elevation={2}
          >
            <IngredientForm
              name={name} qty={quantity} unit={unit}
              onChangeName={setName} onChangeQty={setQuantity}
              onChangeUnit={setUnit} onSubmit={addOrUpdateIngredient}
            />
            
            <Separator marginVertical="$3" opacity={0.5} />
            
            <FlatList
              data={COMMON_INGREDIENTS.map(item => item)}
              renderItem={renderSuggestion}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
            />
          </YStack>

          <YStack flex={1}>
            <IngredientList
              ingredients={ingredients}
              onEdit={startEdit}
              onDelete={deleteIngredient}
              colors={colors}
            />
          </YStack>

          <YStack paddingTop="$2" paddingBottom="$4" backgroundColor={colors.background}>
            <Button
              backgroundColor={colors.primary}
              color="white"
              size="$5"
              borderRadius="$4"
              fontWeight="700"
              onPress={() => saveToPentry(ingredients)}
              disabled={ingredients.length === 0}
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
            >
              Finish & Add to Pantry
            </Button>
          </YStack>

        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}