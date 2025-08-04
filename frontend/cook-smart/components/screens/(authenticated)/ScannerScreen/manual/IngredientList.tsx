import { FC } from "react"
import { ScrollView, YStack, Paragraph } from "tamagui"
import { IngredientItem } from "./IngredientItem"

type Ingredient = {
  name: string
  quantity: string
  unit: string
}

type IngredientListProps = {
  ingredients: Ingredient[]
  onEdit: (index: number) => void
  onDelete: (index: number) => void
  colors: {
    surface: string
    text: string
    textSecondary: string
    warning: string
  }
}

export const IngredientList: FC<IngredientListProps> = ({
  ingredients,
  onEdit,
  onDelete,
  colors,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack space="$3" marginTop="$3" paddingBottom="$8">
        {ingredients.length > 0 ? (
          ingredients.map((item, index) => (
            <IngredientItem
              key={index}
              item={item}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
              colors={colors}
            />
          ))
        ) : (
          <Paragraph
            color={colors.textSecondary}
            fontSize={14}
            textAlign="center"
          >
            No ingredients added yet.
          </Paragraph>
        )}
      </YStack>
    </ScrollView>
  )
}
