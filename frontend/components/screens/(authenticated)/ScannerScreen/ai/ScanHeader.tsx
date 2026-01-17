import { Text, H4, Paragraph, XStack, YStack } from "tamagui";
import { Crown } from "@tamagui/lucide-icons";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useScanContext } from "@/context/ScanContext";

export function ScanHeader() {
    const { scansLeft } = useScanContext()

  const { colors, fonts } = useThemeColors();

  return (
    <YStack padding="$4" space="$3">
      <H4 color={colors.text} fontFamily={fonts.bold.fontFamily}>
        AI Fridge Scanner
      </H4>
      <Paragraph fontSize={14} color={colors.textSecondary}>
        Scan your fridge or pantry. Our AI will detect ingredients for you.
      </Paragraph>
      <XStack alignItems="center" space="$2">
        <XStack
          backgroundColor="$yellow8"
          paddingHorizontal="$2"
          paddingVertical="$1"
          borderRadius="$10"
          alignItems="center"
          space="$1"
        >
          <Crown size={12} color="white" />
          <Text fontSize={12} color="white" fontWeight="600">
            Premium
          </Text>
        </XStack>
        <Text fontSize={12} color={colors.textSecondary}>
          {scansLeft} scans left in trial
        </Text>
      </XStack>
    </YStack>
  );
}
