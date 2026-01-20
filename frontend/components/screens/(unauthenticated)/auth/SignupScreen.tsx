import { useState, useCallback, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
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
  Separator,
} from "tamagui";
import {
  AtSign,
  KeyRound,
  User,
  ArrowRight,
  LayoutGrid,
  CircleUserRound,
} from "@tamagui/lucide-icons";
import { MotiView } from "moti";
import useAuthentication from "@/hooks/(unauthenticated)/auth/useAuthentication";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { appName } from "@/constants";
import { useAppToast } from "@/hooks/useAppToast";

interface SignupProps {
  switchScreen: () => void;
}

export default function SignupScreen({ switchScreen }: SignupProps) {
  const { colors, fonts, isLight } = useThemeColors();
  const { signup, loading } = useAuthentication();
  const { showError } = useAppToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSignup = useCallback(async () => {
    if (!fullName || !email || !password) {
      showError("Please fill in all details to create your account");
      return;
    }
    try {
      await signup({ email, password, fullName });
    } catch (err: any) {
      showError(err?.message || "Signup failed. Please try again.");
    }
  }, [fullName, email, password, signup]);

  return (
    <View f={1} bg={colors.background}>
      <StatusBar barStyle={isLight ? "dark-content" : "light-content"} />

      {/* Abstract Background Glow */}
      <View
        pos="absolute"
        top={-50}
        right={-50}
        w={250}
        h={250}
        br={125}
        bg={colors.primary}
        opacity={0.1}
        filter="blur(60px)"
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
            <YStack f={1} px="$7" jc="center" space="$8" py="$6">
              {/* --- HEADER --- */}
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 600 }}
              >
                <YStack space="$2">
                  <XStack ai="center" space="$2" opacity={0.6}>
                    <LayoutGrid size={16} color={colors.text} />
                    <Text ff={fonts.medium.fontFamily} fontSize={14} ls={1}>
                      GET STARTED
                    </Text>
                  </XStack>

                  <H1
                    ff={fonts.bold.fontFamily}
                    fontSize={42}
                    color={colors.text}
                    ls={-1.5}
                  >
                    Join Us
                  </H1>
                  <Text
                    color={colors.textSecondary}
                    ff={fonts.medium.fontFamily}
                    fontSize={16}
                    opacity={0.5}
                  >
                    Create an account to explore {appName}
                  </Text>
                </YStack>
              </MotiView>

              {/* --- INPUTS --- */}
              <YStack space="$4">
                <YStack space="$3.5">
                  {/* Full Name */}
                  <YStack space="$1.5">
                    <Text
                      ml="$1"
                      fontSize={12}
                      ff={fonts.bold.fontFamily}
                      color={colors.text}
                      opacity={0.4}
                      ls={0.5}
                    >
                      FULL NAME
                    </Text>
                    <XStack
                      ai="center"
                      h={62}
                      br="$4"
                      bw={1}
                      borderColor={colors.border}
                      background={isLight ? "$gray1" : "$gray2"}
                      px="$4"
                      gap="$3"
                      focusStyle={{
                        bc: colors.primary,
                        bw: 1.5,
                        bg: "$colorTransparent",
                      }}
                    >
                      <User
                        size={18}
                        color={colors.primary}
                        strokeWidth={2.5}
                      />
                      <Input
                        f={1}
                        h="100%"
                        bw={0}
                        bg="transparent"
                        p={0}
                        placeholder="John Doe"
                        placeholderTextColor={colors.placeholder}
                        value={fullName}
                        onChangeText={setFullName}
                        color={colors.text}
                        ff={fonts.medium.fontFamily}
                        fontSize={15}
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current?.focus()}
                      />
                    </XStack>
                  </YStack>

                  {/* Email */}
                  <YStack space="$1.5">
                    <Text
                      ml="$1"
                      fontSize={12}
                      ff={fonts.bold.fontFamily}
                      color={colors.text}
                      opacity={0.4}
                      ls={0.5}
                    >
                      EMAIL ADDRESS
                    </Text>
                    <XStack
                      ai="center"
                      h={62}
                      br="$4"
                      bw={1}
                      borderColor={colors.border}
                      background={isLight ? "$gray1" : "$gray2"}
                      px="$4"
                      gap="$3"
                      focusStyle={{
                        bc: colors.primary,
                        bw: 1.5,
                        bg: "$colorTransparent",
                      }}
                    >
                      <AtSign
                        size={18}
                        color={colors.primary}
                        strokeWidth={2.5}
                      />
                      <Input
                        ref={emailRef}
                        f={1}
                        h="100%"
                        bw={0}
                        bg="transparent"
                        p={0}
                        placeholder="yourname@example.com"
                        placeholderTextColor={colors.placeholder}
                        value={email}
                        onChangeText={setEmail}
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
                    <Text
                      ml="$1"
                      fontSize={12}
                      ff={fonts.bold.fontFamily}
                      color={colors.text}
                      opacity={0.4}
                      ls={0.5}
                    >
                      PASSWORD
                    </Text>
                    <XStack
                      ai="center"
                      h={62}
                      br="$4"
                      bw={1}
                      borderColor={colors.border}
                      background={isLight ? "$gray1" : "$gray2"}
                      px="$4"
                      gap="$3"
                      focusStyle={{
                        bc: colors.primary,
                        bw: 1.5,
                        bg: "$colorTransparent",
                      }}
                    >
                      <KeyRound
                        size={18}
                        color={colors.primary}
                        strokeWidth={2.5}
                      />
                      <Input
                        ref={passwordRef}
                        f={1}
                        h="100%"
                        bw={0}
                        bg="transparent"
                        p={0}
                        placeholder="Create a strong password"
                        secureTextEntry
                        placeholderTextColor={colors.placeholder}
                        value={password}
                        onChangeText={setPassword}
                        color={colors.text}
                        ff={fonts.medium.fontFamily}
                        fontSize={15}
                        returnKeyType="done"
                        onSubmitEditing={handleSignup}
                      />
                    </XStack>
                  </YStack>
                </YStack>

                {/* --- SIGNUP BUTTON --- */}
                <Button
                  bg={colors.primary}
                  h={62}
                  br="$4"
                  onPress={handleSignup}
                  disabled={loading}
                  pressStyle={{ scale: 0.98, opacity: 0.9 }}
                  mt="$2"
                >
                  {loading ? (
                    <Spinner color="white" />
                  ) : (
                    <XStack ai="center" gap="$2.5">
                      <Text
                        color="white"
                        ff={fonts.bold.fontFamily}
                        fontSize={16}
                        ls={0.5}
                      >
                        Create Account
                      </Text>
                      <ArrowRight size={20} color="white" strokeWidth={2.5} />
                    </XStack>
                  )}
                </Button>
              </YStack>

              {/* --- FOOTER --- */}
              <YStack ai="center" space="$5">
                <XStack ai="center" space="$3" w="100%">
                  <Separator f={1} bc={colors.border} opacity={0.5} />
                  <CircleUserRound
                    size={20}
                    color={colors.textSecondary}
                    opacity={0.3}
                  />
                  <Separator f={1} bc={colors.border} opacity={0.5} />
                </XStack>

                <TouchableOpacity onPress={switchScreen} activeOpacity={0.7}>
                  <XStack space="$2">
                    <Text
                      color={colors.textSecondary}
                      ff={fonts.medium.fontFamily}
                      fontSize={14}
                    >
                      Already have an account?
                    </Text>
                    <Text
                      color={colors.primary}
                      ff={fonts.bold.fontFamily}
                      fontSize={14}
                    >
                      Login
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
