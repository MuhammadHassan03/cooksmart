import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Plus, Check } from "@tamagui/lucide-icons";
import { Input, Button, XStack, YStack, Text, View } from "tamagui";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export function IngredientForm({
  name, qty, unit, isEditing,
  onChangeName, onChangeQty, onChangeUnit, onSubmit,
}: IngredientFormProps) {
  const { colors } = useThemeColors();

  const handlePress = () => {
    if (Platform.OS === 'ios') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSubmit();
  };

  // Common Style for Inputs
  const inputStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: "$4",
    color: colors.text,
    fontSize: 15,
    focusStyle: { borderColor: colors.primary, borderWidth: 1.5, backgroundColor: colors.background }
  };

  return (
    <YStack space="$4" paddingVertical="$2">
      {/* Label & Main Input */}
      <YStack space="$1.5">
        <Text fontSize={12} fontWeight="700" color={colors.primary} ml="$1" ls={1}>
          ITEM NAME
        </Text>
        <Input
          placeholder="e.g. Fresh Tomatoes"
          h="$4.5"
          {...inputStyle}
          value={name}
          onChangeText={onChangeName}
        />
      </YStack>

      <XStack space="$3" ai="flex-end">
        {/* Qty Section */}
        <YStack flex={1} space="$1.5">
          <Text fontSize={11} fontWeight="700" color={colors.textSecondary} ml="$1">
            QTY
          </Text>
          <Input
            placeholder="0"
            h="$4"
            textAlign="center"
            {...inputStyle}
            value={qty}
            onChangeText={onChangeQty}
          />
        </YStack>

        {/* Unit Section */}
        <YStack flex={1.5} space="$1.5">
          <Text fontSize={11} fontWeight="700" color={colors.textSecondary} ml="$1">
            UNIT
          </Text>
          <Input
            placeholder="pcs, kg..."
            h="$4"
            {...inputStyle}
            value={unit}
            onChangeText={onChangeUnit}
          />
        </YStack>

        {/* Main Action Button */}
        <Button
          h="$4"
          px="$4"
          bg={isEditing ? "#10b981" : colors.primary}
          onPress={handlePress}
          br="$4"
          pressStyle={{ scale: 0.95, opacity: 0.9 }}
        >
          <XStack ai="center" space="$2">
            {isEditing ? <Check size={18} color="white" /> : <Plus size={18} color="white" />}
            <Text color="white" fontWeight="700" fontSize={14}>
              {isEditing ? "SAVE" : "ADD"}
            </Text>
          </XStack>
        </Button>
      </XStack>
    </YStack>
  );
}