import React, { useState, useCallback, memo } from 'react';
import { YStack, Text, XStack, Checkbox, View, Theme } from 'tamagui';
import { Check as CheckIcon, ChevronRight } from '@tamagui/lucide-icons';
import { MotiView, AnimatePresence } from 'moti';
import { FlashList } from "@shopify/flash-list";

import { ItemCard } from '@/components/ui/reuseable/ThemedItemCard';
import { useThemeColors } from '@/hooks/theme/useThemeColors';

// 1. Premium Item Component
const GroceryItem = memo(({ item, isChecked, onToggle, colors, fonts }: any) => {
  return (
    <MotiView
      animate={{ 
        backgroundColor: isChecked ? 'transparent' : 'transparent',
        opacity: isChecked ? 0.6 : 1,
        scale: isChecked ? 0.98 : 1
      }}
      transition={{ type: 'timing', duration: 200 }}
      style={{ marginBottom: 8 }}
    >
      <ItemCard
        onPress={() => onToggle(item.id)}
        bg={isChecked ? "transparent" : "$surface"} // Check hone pe background halka
        bw={isChecked ? 1 : 0}
        boc="$border"
        px="$4"
        py="$3"
        br="$6"
        leftElement={
          <View 
            w={50} h={50} br="$5" 
            bg={isChecked ? "$background" : colors.primary + "15"} 
            ai="center" jc="center"
          >
            <Text fontSize={24}>{item.icon}</Text>
          </View>
        }
        name={
          <YStack>
            <Text 
              fontSize={16} 
              fontFamily={fonts.bold.fontFamily} 
              color={colors.text}
              textDecorationLine={isChecked ? 'line-through' : 'none'}
            >
              {item.name}
            </Text>
            <Text fontSize={12} color={colors.textSecondary} opacity={0.7}>
              {item.status}
            </Text>
          </YStack>
        }
        rightElement={
          <XStack ai="center" gap="$3">
             <Checkbox
                size="$5"
                br="$full" // Round checkbox for modern look
                checked={isChecked}
                onCheckedChange={() => onToggle(item.id)}
                bw={2}
                boc={isChecked ? colors.primary : colors.primary + "30"}
                bg={isChecked ? colors.primary : "transparent"}
              >
                <Checkbox.Indicator>
                  <CheckIcon color="white" size={16} strokeWidth={3} />
                </Checkbox.Indicator>
              </Checkbox>
          </XStack>
        }
      />
    </MotiView>
  );
});

export const GroceryListView = () => {
  const { colors, fonts } = useThemeColors();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleToggle = useCallback((id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const data = [
    { title: "Essential Produce", id: 'h1', isHeader: true },
    { id: '1', name: "Fresh Spinach", status: "2 packs left", icon: "🥬" },
    { id: '2', name: "Red Tomatoes", status: "Out of stock", icon: "🍅" },
    { title: "Dairy & Breakfast", id: 'h2', isHeader: true },
    { id: '3', name: "Almond Milk", status: "Expiring in 2 days", icon: "🥛" },
    { id: '4', name: "Cheddar Cheese", status: "Restock needed", icon: "🧀" },
  ];

  return (
    <View f={1} w="100%">
      <FlashList
        data={data}
        keyExtractor={(item: any) => item.id}
        estimatedItemSize={90}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }: any) => {
          if (item.isHeader) {
            return (
              <XStack ai="center" jc="space-between" mt="$5" mb="$3" px="$2">
                <Text 
                  fontSize={14} 
                  fontFamily={fonts.bold.fontFamily} 
                  color={colors.primary} 
                  ls={1}
                  tt="uppercase"
                >
                  {item.title}
                </Text>
                <View f={1} h={1} bg="$border" ml="$3" opacity={0.5} />
              </XStack>
            );
          }

          return (
            <GroceryItem
              item={item}
              colors={colors}
              fonts={fonts}
              isChecked={!!checkedItems[item.id]}
              onToggle={handleToggle}
            />
          );
        }}
      />
    </View>
  );
};