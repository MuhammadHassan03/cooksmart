import React, { memo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Text, ListItem, Separator, Card, XStack, ScrollView, Input, Button, View, Spinner } from "tamagui";
import { ChevronRight, Mail, Lock, Trash2, ShieldAlert, AlertTriangle } from "@tamagui/lucide-icons";
import { AppHeader } from "@/components/ui/reuseable/ThemedHeader";
import { CustomSheet } from "@/components/ui/reuseable/ThemedSheet"; 
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuthStore } from "@/utils/store/useAuthStore";
import { useProfile } from "@/hooks/(authenticated)/useProfile"; // Optimized hook import kiya

const SettingItem = ({ icon, title, subTitle, onPress, isDestructive = false }: any) => {
  const { colors } = useThemeColors();
  return (
    <ListItem
      hoverTheme pressTheme onPress={onPress}
      backgroundColor="transparent" paddingVertical="$4" icon={icon}
      iconAfter={<ChevronRight size={18} color={colors.textSecondary} opacity={0.4} />}
    >
      <YStack gap="$0.5" flex={1}>
        <Text fontSize={16} fontWeight="700" color={isDestructive ? colors.error : colors.text}>{title}</Text>
        <Text fontSize={13} color={colors.textSecondary} opacity={0.7}>{subTitle}</Text>
      </YStack>
    </ListItem>
  );
};

const AccountSettingsScreen = () => {
  const { colors, fonts } = useThemeColors();
  const user = useAuthStore((s) => s.user);
  
  // Hook se updated functions access kiye
  const { updateEmail, updatePassword, deleteAccount } = useProfile();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeConfig, setActiveConfig] = useState<any>({
    type: "", title: "", desc: "", icon: Mail, color: colors.primary
  });

  const openSheet = (type: "email" | "password" | "delete") => {
    setInputValue("");
    const configs = {
      email: { type, title: "Update Email", desc: "Naya email likhein. Hum dono (purane aur naye) email address par confirmation links bhejenge.", icon: Mail, color: colors.primary },
      password: { type, title: "Change Password", desc: "Security ke liye kam az kam 6 characters ka password rakhein.", icon: Lock, color: colors.primary },
      delete: { type, title: "Delete Account", desc: "Kya aap waqai account delete karna chahte hain? Tamam saved recipes aur data hamesha ke liye khatam ho jayega.", icon: AlertTriangle, color: colors.error }
    };
    setActiveConfig(configs[type]);
    setSheetOpen(true);
  };

  const handleConfirm = async () => {
    // Basic validation for non-delete actions
    if (activeConfig.type !== 'delete' && inputValue.length < 4) return;
    
    setLoading(true);
    try {
      if (activeConfig.type === "email") {
        await updateEmail(inputValue);
        // Alert handle karna user experience ke liye zaroori hai
        alert("Confirmation links sent! Dono emails verify karne ke baad email update ho jayega.");
      } 
      else if (activeConfig.type === "password") {
        await updatePassword(inputValue);
        alert("Password successfully update ho gaya!");
      } 
      else if (activeConfig.type === "delete") {
        await deleteAccount();
        // Auth store signOut se user khud redirect ho jayega
      }

      setSheetOpen(false);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$4" gap="$6">
          <YStack gap="$1">
            <Text fontSize={22} fontWeight="800" color={colors.text} fontFamily={fonts?.bold?.fontFamily}>Security & Access</Text>
            <Text fontSize={14} color={colors.textSecondary} opacity={0.8}>Manage credentials for {user?.email}</Text>
          </YStack>

          <YStack gap="$3">
            <Text fontSize={12} fontWeight="900" color={colors.textSecondary} textTransform="uppercase" letterSpacing={1} marginLeft="$1">Login Credentials</Text>
            <Card bordered backgroundColor={colors.surface} borderRadius="$6" borderColor={colors.border} overflow="hidden">
              <SettingItem icon={<Mail size={20} color={colors.primary} />} title="Change Email" subTitle="Update your primary login email" onPress={() => openSheet("email")} />
              <Separator borderColor={colors.border} marginHorizontal="$4" />
              <SettingItem icon={<Lock size={20} color={colors.primary} />} title="Change Password" subTitle="Update your security password" onPress={() => openSheet("password")} />
            </Card>
          </YStack>

          <YStack gap="$3">
            <XStack alignItems="center" gap="$2" marginLeft="$1">
               <ShieldAlert size={14} color={colors.error} />
               <Text fontSize={12} fontWeight="900" color={colors.error} textTransform="uppercase" letterSpacing={1}>Danger Zone</Text>
            </XStack>
            <Card bordered backgroundColor={colors.surface} borderRadius="$6" borderColor={colors.error + "30"} overflow="hidden">
               <SettingItem icon={<Trash2 size={20} color={colors.error} />} title="Delete Account" subTitle="Permanently remove all your data" isDestructive onPress={() => openSheet("delete")} />
            </Card>
          </YStack>
        </YStack>
      </ScrollView>

      {/* --- REUSABLE CUSTOM SHEET --- */}
      <CustomSheet open={sheetOpen} onOpenChange={setSheetOpen} snapPoints={[55]}>
        <YStack gap="$5" paddingVertical="$2">
          <XStack gap="$3" alignItems="center">
            <View backgroundColor={activeConfig.color + "20"} padding="$3" borderRadius="$4">
              <activeConfig.icon size={24} color={activeConfig.color} />
            </View>
            <YStack>
              <Text fontSize={20} fontWeight="800" color={colors.text}>{activeConfig.title}</Text>
              <Text fontSize={14} color={colors.textSecondary}>{activeConfig.type === 'delete' ? 'DANGER ZONE' : 'Action Required'}</Text>
            </YStack>
          </XStack>

          <Text fontSize={15} color={colors.textSecondary} lineHeight={22}>{activeConfig.desc}</Text>

          {activeConfig.type !== 'delete' && (
            <Input 
              size="$5"
              placeholder={activeConfig.type === 'email' ? "new-chef@email.com" : "Enter new password"}
              secureTextEntry={activeConfig.type === 'password'}
              value={inputValue}
              autoFocus
              onChangeText={setInputValue}
              backgroundColor="$background"
              borderColor={colors.border}
              focusStyle={{ borderColor: activeConfig.color, borderWidth: 2 }}
            />
          )}

          <Button 
            size="$5"
            backgroundColor={activeConfig.color}
            color="white"
            fontWeight="700"
            onPress={handleConfirm}
            disabled={loading}
            icon={loading ? <Spinner color="white" /> : null}
            pressStyle={{ opacity: 0.8, scale: 0.98 }}
          >
            {activeConfig.type === 'delete' ? "Confirm Delete" : "Update Now"}
          </Button>
          
          <Button variant="outlined" size="$5" borderColor={colors.border} onPress={() => setSheetOpen(false)}>
            Cancel
          </Button>
        </YStack>
      </CustomSheet>
    </SafeAreaView>
  );
};

export default memo(AccountSettingsScreen);