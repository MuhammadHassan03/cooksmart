import { useState } from "react";
import {
  Button,
  Input,
  Text,
  View,
  YStack,
  H1,
  Spinner,
  XStack,
} from "tamagui";
import Constants from "expo-constants";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import useAuthentication from "@/hooks/(unauthenticated)/auth/useAuthentication";
import { appName } from "@/constants";
import { useAppToast } from "@/hooks/useAppToast";

interface SignupProps {
  switchScreen: () => void;
}

export default function SignupScreen({ switchScreen }: SignupProps) {
  const { colors, fonts } = useThemeColors();
  const { signup, loading } = useAuthentication();
  const { showError, showSuccess } = useAppToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignup = async () => {
    try {
      await signup({ email, password, fullName });
    } catch (error) {
      // TODO: Show user-friendly error message
      showError(`${error}`)
      console.error("Signup error:", error);
    }
  };

  return (
    <YStack
      flex={1}
      padding="$4"
      space
      justifyContent="center"
      backgroundColor={colors.background}
    >
      {/* Header */}
      <View alignItems="center" marginBottom="$6">
        <H1
          color={colors.text}
          fontFamily={fonts.bold.fontFamily}
          fontWeight={fonts.bold.fontWeight}
          fontSize={32}
        >
          {appName}
        </H1>
        <Text
          color={colors.textSecondary}
          fontFamily={fonts.regular.fontFamily}
          fontWeight={fonts.regular.fontWeight}
          fontSize={14}
        >
          Create your account below
        </Text>
      </View>

      {/* Form */}
      <YStack space="$3">
        <Input
          placeholder="Full Name"
          borderRadius="$3"
          width="100%"
          value={fullName}
          onChangeText={setFullName}
          backgroundColor={colors.card}
          color={colors.text}
          placeholderTextColor={colors.placeholder}
          fontFamily={fonts.regular.fontFamily}
          fontWeight={fonts.regular.fontWeight}
        />

        <Input
          placeholder="Email"
          borderRadius="$3"
          width="100%"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          backgroundColor={colors.card}
          color={colors.text}
          placeholderTextColor={colors.placeholder}
          fontFamily={fonts.regular.fontFamily}
          fontWeight={fonts.regular.fontWeight}
        />

        <Input
          placeholder="Password"
          borderRadius="$3"
          width="100%"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          backgroundColor={colors.card}
          color={colors.text}
          placeholderTextColor={colors.placeholder}
          fontFamily={fonts.regular.fontFamily}
          fontWeight={fonts.regular.fontWeight}
        />

        <Button
          width="100%"
          backgroundColor={colors.primary}
          onPress={handleSignup}
          disabled={loading}
          borderRadius="$3"
          paddingVertical="$2"
        >
          {loading ? (
            <XStack alignItems="center" justifyContent="center" space="$2">
              <Spinner size="small" color={colors.background} />
              <Text
                color={colors.background}
                fontFamily={fonts.bold.fontFamily}
                fontWeight={fonts.bold.fontWeight}
              >
                Signing up...
              </Text>
            </XStack>
          ) : (
            <Text
              color={colors.background}
              fontFamily={fonts.bold.fontFamily}
              fontWeight={fonts.bold.fontWeight}
            >
              Sign Up
            </Text>
          )}
        </Button>
      </YStack>

      {/* Footer */}
      <YStack alignItems="center" marginTop="$4" space="$2">
        <Text
          fontFamily={fonts.medium.fontFamily}
          fontWeight={fonts.medium.fontWeight}
          color={colors.text}
          fontSize={13}
          onPress={switchScreen}
          textDecorationLine="underline"
        >
          Already have an account? Log in
        </Text>
      </YStack>
    </YStack>
  );
}
