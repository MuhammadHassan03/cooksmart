import { FC, useMemo } from "react";
import { YStack, Paragraph, View, Text, XStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { IngredientItem } from "./IngredientItem";
import { Ingredient } from "@/utils/ingredients";
import { ShoppingBasket, ListChecks } from "@tamagui/lucide-icons";

type IngredientListProps = {
  ingredients: Ingredient[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  colors: any;
};

export const IngredientList: FC<IngredientListProps> = ({
  ingredients,
  onEdit,
  onDelete,
  colors,
}) => {
  
  // Static Empty State (No Animation)
  const renderEmptyState = useMemo(() => (
    <YStack flex={1} jc="center" ai="center" mt="$10" space="$4">
      <View p="$5" br="$12" bg={colors.surface} bw={1} bc={colors.border}>
        <ShoppingBasket size={48} color={colors.primary} opacity={0.4} />
      </View>
      <YStack space="$1">
        <Text textAlign="center" fontWeight="800" color={colors.text} fontSize={20}>
          Empty Basket
        </Text>
        <Paragraph color={colors.textSecondary} fontSize={14} textAlign="center" opacity={0.6}>
          Your temporary list is empty.{"\n"}Add items to see them here.
        </Paragraph>
      </YStack>
    </YStack>
  ), [colors]);

  if (ingredients.length === 0) return renderEmptyState;

  return (
    <View style={{ flex: 1, width: '100%' }}>
      {/* List Header */}
      <XStack jc="space-between" ai="center" px="$4" mb="$3" opacity={0.8}>
        <XStack ai="center" space="$2">
          <ListChecks size={14} color={colors.primary} />
          <Text fontSize={11} fontWeight="800" color={colors.textSecondary} ls={1}>
            CURRENT BATCH
          </Text>
        </XStack>
        <View bg={colors.primary} px="$2.5" py="$0.5" br="$10">
          <Text color="white" fontSize={10} fontWeight="900">{ingredients.length} ITEMS</Text>
        </View>
      </XStack>

      <FlashList
        data={ingredients}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        // Performance Fix: estimatedItemSize bilkul accurate hona chahiye
        estimatedItemSize={75} 
        contentContainerStyle={{ 
          paddingBottom: 100,
          paddingHorizontal: 8
        }}
        showsVerticalScrollIndicator={false}
        // Native spacing instead of animated views
        ItemSeparatorComponent={() => <View height={8} />} 
        renderItem={({ item, index }) => (
          <IngredientItem
            item={item}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            colors={colors}
          />
        )}
      />
    </View>
  );
};