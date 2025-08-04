import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useIngredientsManager } from "@/hooks/(authenticated)/useIngredientsManager";
import { COMMON_INGREDIENTS } from "@/constants";

import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { H4, Paragraph, YStack, Text, Button } from "tamagui";

import { IngredientForm } from "./IngredientForm";
import { IngredientList } from "./IngredientList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManualScreen() {
  const { colors, fonts } = useThemeColors();
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
  } = useIngredientsManager();

  const renderSuggestion = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => setFromSuggestion(item)}>
      <YStack
        paddingVertical="$2"
        paddingHorizontal="$3"
        marginRight="$2"
        borderRadius="$6"
        backgroundColor={colors.surface}
        borderColor={colors.border}
        borderWidth={1}
      >
        <Text color={colors.text}>{item}</Text>
      </YStack>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <YStack flex={1} padding="$4" space="$4">
          <YStack space="$2">
            <H4 fontFamily={fonts.bold.fontFamily} color={colors.text}>
              Add Ingredients
            </H4>
            <Paragraph color={colors.textSecondary} fontSize={14}>
              You can enter name, quantity, and unit manually or select from
              suggestions.
            </Paragraph>
          </YStack>

          <FlatList
            data={COMMON_INGREDIENTS}
            keyExtractor={(item) => item}
            renderItem={renderSuggestion}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 4,
              paddingHorizontal: 2,
            }}
            style={{ flexGrow: 0 }} // prevent FlatList from expanding vertically
          />

          <IngredientForm
            name={name}
            qty={quantity}
            unit={unit}
            onChangeName={setName}
            onChangeQty={setQuantity}
            onChangeUnit={setUnit}
            onSubmit={addOrUpdateIngredient}
          />

          <IngredientList
            ingredients={ingredients}
            onEdit={startEdit}
            onDelete={deleteIngredient}
            colors={colors}
          />

          <Button
            backgroundColor={colors.primary}
            color={colors.background}
            size="$5"
            fontWeight="600"
            onPress={() => {
              console.log("Submitted:", ingredients);
            }}
            disabled={ingredients.length === 0}
          >
            Save & Continue
          </Button>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
