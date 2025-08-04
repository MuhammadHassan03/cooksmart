import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  YStack,
  Text,
  Button,
  H4,
  ListItem,
  Separator,
  Card,
} from "tamagui";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuth } from "@/context/AuthContext";

export default function AccountSettingsScreen() {
  const { colors, fonts } = useThemeColors();
  const { logout } = useAuth();

  // Handlers (stubbed for now)
  const handleEmailChange = () => {};
  const handlePasswordChange = () => {};
  const handleDeleteAccount = () => {};
  const handleLogout = () => logout();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack flex={1}>
        <ReusableHeader title="Account Settings" showAvatar={false} />

        <YStack padding="$4" space="$4" flex={1}>
          {/* Header */}
          <YStack>
            <H4 color={colors.text} fontFamily={fonts.bold.fontFamily}>
              Manage Your Account
            </H4>
            <Text fontSize={14} color={colors.textSecondary}>
              Update your login details and account status
            </Text>
          </YStack>

          {/* Account Actions */}
          <Card
            elevate
            bordered
            backgroundColor={colors.surface}
            borderColor={colors.border}
            padding="$3"
          >
            <YStack>
              {/* Change Email */}
              <ListItem
                backgroundColor={colors.surface}
                onPress={handleEmailChange}
              >
                <YStack>
                  <Text fontSize={15} fontWeight="600" color={colors.text}>
                    Change Email
                  </Text>
                  <Text fontSize={13} color={colors.textSecondary}>
                    Update your email address
                  </Text>
                </YStack>
              </ListItem>

              <Separator borderColor={colors.divider} />

              {/* Change Password */}
              <ListItem
                backgroundColor={colors.surface}
                onPress={handlePasswordChange}
              >
                <YStack>
                  <Text fontSize={15} fontWeight="600" color={colors.text}>
                    Change Password
                  </Text>
                  <Text fontSize={13} color={colors.textSecondary}>
                    Secure your account
                  </Text>
                </YStack>
              </ListItem>

              <Separator borderColor={colors.divider} />

              {/* Delete Account */}
              <ListItem
                backgroundColor={colors.surface}
                onPress={handleDeleteAccount}
              >
                <YStack>
                  <Text fontSize={15} fontWeight="600" color={colors.error}>
                    Delete Account
                  </Text>
                  <Text fontSize={13} color={colors.errorLight}>
                    This action is irreversible
                  </Text>
                </YStack>
              </ListItem>
            </YStack>
          </Card>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
