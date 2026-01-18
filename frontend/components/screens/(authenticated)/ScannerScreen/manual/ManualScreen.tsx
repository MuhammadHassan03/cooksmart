import { FC, memo, useEffect, useCallback } from "react";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useIngredientsManager } from "@/hooks/(authenticated)/useIngredientsManager";
import { COMMON_INGREDIENTS } from "@/constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { H4, YStack, XStack, Text, Button, View, Circle } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Trash2, Camera, ChevronRight, Sparkles } from "@tamagui/lucide-icons";

import { IngredientForm } from "./IngredientForm";
import { IngredientList } from "./IngredientList";

// Premium High-Contrast Suggestions
const SuggestionItem = memo(({ item, onPress, colors, isLight }: any) => (
  <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.6}>
    <View
      py="$2.5"
      px="$4"
      mr="$2"
      br="$12"
      backgroundColor={isLight ? "#f0f0f0" : "#1a1a1a"}
      borderWidth={1.5}
      borderColor={isLight ? "transparent" : "#262626"}
      shadowColor="#000"
      shadowRadius={5}
      shadowOpacity={0.1}
    >
      <Text fontSize={13} fontWeight="700" color={colors.text} opacity={0.9}>
        {item.name}
      </Text>
    </View>
  </TouchableOpacity>
));

export default function ManualScreen() {
  const { colors, isLight } = useThemeColors();
  const router = useRouter();
  const { detectedItems } = useLocalSearchParams<{ detectedItems?: string }>();

  const {
    name,
    quantity,
    unit,
    ingredients,
    setName,
    setQuantity,
    setUnit,
    addOrUpdateIngredient,
    deleteIngredient,
    startEdit,
    setFromSuggestion,
    hydrateIngredients,
    setIngredients,
  } = useIngredientsManager();

  useEffect(() => {
    if (!detectedItems) return;
    try {
      const parsed = JSON.parse(detectedItems);
      if (Array.isArray(parsed)) hydrateIngredients(parsed);
    } catch (e) {
      console.error("Hydration Error:", e);
    }
  }, [detectedItems]);

  const onSuggestionPress = useCallback(
    (item: any) => {
      setFromSuggestion(item);
    },
    [setFromSuggestion],
  );

  const hasItems = ingredients.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#FFFFFF" : "#000000" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <YStack flex={1} px="$4">
          
          {/* Header - Bold & Clean */}
          <XStack jc="space-between" ai="center" py="$5">
            <YStack>
              <H4 fontWeight="900" color={colors.text} letterSpacing={-1.5} fontSize={32}>
                Inventory
              </H4>
              <XStack ai="center" gap="$2">
                <View width={8} height={8} br={4} bg={hasItems ? "$green10" : "$gray8"} />
                <Text fontSize={12} fontWeight="800" color={colors.textSecondary} ls={0.5} opacity={0.6}>
                   {hasItems ? `${ingredients.length} ITEMS ADDED` : "EMPTY FRIDGE"}
                </Text>
              </XStack>
            </YStack>

            <XStack gap="$3">
               <Button
                circular
                size="$4.5"
                bg={isLight ? "$gray3" : "#111"}
                borderWidth={1}
                borderColor={isLight ? "$gray5" : "#222"}
                icon={<Camera size={22} color={colors.text} />}
                onPress={() => router.push("/(scanner)/ai")}
                pressStyle={{ scale: 0.9 }}
              />
              {hasItems && (
                <Button
                  circular
                  size="$4.5"
                  bg="#ff3b30"
                  icon={<Trash2 size={20} color="white" />}
                  onPress={() => setIngredients([])}
                  pressStyle={{ scale: 0.9 }}
                />
              )}
            </XStack>
          </XStack>

          {/* Form - Floating Depth */}
          <YStack gap="$5" pb="$4">
            <IngredientForm
              name={name}
              qty={quantity}
              unit={unit}
              onChangeName={setName}
              onChangeQty={setQuantity}
              onChangeUnit={setUnit}
              onSubmit={addOrUpdateIngredient}
            />

            {/* Neon Accent Suggestions */}
            <FlatList
              data={COMMON_INGREDIENTS}
              renderItem={({ item }) => (
                <SuggestionItem
                  item={item}
                  onPress={onSuggestionPress}
                  colors={colors}
                  isLight={isLight}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
              contentContainerStyle={{ paddingBottom: 5 }}
            />
          </YStack>

          {/* Main List */}
          <View flex={1} mt="$2">
            <IngredientList
              ingredients={ingredients}
              onEdit={startEdit}
              onDelete={deleteIngredient}
              colors={colors}
            />
          </View>

          {/* Sticky Footer - The Glow Action */}
          <YStack py="$4" bg={isLight ? "#FFFFFF" : "#000000"}>
            <Button
              bg={hasItems ? colors.primary : isLight ? "$gray4" : "#111"}
              height={62}
              borderRadius={20}
              onPress={() =>
                router.replace({
                  pathname: "/processing/processing",
                  params: { items: JSON.stringify(ingredients) },
                })
              }
              disabled={!hasItems}
              pressStyle={{ scale: 0.96 }}
              // Visual Pop
              shadowColor={hasItems ? colors.primary : "transparent"}
              shadowRadius={25}
              shadowOpacity={0.4}
              borderWidth={hasItems ? 0 : 1.5}
              borderColor={isLight ? "transparent" : "#222"}
            >
              <XStack jc="center" ai="center" gap="$3" width="100%">
                {hasItems && <Sparkles size={20} color="white" fill="white" />}
                <Text
                  color={hasItems ? "white" : colors.textSecondary}
                  fontWeight="900"
                  fontSize={18}
                  letterSpacing={-0.5}
                >
                  {hasItems ? "Confirm Inventory" : "Ready to Add?"}
                </Text>
                {hasItems && <ChevronRight size={22} color="white" strokeWidth={3} />}
              </XStack>
            </Button>
          </YStack>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}