import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, XStack, Text, Switch, Separator, Card, ScrollView } from "tamagui";
import { BellRing, Hourglass, Sparkles } from "@tamagui/lucide-icons";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

// --- Sub-component for Toggle Row ---
const NotificationToggle = ({ 
  icon, 
  title, 
  description, 
  checked, 
  onCheckedChange 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  checked: boolean, 
  onCheckedChange: (val: boolean) => void 
}) => {
  const { colors } = useThemeColors();
  return (
    <XStack paddingVertical="$3.5" alignItems="center" gap="$4">
      <YStack backgroundColor={colors.primary + "10"} padding="$2.5" borderRadius="$4">
        {icon}
      </YStack>
      
      <YStack flex={1} gap="$0.5">
        <Text fontSize={16} fontWeight="700" color={colors.text}>
          {title}
        </Text>
        <Text fontSize={12} color={colors.textSecondary} opacity={0.7} lineHeight={16}>
          {description}
        </Text>
      </YStack>

      <Switch 
        size="$3" 
        checked={checked} 
        onCheckedChange={onCheckedChange}
        backgroundColor={checked ? colors.primary : colors.border}
      >
        <Switch.Thumb animation="quick" />
      </Switch>
    </XStack>
  );
};

export default function NotificationSettingsScreen() {
  const { colors, fonts } = useThemeColors();

  // Actual State
  const [mealPrep, setMealPrep] = React.useState(true);
  const [expiryAlerts, setExpiryAlerts] = React.useState(false);
  const [weeklySuggestions, setWeeklySuggestions] = React.useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ReusableHeader title="Notifications" showAvatar={false} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$4" gap="$6">
          
          {/* Header */}
          <YStack gap="$1">
            <Text fontSize={24} fontWeight="800" color={colors.text} fontFamily={fonts?.bold?.fontFamily}>
              Alerts & Reminders
            </Text>
            <Text fontSize={14} color={colors.textSecondary} opacity={0.8}>
              Customize how and when you want to be notified.
            </Text>
          </YStack>

          {/* Settings Group */}
          <Card bordered backgroundColor={colors.surface} borderRadius="$6" borderColor={colors.border} paddingHorizontal="$4" overflow="hidden">
            <NotificationToggle 
              icon={<BellRing size={20} color={colors.primary} />}
              title="Meal Prep Reminders"
              description="Get notified when it's time to start cooking your planned meals."
              checked={mealPrep}
              onCheckedChange={setMealPrep}
            />
            
            <Separator borderColor={colors.border} />

            <NotificationToggle 
              icon={<Hourglass size={20} color={colors.primary} />}
              title="Ingredient Expiry"
              description="Receive alerts before your ingredients reach their best-before date."
              checked={expiryAlerts}
              onCheckedChange={setExpiryAlerts}
            />

            <Separator borderColor={colors.border} />

            <NotificationToggle 
              icon={<Sparkles size={20} color={colors.primary} />}
              title="Weekly Suggestions"
              description="New AI-generated recipe ideas based on your fridge contents."
              checked={weeklySuggestions}
              onCheckedChange={setWeeklySuggestions}
            />
          </Card>

          {/* Bottom Hint */}
          <Text fontSize={12} color={colors.textSecondary} textAlign="center" opacity={0.6} paddingHorizontal="$6">
            Push notifications can be further managed in your device system settings.
          </Text>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}