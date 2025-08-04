import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Plus } from "@tamagui/lucide-icons";
import { Input, Button, XStack } from "tamagui";

type IngredientFormProps = {
  name: string;
  qty: string;
  unit: string;
  onChangeName: (text: string) => void;
  onChangeQty: (text: string) => void;
  onChangeUnit: (text: string) => void;
  onSubmit: () => void;
};

export function IngredientForm({
  name,
  qty,
  unit,
  onChangeName,
  onChangeQty,
  onChangeUnit,
  onSubmit,
}: IngredientFormProps) {
  const { colors } = useThemeColors();

  return (
    <XStack space="$3" alignItems="center">
      <Input
        placeholder="Name"
        flex={1}
        size="$4"
        backgroundColor={colors.surface}
        borderColor={colors.border}
        value={name}
        onChangeText={onChangeName}
        returnKeyType="done"
        color={colors.text}
      />
      <Input
        placeholder="Qty"
        width={60}
        size="$4"
        value={qty}
        onChangeText={onChangeQty}
        keyboardType="numeric"
        backgroundColor={colors.surface}
        color={colors.text}
        borderColor={colors.border}
      />
      <Input
        placeholder="Unit"
        width={60}
        size="$4"
        value={unit}
        onChangeText={onChangeUnit}
        backgroundColor={colors.surface}
        color={colors.text}
        borderColor={colors.border}
      />
      <Button
        icon={<Plus size={20} />}
        size="$4"
        backgroundColor={colors.primary}
        color={colors.background}
        onPress={onSubmit}
        elevate
        circular
      />
    </XStack>
  );
}
