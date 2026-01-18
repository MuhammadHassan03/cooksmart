import React, { useState, memo, useMemo } from "react";
import { ScrollView, XStack, YStack, Text, Button, Input, View, Card } from "tamagui";
import { Search, Calendar, AlertCircle } from "@tamagui/lucide-icons";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { MotiView } from "moti";
import { CustomSheet } from "@/components/ui/reuseable/ThemedSheet";

const expiringItems = [
  { name: "Full Cream Milk", days: 1, category: "Dairy" },
  { name: "Fresh Spinach", days: 2, category: "Veggie" },
  { name: "Greek Yogurt", days: 3, category: "Dairy" },
  { name: "Blueberries", days: 1, category: "Fruit" },
  { name: "Chicken Breast", days: 2, category: "Meat" },
  { name: "Brown Bread", days: 4, category: "Bakery" },
];

export const ExpiringSoonSection = () => {
  const { colors, fonts, isLight } = useThemeColors();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return expiringItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const dynamicSnapPoints = useMemo(() => {
    if (filteredItems.length <= 3 && !searchQuery) return [45]; 
    return [85];
  }, [filteredItems.length, searchQuery]);

  return (
    <YStack marginBottom="$6" gap="$4">
      {/* Header */}
      <XStack justifyContent="space-between" alignItems="flex-end" paddingHorizontal="$1">
        <YStack gap="$0.5">
          <Text fontSize={18} fontFamily={fonts.bold.fontFamily} color={colors.text} letterSpacing={-0.5}>
            Freshness Alert ⏳
          </Text>
          <Text fontSize={13} color={colors.textSecondary} fontFamily={fonts.medium.fontFamily}>
            Expiring within this week
          </Text>
        </YStack>
        <Button backgroundColor="transparent" padding={0} height="auto" onPress={() => setOpen(true)}>
          <Text fontSize={14} color={colors.primary} fontFamily={fonts.bold.fontFamily}>
            See All
          </Text>
        </Button>
      </XStack>

      {/* Horizontal List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$4" paddingHorizontal="$1">
          {expiringItems.slice(0, 5).map((item, i) => (
            <InternalExpiringCard key={i} item={item} index={i} colors={colors} fonts={fonts} isLight={isLight} />
          ))}
        </XStack>
      </ScrollView>

      {/* --- SHEET START --- */}
      <CustomSheet
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSearchQuery("");
        }}
        snapPoints={dynamicSnapPoints}
      >
        <YStack gap="$4" flex={1} paddingTop="$2">
          <YStack gap="$1">
            <Text fontSize={24} fontFamily={fonts.bold.fontFamily} color={colors.text} letterSpacing={-1}>
              {searchQuery ? "Search Results" : "All Expiring Items"}
            </Text>
            <Text fontSize={13} color={colors.textSecondary} fontFamily={fonts.medium.fontFamily}>
              Showing {filteredItems.length} items from your fridge
            </Text>
          </YStack>

          {/* Search Bar */}
          <XStack 
            backgroundColor={isLight ? colors.surface : colors.background} 
            borderRadius="$5" alignItems="center" paddingHorizontal="$3.5" height={52} borderWidth={1} borderColor={colors.border}
          >
            <Search size={18} color={colors.textSecondary} />
            <Input
              flex={1} borderWidth={0} backgroundColor="transparent"
              placeholder="Search items..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              color={colors.text}
              fontFamily={fonts.medium.fontFamily}
              focusStyle={{ borderWidth: 0 }}
            />
          </XStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap="$3" paddingBottom="$10">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, i) => (
                  <InventoryListItem key={i} item={item} colors={colors} fonts={fonts} isLight={isLight} />
                ))
              ) : (
                <YStack alignItems="center" justifyContent="center" paddingVertical="$10">
                  <Text color={colors.textSecondary} fontFamily={fonts.medium.fontFamily}>
                    No items found matching "{searchQuery}"
                  </Text>
                </YStack>
              )}
            </YStack>
          </ScrollView>
        </YStack>
      </CustomSheet>
    </YStack>
  );
};

// --- CONSISTENT COMPONENTS ---

const InventoryListItem = ({ item, colors, fonts, isLight }: any) => {
  const isUrgent = item.days <= 1;
  return (
    <XStack 
      justifyContent="space-between" alignItems="center" padding="$3.5" borderRadius="$6" 
      backgroundColor={isLight ? colors.card : colors.surface}
      borderWidth={1} borderColor={colors.border}
      shadowColor={isLight ? colors.shadow : "transparent"}
      shadowRadius={5}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={isLight ? 0.1 : 0}
    >
      <YStack gap="$1.5" flex={1}>
        <Text fontFamily={fonts.bold.fontFamily} fontSize={16} color={colors.text}>
          {item.name}
        </Text>
        <XStack alignItems="center" gap="$3">
           <View backgroundColor={isUrgent ? colors.error + '15' : colors.primarySubtle} paddingHorizontal="$2" paddingVertical="$0.5" borderRadius="$2">
            <Text fontSize={9} fontWeight="800" color={isUrgent ? colors.error : colors.primary} textTransform="uppercase">
              {item.category}
            </Text>
          </View>
          <XStack alignItems="center" gap="$1.5">
            <Calendar size={12} color={colors.textSecondary} />
            <Text fontSize={12} color={colors.textSecondary} fontFamily={fonts.medium.fontFamily}>
              {isUrgent ? "Today" : `${item.days} days left`}
            </Text>
          </XStack>
        </XStack>
      </YStack>
      {isUrgent && <AlertCircle size={20} color={colors.error} />}
    </XStack>
  );
};

const InternalExpiringCard = memo(({ item, index, colors, fonts, isLight }: any) => {
  const isUrgent = item.days <= 1;

  return (
    <MotiView
      from={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: index * 100, type: "spring", damping: 15 }}
    >
      <Card
        padding="$4" borderRadius="$6" 
        backgroundColor={colors.card}
        width={185} height={150} justifyContent="space-between"
        borderWidth={1} 
        borderColor={colors.border}
        shadowColor={isLight ? colors.shadow : "transparent"}
        shadowRadius={10}
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={isLight ? 0.1 : 0}
        pressStyle={{ scale: 0.97 }}
      >
        <YStack gap="$2.5">
          <View backgroundColor={isUrgent ? colors.error + '15' : colors.primarySubtle} paddingHorizontal="$2" paddingVertical="$0.5" borderRadius="$2" alignSelf="flex-start">
            <Text fontSize={9} fontWeight="800" color={isUrgent ? colors.error : colors.primary} textTransform="uppercase">
              {item.category}
            </Text>
          </View>
          <Text fontFamily={fonts.bold.fontFamily} fontSize={16} color={colors.text} numberOfLines={1}>
            {item.name}
          </Text>
        </YStack>

        <YStack gap="$2.5">
          <View height={5} width="100%" backgroundColor={isLight ? colors.surface : colors.background} borderRadius="$10" overflow="hidden">
            <View height="100%" width={isUrgent ? "90%" : "40%"} backgroundColor={isUrgent ? colors.error : colors.primary} borderRadius="$10" />
          </View>
          <XStack alignItems="center" gap="$1.5">
            <Calendar size={12} color={colors.textSecondary} />
            <Text fontSize={11} color={colors.textSecondary} fontFamily={fonts.medium.fontFamily}>
              {isUrgent ? "Expires Today" : `${item.days}d left`}
            </Text>
          </XStack>
        </YStack>
      </Card>
    </MotiView>
  );
});