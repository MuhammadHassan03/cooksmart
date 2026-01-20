import { useState, useMemo } from 'react';
import { Card, Text, YStack, XStack, Button, View, Input } from 'tamagui';
import { useThemeColors } from '@/hooks/theme/useThemeColors';
import { ShoppingCart, History, Trash2, Search, XCircle } from '@tamagui/lucide-icons';
import {CustomSheet as CustomBottomSheet} from '@/components/ui/reuseable/ThemedSheet';

const fullHistory = [
  { item: 'Spinach', date: 'Today', reason: 'Expired', amount: '$4.50' },
  { item: 'Milk', date: '2 days ago', reason: 'Spoiled', amount: '$2.30' },
  { item: 'Bread', date: 'Aug 1', reason: 'Moldy', amount: '$3.00' },
  { item: 'Yogurt', date: 'July 28', reason: 'Expired', amount: '$5.00' },
  { item: 'Chicken', date: 'July 25', reason: 'Bad Smell', amount: '$12.00' },
];

export default function WasteLogSection() {
  const { colors } = useThemeColors();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Search Logic: Filtering the list based on user input
  const filteredHistory = useMemo(() => {
    return fullHistory.filter((log) =>
      log.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <Card padding="$4" borderRadius="$6" backgroundColor={colors.card} borderWidth={1} borderColor={colors.border} elevate>
        <YStack gap="$4">
          <XStack jc="space-between" ai="center">
            <XStack ai="center" gap="$2">
              <History size={18} color={colors.textSecondary} />
              <Text fontSize="$5" fontWeight="800">Recent History</Text>
            </XStack>
            <Button size="$2" chromeless onPress={() => setIsSheetOpen(true)}>
               <Text fontSize="$2" fontWeight="700" color={colors.primary}>View All</Text>
            </Button>
          </XStack>

          {/* Sirf pehle 2 items main screen par */}
          <YStack gap="$1">
            {fullHistory.slice(0, 2).map((log, idx) => (
              <WasteRow key={idx} log={log} isLast={idx === 1} />
            ))}
          </YStack>
        </YStack>
      </Card>

      {/* --- Full History Bottom Sheet with Search --- */}
      <CustomBottomSheet 
        open={isSheetOpen} 
        onOpenChange={(open) => {
          setIsSheetOpen(open);
          if (!open) setSearchQuery(""); // Sheet band hote hi search clear kar dein
        }}
        snapPoints={[85]}
      >
        <YStack p="$4" gap="$4" f={1}>
          <Text fontSize="$6" fontWeight="800">Waste History</Text>

          {/* Modern Search Bar */}
          <XStack 
            backgroundColor={colors.surface} 
            borderRadius="$4" 
            ai="center" 
            px="$3" 
            borderWidth={1} 
            borderColor={colors.border}
          >
            <Search size={18} color={colors.textSecondary} />
            <Input
              f={1}
              placeholder="Search items or reasons..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              borderWidth={0}
              backgroundColor="transparent"
              focusStyle={{ borderWidth: 0 }}
            />
            {searchQuery.length > 0 && (
              <Button 
                circular 
                size="$1" 
                chromeless 
                onPress={() => setSearchQuery("")}
              >
                <XCircle size={16} color={colors.textSecondary} />
              </Button>
            )}
          </XStack>

          {/* List Section */}
          <YStack gap="$2" mt="$2">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((log, idx) => (
                <WasteRow key={idx} log={log} isLast={idx === filteredHistory.length - 1} />
              ))
            ) : (
              <YStack ai="center" jc="center" py="$10" gap="$2">
                <Text fontSize="$5">🔍</Text>
                <Text color={colors.textSecondary}>No records found for "{searchQuery}"</Text>
              </YStack>
            )}
          </YStack>
        </YStack>
      </CustomBottomSheet>
    </>
  );
}

// Reusable WasteRow (Same as before)
function WasteRow({ log, isLast }: { log: any; isLast: boolean }) {
  const { colors } = useThemeColors();
  return (
    <XStack jc="space-between" ai="center" py="$3" borderBottomWidth={isLast ? 0 : 1} borderColor={colors.border}>
      <XStack gap="$3" ai="center" f={1}>
        <View bc={colors.surface} p="$2.5" br="$4"><Trash2 size={18} color={colors.error} opacity={0.7}/></View>
        <YStack f={1}>
          <Text fontSize="$4" fontWeight="700">{log.item}</Text>
          <Text fontSize="$2" color={colors.textSecondary}>{log.reason} • {log.date}</Text>
        </YStack>
      </XStack>
      <YStack ai="flex-end">
        <Text fontSize="$3" fontWeight="800" color={colors.error}>{log.amount}</Text>
      </YStack>
    </XStack>
  );
}