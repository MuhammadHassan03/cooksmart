import React, { memo } from "react";
import { Card, Text, ListItem, Separator, YStack, XStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useRouter } from "expo-router";
import { 
  ChevronRight, 
  Settings, 
  Bell, 
  CreditCard, 
  User, 
  Utensils, 
  Trash2, 
  Store, 
  ScanLine 
} from "@tamagui/lucide-icons";

const settingGroups = [
  {
    title: "App Settings",
    items: [
      { label: "Preferences", path: "/(profile)/preferences", icon: Settings },
      { label: "Notifications", path: "/(profile)/notifications", icon: Bell },
      { label: "Subscription", path: "/(profile)/subscription", icon: CreditCard },
      { label: "Account Settings", path: "/(profile)/account", icon: User },
    ],
  },
  {
    title: "My Kitchen",
    items: [
      { label: "My Meals", path: "/(profile)/meals", icon: Utensils },
      { label: "Waste Dashboard", path: "/(profile)/waste", icon: Trash2 },
      { label: "Recipe Marketplace", path: "/(profile)/marketplace", icon: Store },
      { label: "Smart Fridge Scanner", path: "/(scanner)/ai", icon: ScanLine },
    ],
  },
];

const SettingsSection = () => {
  const { colors, fonts } = useThemeColors();
  const router = useRouter();

  return (
    <YStack gap="$6" marginBottom="$5">
      {settingGroups.map((group) => (
        <YStack key={group.title} gap="$3">
          {/* Group Title */}
          <Text 
            fontSize={12} 
            fontWeight="900" 
            color={colors.textSecondary} 
            marginLeft="$2"
            textTransform="uppercase"
            letterSpacing={1}
          >
            {group.title}
          </Text>

          <Card
            bordered
            backgroundColor={colors.surface}
            borderRadius="$6"
            borderColor={colors.border}
            overflow="hidden" // Separators corners se bahar na jayen
          >
            {group.items.map((item, index) => (
              <YStack key={item.label}>
                <ListItem
                  hoverTheme
                  pressTheme
                  title={item.label}
                  subTitle={undefined} // Strings-only bug fix
                  icon={<item.icon size={18} color={colors.primary} />}
                  iconAfter={<ChevronRight size={16} color={colors.textSecondary} opacity={0.5} />}
                  backgroundColor="transparent"
                  onPress={() => router.push(item.path)}
                  paddingVertical="$3.5"
                  // Text Styling
                  titleProps={{
                    color: colors.text,
                    fontSize: 15,
                    fontWeight: "600",
                    fontFamily: fonts?.medium?.fontFamily
                  }}
                />
                {index < group.items.length - 1 && (
                  <Separator borderColor={colors.border} marginHorizontal="$4" />
                )}
              </YStack>
            ))}
          </Card>
        </YStack>
      ))}
    </YStack>
  );
};

export default memo(SettingsSection);