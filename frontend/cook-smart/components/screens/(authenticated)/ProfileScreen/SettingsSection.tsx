import { Card, H4, ListItem, Separator, YStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useRouter } from "expo-router";

const settings = [
  { label: "Preferences", path: "/(profile)/preferences" },
  { label: "Notifications", path: "/(profile)/notifications" },
  { label: "Subscription", path: "/(profile)/subscription" },
  { label: "Account Settings", path: "/(profile)/account" },
  { label: "My Meals", path: "/(profile)/meals" },
  { label: "Waste Dashboard", path: "/(profile)/waste" },
  { label: "Recipe Marketplace", path: "/(profile)/marketplace" },
  { label: "Smart Fridge Scanner", path: "/(scanner)/ai" },
];

export default function SettingsSection() {
  const { colors } = useThemeColors();
  const router = useRouter();

  return (
    <YStack space="$3" marginBottom="$5">
      <H4 color={colors.text}>Settings</H4>

      <Card
        elevate
        bordered
        backgroundColor={colors.surface}
        paddingHorizontal="$2"
        paddingVertical="$1"
        borderRadius="$6"
        borderColor={colors.border}
      >
        <YStack>
          {settings.map((item, index) => (
            <YStack key={item.label}>
              <ListItem
                backgroundColor={colors.surface}
                color={colors.text}
                pressTheme
                onPress={() => router.push(item.path)}
              >
                {item.label}
              </ListItem>
              {index < settings.length - 1 && (
                <Separator borderColor={colors.border} />
              )}
            </YStack>
          ))}
        </YStack>
      </Card>
    </YStack>
  );
}
