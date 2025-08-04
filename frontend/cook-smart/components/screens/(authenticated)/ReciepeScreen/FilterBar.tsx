import { ScrollView, XStack, Button } from "tamagui";
import { useState } from "react";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

const filters = ["All", "Vegan", "Quick", "Low Carb", "Desserts", "Breakfast"];

export default function FilterBar({
  onFilterChange,
}: {
  onFilterChange?: (filter: string) => void;
}) {
  const [selected, setSelected] = useState("All");
  const { colors } = useThemeColors();

  const handleSelect = (filter: string) => {
    setSelected(filter);
    onFilterChange?.(filter);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack gap="$2" paddingHorizontal="$2">
        {filters.map((filter) => (
          <Button
            key={filter}
            size="$2"
            backgroundColor={
              selected === filter ? colors.primary : colors.surface
            }
            color={selected === filter ? colors.card : colors.textSecondary}
            borderRadius="$6"
            onPress={() => handleSelect(filter)}
          >
            {filter}
          </Button>
        ))}
      </XStack>
    </ScrollView>
  );
}
