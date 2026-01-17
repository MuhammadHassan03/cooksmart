import { Button, Card, Text, XStack, YStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Zap } from "@tamagui/lucide-icons";

export default function PremiumPromptCard() {
  const { colors } = useThemeColors();
  const { user } = useAuth();
  const router = useRouter();

  if (user?.isPremium) return null;

  return (
    <Card
      elevate
      bordered
      padding="$4"
      borderRadius="$6"
      marginBottom="$4"
      backgroundColor={colors.surface}
      borderColor={colors.border}
    >
      <XStack alignItems="center" gap="$2" marginBottom="$2">
        <Zap size={16} color={colors.accent} />
        <Text fontSize="$5" fontWeight="700" color={colors.accent}>
          Unlock Premium
        </Text>
      </XStack>

      <Text fontSize="$3" color={colors.textSecondary} lineHeight={20}>
        Upgrade to premium and access exclusive features, deeper insights, and more control.
      </Text>

      <Button
        marginTop="$3"
        backgroundColor={colors.primary}
        onPress={() => router.push("/(profile)/subscription")}
      >
        Upgrade Now
      </Button>
    </Card>
  );
}
