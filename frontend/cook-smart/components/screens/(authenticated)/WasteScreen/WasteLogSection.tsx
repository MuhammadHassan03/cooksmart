import { Card, Text, YStack, XStack, Separator } from 'tamagui';
import { useThemeColors } from '@/hooks/theme/useThemeColors';

const mockWasteLogs = [
  { item: 'Spinach', date: 'Aug 3', reason: 'Expired' },
  { item: 'Milk', date: 'Aug 1', reason: 'Left open' },
];

export default function WasteLogSection() {
  const { colors } = useThemeColors();

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.surface}
      elevate
      accessibilityRole="list"
    >
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="700" color={colors.text}>
          Recent Waste Log
        </Text>

        {mockWasteLogs.map((log, idx) => (
          <YStack key={idx} gap="$2" paddingVertical="$2" accessibilityRole="listitem">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$4" fontWeight="600" color={colors.text}>
                {log.item}
              </Text>
              <Text fontSize="$2" color={colors.textSecondary}>
                {log.date}
              </Text>
            </XStack>

            <Text fontSize="$2" color={colors.textSecondary}>
              Reason: {log.reason}
            </Text>

            {idx !== mockWasteLogs.length - 1 && (
              <Separator borderColor={colors.border} marginTop="$3" />
            )}
          </YStack>
        ))}
      </YStack>
    </Card>
  );
}
