import { FC } from "react"
import { Button, Card, Text, XStack } from "tamagui"
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
    warning: string
  }
}

export const IngredientItem: FC<IngredientItemProps> = ({
  item,
  index,
  onEdit,
  onDelete,
  colors,
}) => {
  return (
    <Card
      key={index}
      backgroundColor={colors.surface}
      bordered
      padding="$3"
      borderRadius="$6"
      elevate
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text color={colors.text} fontSize={16}>
          {item.name} - {item.quantity} {item.unit}
        </Text>
        <XStack space="$2">
          <Button
            icon={<Edit3 size={16} color={colors.text} />}
            size="$2"
            circular
            chromeless
            onPress={() => onEdit(index)}
          />
          <Button
            icon={<Trash2 size={16} />}
            size="$2"
            circular
            chromeless
            color={colors.warning}
            onPress={() => onDelete(index)}
          />
        </XStack>
      </XStack>
    </Card>
  )
}
