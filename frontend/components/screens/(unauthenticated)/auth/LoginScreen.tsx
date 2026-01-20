import { useState, useCallback, useRef } from "react";
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  TextInput 
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
import { AtSign, KeyRound, ArrowRight, LayoutGrid, CircleUserRound } from "@tamagui/lucide-icons";
import { MotiView } from "moti";
import useAuthentication from "@/hooks/(unauthenticated)/auth/useAuthentication";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { appName } from "@/constants";
import { useAppToast } from "@/hooks/useAppToast";

// --- UPDATED INTERFACE ---
interface LoginScreenProps {
  switchScreen: () => void;
  onForgot: () => void; // Added for Forgot Password flow
}

export default function LoginScreen({ switchScreen, onForgot }: LoginScreenProps) {
  const { colors, fonts, isLight } = useThemeColors();
  const { login, loading } = useAuthentication();
  const { showError } = useAppToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
       showError("Please enter your email and password");
       return;
    }
    try {
      await login({ email, password });
    } catch (err: any) {
      showError(err?.message || "Login failed. Please check your details.");
    }
  }, [email, password, login]);

  return (
    <View f={1} bg={colors.background}>
      <StatusBar barStyle={isLight ? "dark-content" : "light-content"} />
      
      {/* Abstract Background Glow */}
      <View 
        pos="absolute" bottom={-50} left={-50} w={250} h={250} 
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
            showsVerticalScrollIndicator={false}
          >
            <YStack f={1} px="$7" jc="center" space="$10">
              
              {/* --- HEADER --- */}
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 600 }}
              >
                <YStack space="$2">
                  <XStack ai="center" space="$2" opacity={0.6}>
                    <LayoutGrid size={16} color={colors.text} />
                    <Text ff={fonts.medium.fontFamily} fontSize={14} ls={1}>WELCOME BACK</Text>
                  </XStack>
                  
                  <H1 ff={fonts.bold.fontFamily} fontSize={42} color={colors.text} ls={-1.5}>
                    Sign In
                  </H1>
                  <Text color={colors.textSecondary} ff={fonts.medium.fontFamily} fontSize={16} opacity={0.5}>
                    Enter your details to continue to {appName}
                  </Text>
                </YStack>
              </MotiView>

              {/* --- INPUTS --- */}
              <YStack space="$5">
                <YStack space="$4">
                  {/* Email */}
                  <YStack space="$1.5">
                    <Text ml="$1" fontSize={12} ff={fonts.bold.fontFamily} color={colors.text} opacity={0.4} ls={0.5}>EMAIL ADDRESS</Text>
                    <XStack 
                      ai="center" h={62} br="$4" bw={1} 
                      borderColor={colors.border} 
                      background={isLight ? "$gray1" : "$gray2"} 
                      px="$4" gap="$3"
                      focusStyle={{ bc: colors.primary, bw: 1.5, bg: '$colorTransparent' }}
                    >
                      <AtSign size={18} color={colors.primary} strokeWidth={2.5} />
                      <Input 
                        f={1} h="100%" bw={0} 
                        background={'transparent'} 
                        p={0}
                        placeholder="yourname@example.com"
                        placeholderTextColor={colors.placeholder}
                        value={email} onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        color={colors.text}
                        ff={fonts.medium.fontFamily}
                        fontSize={15}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                      />
                    </XStack>
                  </YStack>

                  {/* Password */}
                  <YStack space="$1.5">
                    <XStack jc="space-between" ai="flex-end" px="$1">
                       <Text fontSize={12} ff={fonts.bold.fontFamily} color={colors.text} opacity={0.4} ls={0.5}>PASSWORD</Text>
                       {/* --- CONNECTED ONFORGOT HERE --- */}
                       <TouchableOpacity onPress={onForgot} activeOpacity={0.6}>
                          <Text fontSize={11} ff={fonts.bold.fontFamily} color={colors.primary}>FORGOT?</Text>
                       </TouchableOpacity>
                    </XStack>
                    <XStack 
                      ai="center" h={62} br="$4" bw={1} 
                      borderColor={colors.border} 
                      background={isLight ? "$gray1" : "$gray2"} 
                      px="$4" gap="$3"
                      focusStyle={{ bc: colors.primary, bw: 1.5, bg: '$colorTransparent' }}
                    >
                      <KeyRound size={18} color={colors.primary} strokeWidth={2.5} />
                      <Input 
                        ref={passwordRef}
                        f={1} h="100%" bw={0} bg="transparent" p={0}
                        placeholder="Enter your password"
                        secureTextEntry
                        placeholderTextColor={colors.placeholder}
                        value={password} onChangeText={setPassword}
                        color={colors.text}
                        ff={fonts.medium.fontFamily}
                        fontSize={15}
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                      />
                    </XStack>
                  </YStack>
                </YStack>

                {/* --- LOGIN BUTTON --- */}
                <Button 
                  bg={colors.primary} h={62} br="$4"
                  onPress={handleLogin}
                  disabled={loading}
                  pressStyle={{ scale: 0.98, opacity: 0.9 }}
                >
                  {loading ? <Spinner color="white" /> : (
                    <XStack ai="center" gap="$2.5">
                      <Text color="white" ff={fonts.bold.fontFamily} fontSize={16} ls={0.5}>Login Now</Text>
                      <ArrowRight size={20} color="white" strokeWidth={2.5} />
                    </XStack>
                  )}
                </Button>
              </YStack>

              {/* --- FOOTER --- */}
              <YStack ai="center" space="$5">
                <XStack ai="center" space="$3" w="100%">
                   <Separator f={1} bc={colors.border} opacity={0.5} />
                   <CircleUserRound size={20} color={colors.textSecondary} opacity={0.3} />
                   <Separator f={1} bc={colors.border} opacity={0.5} />
                </XStack>

                <TouchableOpacity onPress={switchScreen} activeOpacity={0.7}>
                  <XStack space="$2">
                    <Text color={colors.textSecondary} ff={fonts.medium.fontFamily} fontSize={14}>
                      Don't have an account?
                    </Text>
                    <Text color={colors.primary} ff={fonts.bold.fontFamily} fontSize={14}>
                      Sign Up
                    </Text>
                  </XStack>
                </TouchableOpacity>
              </YStack>

            </YStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}