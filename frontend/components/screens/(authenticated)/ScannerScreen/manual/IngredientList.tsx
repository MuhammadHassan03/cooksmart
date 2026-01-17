import { FC } from "react";
import { ScrollView, YStack, Paragraph } from "tamagui";
import { IngredientItem } from "./IngredientItem";
import { Ingredient } from "@/utils/ingredients";

type IngredientListProps = {
  ingredients: Ingredient[];

  onEdit: (index: number) => void;

  onDelete: (index: number) => void;

  colors: {
    surface: string;
    text: string;
    textSecondary: string;
    warning: string;
    border: string;
  };
};
export const IngredientList: FC<IngredientListProps> = ({
  ingredients,
  onEdit,
  onDelete,
  colors,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // This ensures the content doesn't get hidden behind the "Finish" button
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <YStack space="$2.5" marginTop="$2">
        {ingredients.length > 0 ? (
          ingredients.map((item, index) => (
            <IngredientItem
              key={`${item.name}-${index}`} // Better key
              item={item}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
              colors={colors}
            />
          ))
        ) : (
          <YStack padding="$10" alignItems="center" space="$2">
            <Paragraph
              color={colors.textSecondary}
              fontSize={15}
              textAlign="center"
              opacity={0.6}
            >
              Your pantry is empty.{"\n"}Scan a photo or add manually!
            </Paragraph>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
};
