import { Button, Text, YStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuth } from "@/context/AuthContext";
import { appName } from "@/constants";

export default function AppFooter() {
  const { colors } = useThemeColors();
  const { logout } = useAuth();

  return (
    <YStack space="$4" alignItems="center" marginTop="$6" paddingBottom="$6">
      <Button
        size="$3"
        backgroundColor={colors.primary}
        color={colors.card}
        width="70%"
        onPress={logout}
      >
        Log Out
      </Button>

      <Text fontSize={12} color={colors.textSecondary}>
        {appName} v1.0.0
      </Text>
    </YStack>
  );
}
