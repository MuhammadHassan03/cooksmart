import React, { useState, useCallback, memo } from "react";
import { YStack, XStack, Text, View } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { Plus, Flame, Clock, ChefHat, ChevronRight } from "@tamagui/lucide-icons";

import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { DatePill } from "@/components/ui/reuseable/ThemedDatePill";
import { ItemCard } from "@/components/ui/reuseable/ThemedItemCard";
import { WEEK_DATA } from "@/services/system";

// 1. Calendar ko separate component bana diya (Header lag fix karne ke liye)
const WeeklyCalendar = memo(({ selectedDate, onSelect, colors }: any) => {
  return (
    <View h={110} py="$3">
      <FlashList
        data={WEEK_DATA}
        horizontal
        estimatedItemSize={75}
        extraData={selectedDate} // Critical for highlighting
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.dateString}
        renderItem={({ item }) => (
          <View mr="$3">
            <DatePill
              item={item}
              isSelected={selectedDate === item.dateString}
              onSelect={onSelect}
              colors={colors}
            />
          </View>
        )}
      />
    </View>
  );
});

const MealSlot = memo(({ slot, colors }: any) => {
  const hasRecipe = !!slot.recipe;

  return (
    <YStack gap="$2" mb="$3">
      {/* Header with simple dot indicator */}
      <XStack ai="center" gap="$2" px="$1">
        <View
          w={6} h={6} br="$full"
          bg={hasRecipe ? colors.primary : colors.border}
        />
        <Text fontSize={12} fontWeight="800" color={colors.textSecondary} tt="uppercase" ls={1.5}>
          {slot.type}
        </Text>
      </XStack>

      {hasRecipe ? (
        <ItemCard
          name={slot.recipe}
          bg={colors.card}
          bw={1}
          boc={colors.border + "30"}
          br="$5"
          elevation={1}
          // Subtitle mein se bhi icons hata diye, sirf text rakha
          subtitle={
            <XStack ai="center" gap="$3">
              <Text fontSize={13} color={colors.textSecondary} fontWeight="600">
                {slot.cals} kcal
              </Text>
              <View w={1} h={10} bg="$border" /> {/* Vertical Separator */}
              <Text fontSize={13} color={colors.textSecondary} fontWeight="600">
                {slot.time}
              </Text>
            </XStack>
          }
          // leftElement aur rightElement dono empty kar diye
          leftElement={null} 
          // rightElement={<ChevronRight size={16} color={colors.placeholder} />}
        />
      ) : (
        <View
          p="$4" br="$5" bw={1} boc={colors.border} borderStyle="dashed"
          ai="center" jc="center" bg="transparent"
          pressStyle={{ scale: 0.98, bg: colors.surface + "30" }}
          onPress={() => console.log("Add Meal")}
        >
          <XStack gap="$2" ai="center">
            <Plus size={16} color={colors.primary} />
            <Text color={colors.textSecondary} fontWeight="600" fontSize={14}>
              Add {slot.type}
            </Text>
          </XStack>
        </View>
      )}
    </YStack>
  );
});

const meals = [
  {
    type: "Breakfast",
    recipe: "Avocado Toast",
    cals: "350",
    time: "15m",
    icon: "🥑",
  },
  {
    type: "Lunch",
    recipe: "Chicken Salad",
    cals: "450",
    time: "20m",
    icon: "🥗",
  },
  { type: "Dinner", recipe: null },
];

export const MealPlanView = () => {
  const { colors } = useThemeColors();
  const [selectedDate, setSelectedDate] = useState(WEEK_DATA[0].dateString);

  return (
    <YStack f={1} bg={colors.background}>
      {/* Calendar Area: Surface color par taake section alag nazar aaye */}
      <View
        bg={colors.surface}
        py="$4"
        px="$4"
        btlr={32}
        btrr={32}
        bbw={1}
        boc={colors.border + "30"}
      >
        <WeeklyCalendar
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
          colors={colors}
        />
      </View>

      <View f={1}>
        <FlashList
          data={meals}
          estimatedItemSize={120}
          keyExtractor={(item) => item.type}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 20,
          }}
          renderItem={({ item }) => (
            <YStack mb="$4">
              <MealSlot slot={item} colors={colors} />
            </YStack>
          )}
        />
      </View>
    </YStack>
  );
};
