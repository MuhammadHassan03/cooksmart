import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  YStack,
  XStack,
  Text,
  H4,
  Switch,
  Separator,
  Card,
} from "tamagui";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export default function NotificationSettingsScreen() {
  const { colors, fonts } = useThemeColors();

  const [mealReminders, setMealReminders] = React.useState(true);
  const [expiryAlerts, setExpiryAlerts] = React.useState(false);
  const [recipeSuggestions, setRecipeSuggestions] = React.useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack flex={1}>
        <ReusableHeader title="Notifications" showAvatar={false} />

        <YStack padding="$4" space="$4" flex={1}>
          {/* Section Header */}
          <YStack>
            <H4 color={colors.text} fontFamily={fonts.bold.fontFamily}>
              Manage Alerts
            </H4>
            <Text fontSize={14} color={colors.textSecondary}>
              Choose the notifications you want to receive
            </Text>
          </YStack>

          {/* Notification Toggles in a Card */}
          <Card
            elevate
            bordered
            backgroundColor={colors.surface}
            borderColor={colors.border}
            padding="$3"
          >
            <YStack space="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <Text color={colors.text} fontSize={15} fontWeight="500">
                  Meal Prep Reminders
                </Text>
                <Switch size="$3" checked={mealReminders} onCheckedChange={setMealReminders} />
              </XStack>

              <Separator borderColor={colors.divider} />

              <XStack justifyContent="space-between" alignItems="center">
                <Text color={colors.text} fontSize={15} fontWeight="500">
                  Ingredient Expiry Alerts
                </Text>
                <Switch size="$3" checked={expiryAlerts} onCheckedChange={setExpiryAlerts} />
              </XStack>

              <Separator borderColor={colors.divider} />

              <XStack justifyContent="space-between" alignItems="center">
                <Text color={colors.text} fontSize={15} fontWeight="500">
                  Weekly Recipe Suggestions
                </Text>
                <Switch size="$3" checked={recipeSuggestions} onCheckedChange={setRecipeSuggestions} />
              </XStack>
            </YStack>
          </Card>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
