import { FC, memo } from "react"
import { Button, Card, Text, XStack, YStack } from "tamagui"
import { Trash2, Edit3 } from "@tamagui/lucide-icons"

type Ingredient = {
  name: string
  quantity: string
  unit: string
}

type IngredientItemProps = {
  item: Ingredient
  index: number
  onEdit: (index: number) => void
  onDelete: (index: number) => void
  colors: {
    surface: string
    text: string
    textSecondary: string
    warning: string
  }
}

// Wrap in memo to prevent re-renders when typing in the form
export const IngredientItem: FC<IngredientItemProps> = memo(({
  item,
  index,
  onEdit,
  onDelete,
  colors,
}) => {
  return (
    <Card
      backgroundColor={colors.surface}
      bordered
      padding="$3"
      borderRadius="$4" // Match the theme's card radius
      pressStyle={{ scale: 0.98 }} // Haptic feel
    >
      <XStack justifyContent="space-between" alignItems="center" space="$2">
        {/* Text Container - Flex allows it to shrink instead of pushing buttons */}
        <YStack flex={1}>
          <Text 
            color={colors.text} 
            fontSize={16} 
            fontWeight="600"
            numberOfLines={1} // Prevents "blah blah" from breaking the UI
            ellipsizeMode="tail"
            textTransform="capitalize"
          >
            {item.name}
          </Text>
          <Text color={colors.textSecondary} fontSize={13}>
            {item.quantity} {item.unit}
          </Text>
        </YStack>

        {/* Action Buttons */}
        <XStack space="$1">
          <Button
            icon={<Edit3 size={16} color={colors.textSecondary} />}
            size="$3"
            circular
            chromeless
            onPress={() => onEdit(index)}
          />
          <Button
            icon={<Trash2 size={16} color={colors.warning} />}
            size="$3"
            circular
            chromeless
            onPress={() => onDelete(index)}
          />
        </XStack>
      </XStack>
    </Card>
  )
})