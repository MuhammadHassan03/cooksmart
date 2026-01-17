import { Button, Card, Text, XStack, YStack, Avatar } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { User2 } from "@tamagui/lucide-icons";

export default function UserCard() {
  const { colors, fonts } = useThemeColors();
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Card
      elevate
      bordered
      backgroundColor={colors.surface}
      padding="$4"
      marginBottom="$4"
      borderRadius="$6"
      borderColor={colors.border}
    >
      <XStack alignItems="center" space="$4">
        <Avatar circular size="$5" backgroundColor={colors.accent}>
          <Avatar.Image
            src={user?.avatarUrl || ""}
            accessibilityLabel="User Avatar"
          />
          <Avatar.Fallback backgroundColor={colors.accent}>
            <User2 size={18} color={colors.surface} />
          </Avatar.Fallback>
        </Avatar>

        <YStack flex={1}>
          <Text
            fontSize="$6"
            fontWeight="700"
            color={colors.text}
            fontFamily={fonts.bold.fontFamily}
            numberOfLines={1}
          >
            {user?.fullName || "Chef"}
          </Text>
          <Text
            fontSize="$2"
            color={colors.textSecondary}
            numberOfLines={1}
          >
            {user?.email || "your@email.com"}
          </Text>
        </YStack>
      </XStack>

      <Button
        marginTop="$4"
        size="$3"
        backgroundColor={colors.primary}
        onPress={() => router.push("/(profile)/account")}
      >
        Edit Profile
      </Button>
    </Card>
  );
}
