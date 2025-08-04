import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  H4,
  Paragraph,
  Separator,
  Text,
  XStack,
  YStack,
  Card
} from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Camera, Plus, Crown } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";

export default function CreateScreen() {
  const { colors, fonts } = useThemeColors();
  const router = useRouter();

  const handleScan = () => {
    router.push("/(scanner)/ai");
  };

  const handleManualEntry = () => {
    router.push("/(scanner)/manual");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ReusableHeader title="Add Ingredients" />
      <YStack padding="$4" flex={1} space="$6">
        {/* Header Section */}
        <YStack space="$2">
          <Paragraph color={colors.textSecondary} fontSize={14} lineHeight={20}>
            Use AI to scan your fridge or enter ingredients manually to keep your pantry updated.
          </Paragraph>
        </YStack>

        {/* Options Section */}
        <YStack space="$5">

          {/* Scan with Camera (Premium) */}
          <Card
            elevate
            bordered
            backgroundColor={colors.surface}
            padding="$4"
            gap="$3"
          >
            <Button
              icon={<Camera size={20} color={colors.background} />}
              backgroundColor={colors.primary}
              color={colors.background}
              size="$5"
              onPress={handleScan}
            >
              Scan with AI Camera
            </Button>

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
                Includes 3 free scans in trial
              </Text>
            </XStack>
          </Card>

          {/* Manual Entry */}
          <Card
            elevate
            bordered
            backgroundColor={colors.surface}
            padding="$4"
          >
            <Button
              icon={<Plus size={18} color={colors.text} />}
              backgroundColor={colors.surface}
              borderColor={colors.border}
              color={colors.text}
              size="$5"
              onPress={handleManualEntry}
            >
              Add Manually
            </Button>
          </Card>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
