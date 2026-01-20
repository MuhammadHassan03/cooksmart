import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Text, ListItem, Separator, Card, XStack, ScrollView } from "tamagui"; // Added XStack here
import { ChevronRight, Mail, Lock, Trash2, ShieldAlert } from "@tamagui/lucide-icons";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuthStore } from "@/utils/store/useAuthStore";

// --- Sub-component for Settings Row ---
// Isay main component se bahar rakha hai taake readability achi ho
const SettingItem = ({ 
  icon, 
  title, 
  subTitle, 
  onPress, 
  isDestructive = false 
}: { 
  icon: any, 
  title: string, 
  subTitle: string, 
  onPress: () => void, 
  isDestructive?: boolean 
}) => {
  const { colors } = useThemeColors();
  return (
    <ListItem
      hoverTheme
      pressTheme
      onPress={onPress}
      backgroundColor="transparent"
      paddingVertical="$4"
      icon={icon}
      iconAfter={<ChevronRight size={18} color={colors.textSecondary} opacity={0.4} />}
    >
      <YStack gap="$0.5">
        <Text fontSize={16} fontWeight="700" color={isDestructive ? colors.error : colors.text}>
          {title}
        </Text>
        <Text fontSize={13} color={colors.textSecondary} opacity={0.7}>
          {subTitle}
        </Text>
      </YStack>
    </ListItem>
  );
};

const AccountSettingsScreen = () => {
  const { colors, fonts } = useThemeColors();
  const user = useAuthStore((s) => s.user);

  // Handlers
  const handleEmailChange = () => console.log("Email Change");
  const handlePasswordChange = () => console.log("Password Change");
  const handleDeleteAccount = () => console.log("Delete Account Prompt");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ReusableHeader title="Account Settings" showAvatar={false} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$4" gap="$6">
          
          {/* Section 1: Info Header */}
          <YStack gap="$1">
            <Text fontSize={22} fontWeight="800" color={colors.text} fontFamily={fonts?.bold?.fontFamily}>
              Security & Access
            </Text>
            <Text fontSize={14} color={colors.textSecondary} opacity={0.8}>
              Manage your credentials for {user?.email || "your account"}
            </Text>
          </YStack>

          {/* Section 2: Main Credentials Group */}
          <YStack gap="$3">
            <Text fontSize={12} fontWeight="900" color={colors.textSecondary} textTransform="uppercase" letterSpacing={1} marginLeft="$1">
              Login Credentials
            </Text>
            <Card bordered backgroundColor={colors.surface} borderRadius="$6" borderColor={colors.border} overflow="hidden">
              <SettingItem 
                icon={<Mail size={20} color={colors.primary} />}
                title="Change Email"
                subTitle="Update your primary login email"
                onPress={handleEmailChange}
              />
              <Separator borderColor={colors.border} marginHorizontal="$4" />
              <SettingItem 
                icon={<Lock size={20} color={colors.primary} />}
                title="Change Password"
                subTitle="Update your security password"
                onPress={handlePasswordChange}
              />
            </Card>
          </YStack>

          {/* Section 3: Danger Zone */}
          <YStack gap="$3">
            <XStack alignItems="center" gap="$2" marginLeft="$1">
               <ShieldAlert size={14} color={colors.error} />
               <Text fontSize={12} fontWeight="900" color={colors.error} textTransform="uppercase" letterSpacing={1}>
                 Danger Zone
               </Text>
            </XStack>
            
            <Card bordered backgroundColor={colors.surface} borderRadius="$6" borderColor={colors.error + "30"} overflow="hidden">
               <SettingItem 
                icon={<Trash2 size={20} color={colors.error} />}
                title="Delete Account"
                subTitle="Permanently remove all your data"
                isDestructive
                onPress={handleDeleteAccount}
              />
            </Card>
            <Text fontSize={11} color={colors.textSecondary} textAlign="center" marginTop="$2" opacity={0.6} paddingHorizontal="$4">
              Deleting your account is permanent. All your saved meals and waste data will be lost forever.
            </Text>
          </YStack>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(AccountSettingsScreen);