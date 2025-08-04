import { Card, Text, Button, YStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function PremiumBanner() {
  const { colors } = useThemeColors();
  const { user } = useAuth();
  const router = useRouter();

  if (user?.isPremium) return null;

  return (
    <Card
      backgroundColor={colors.surface}
      padding="$4"
      borderRadius="$6"
      elevate
      marginBottom="$4"
    >
      <YStack space="$2">
        <Text fontWeight="700" color={colors.text}>
          Upgrade to Premium
        </Text>
        <Text fontSize={13} color={colors.textSecondary}>
          Unlock personalized AI recipe suggestions, meal planning, grocery
          syncing, and more.
        </Text>
        <Button
          size="$3"
          backgroundColor={colors.primary}
          onPress={() => router.push("/(profile)/subscription")}
        >
          Upgrade Now
        </Button>
      </YStack>
    </Card>
  );
}
