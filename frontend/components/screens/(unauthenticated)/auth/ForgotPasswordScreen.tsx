import { useState, useCallback } from "react";
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Button, 
  Input, 
  Text, 
  View, 
  YStack, 
  H1, 
  Spinner, 
  XStack, 
  Separator 
} from "tamagui";
import { AtSign, ArrowLeft, MailCheck, LayoutGrid } from "@tamagui/lucide-icons";
import { MotiView } from "moti";
import useAuthentication from "@/hooks/(unauthenticated)/auth/useAuthentication";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAppToast } from "@/hooks/useAppToast";

interface ForgotPasswordProps {
  onBack: () => void; // Login screen pe wapas janay ke liye
}

export default function ForgotPasswordScreen({ onBack }: ForgotPasswordProps) {
  const { colors, fonts, isLight } = useThemeColors();
  const { forgot, loading } = useAuthentication();
  const { showError, showSuccess } = useAppToast();

  const [email, setEmail] = useState("");

  const handleReset = useCallback(async () => {
    if (!email) {
      showError("Please enter your email address first");
      return;
    }
    try {
      await forgot(email);
      showSuccess("Reset link sent! Please check your inbox.");
      // Option: onBack(); // Link bhejte hi wapas bhej dain
    } catch (err: any) {
      showError(err?.message || "Could not send reset link. Try again.");
    }
  }, [email, forgot]);

  return (
    <View f={1} bg={colors.background}>
      <StatusBar barStyle={isLight ? "dark-content" : "light-content"} />
      
      {/* Abstract Background Glow (Top Left is dafa) */}
      <View 
        pos="absolute" top={-50} left={-50} w={250} h={250} 
        br={125} bg={colors.primary} opacity={0.1} filter="blur(60px)"
      />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            keyboardShouldPersistTaps="handled"
          >
            <YStack f={1} px="$7" jc="center" space="$8">
              
              {/* --- BACK BUTTON --- */}
              <TouchableOpacity onPress={onBack} style={{ alignSelf: 'flex-start' }}>
                <XStack ai="center" space="$2" opacity={0.7}>
                  <ArrowLeft size={18} color={colors.text} />
                  <Text ff={fonts.medium.fontFamily} fontSize={14}>Back to Login</Text>
                </XStack>
              </TouchableOpacity>

              {/* --- HEADER --- */}
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 600 }}
              >
                <YStack space="$2">
                  <XStack ai="center" space="$2" opacity={0.6}>
                    <LayoutGrid size={16} color={colors.text} />
                    <Text ff={fonts.medium.fontFamily} fontSize={14} ls={1}>RECOVER ACCESS</Text>
                  </XStack>
                  
                  <H1 ff={fonts.bold.fontFamily} fontSize={40} color={colors.text} ls={-1.5}>
                    Lost Access?
                  </H1>
                  <Text color={colors.textSecondary} ff={fonts.medium.fontFamily} fontSize={16} opacity={0.5}>
                    No worries! Enter your email and we'll send you a recovery link.
                  </Text>
                </YStack>
              </MotiView>

              {/* --- INPUT --- */}
              <YStack space="$5">
                <YStack space="$1.5">
                  <Text ml="$1" fontSize={12} ff={fonts.bold.fontFamily} color={colors.text} opacity={0.4} ls={0.5}>EMAIL ADDRESS</Text>
                  <XStack 
                    ai="center" h={62} br="$4" bw={1} bc={colors.border} 
                    bg={isLight ? "$gray1" : "$gray2"} px="$4" gap="$3"
                    focusStyle={{ bc: colors.primary, bw: 1.5 }}
                  >
                    <AtSign size={18} color={colors.primary} strokeWidth={2.5} />
                    <Input 
                      f={1} h="100%" bw={0} bg="transparent" p={0}
                      placeholder="yourname@example.com"
                      placeholderTextColor={colors.placeholder}
                      value={email} onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      color={colors.text}
                      ff={fonts.medium.fontFamily}
                      fontSize={15}
                    />
                  </XStack>
                </YStack>

                {/* --- RESET BUTTON --- */}
                <Button 
                  bg={colors.primary} h={62} br="$4"
                  onPress={handleReset}
                  disabled={loading}
                  pressStyle={{ scale: 0.98, opacity: 0.9 }}
                >
                  {loading ? <Spinner color="white" /> : (
                    <XStack ai="center" gap="$2.5">
                      <Text color="white" ff={fonts.bold.fontFamily} fontSize={16} ls={0.5}>Send Reset Link</Text>
                      <MailCheck size={20} color="white" strokeWidth={2.5} />
                    </XStack>
                  )}
                </Button>
              </YStack>

              {/* --- FOOTER DECORATION --- */}
              <YStack ai="center" mt="$4">
                <Separator w="40%" bc={colors.border} opacity={0.3} />
              </YStack>

            </YStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}