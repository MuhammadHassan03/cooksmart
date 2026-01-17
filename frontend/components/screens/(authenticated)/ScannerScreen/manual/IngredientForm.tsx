import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Plus, Check } from "@tamagui/lucide-icons";
import { Input, Button, XStack, YStack, Text } from "tamagui";

type IngredientFormProps = {
  name: string;
  qty: string;
  unit: string;
  isEditing?: boolean; // Added to change button icon
  onChangeName: (text: string) => void;
  onChangeQty: (text: string) => void;
  onChangeUnit: (text: string) => void;
  onSubmit: () => void;
};

export function IngredientForm({
  name,
  qty,
  unit,
  isEditing,
  onChangeName,
  onChangeQty,
  onChangeUnit,
  onSubmit,
}: IngredientFormProps) {
  const { colors } = useThemeColors();

  return (
    <YStack space="$3">
      {/* Row 1: The Ingredient Name (Full Width) */}
      <YStack space="$1">
        <Input
          placeholder="What are you adding? (e.g. Organic Milk)"
          size="$4"
          backgroundColor={colors.surface}
          borderColor={colors.border}
          value={name}
          onChangeText={onChangeName}
          color={colors.text}
          borderRadius="$3"
        />
      </YStack>

      {/* Row 2: Quantity, Unit, and Action Button */}
      <XStack space="$2" alignItems="center">
        <Input
          placeholder="Qty"
          flex={1} // Grows to take available space
          size="$4"
          value={qty}
          onChangeText={onChangeQty}
          keyboardType="default" // Changed to default to allow "Half", "Some", etc.
          backgroundColor={colors.surface}
          color={colors.text}
          borderColor={colors.border}
          borderRadius="$3"
        />
        
        <Input
          placeholder="Unit"
          flex={1.5} // Give unit slightly more space than qty
          size="$4"
          value={unit}
          onChangeText={onChangeUnit}
          backgroundColor={colors.surface}
          color={colors.text}
          borderColor={colors.border}
          borderRadius="$3"
        />

        <Button
          icon={isEditing ? <Check size={20} /> : <Plus size={20} />}
          size="$4"
          width={60}
          backgroundColor={isEditing ? colors.primary : colors.primary}
          color="white"
          onPress={onSubmit}
          borderRadius="$3"
          elevation={2}
        >
        </Button>
      </XStack>
    </YStack>
  );
}