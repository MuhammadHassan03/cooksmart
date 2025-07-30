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
import useAuthentication from "@/hooks/(unauthenticated)/auth/useAuthentication";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { appName } from "@/constants";
import { useAppToast } from "@/hooks/useAppToast";

interface LoginScreenProps {
  switchScreen: () => void;
}

export default function LoginScreen({ switchScreen }: LoginScreenProps) {
  const { colors, fonts, scheme } = useThemeColors();
  const { login, loading } = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showError } = useAppToast()

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (err) {
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
          Welcome back, please log in
        </Text>
      </View>

      {/* Form */}
      <YStack space="$3">
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
          onPress={handleLogin}
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
                Logging in...
              </Text>
            </XStack>
          ) : (
            <Text
              color={colors.background}
              fontFamily={fonts.bold.fontFamily}
              fontWeight={fonts.bold.fontWeight}
            >
              Login
            </Text>
          )}
        </Button>
      </YStack>

      {/* Footer */}
      <YStack alignItems="center" marginTop="$4" space="$2">
        <Text
          fontFamily={fonts.medium.fontFamily}
          fontWeight={fonts.medium.fontWeight}
          color={colors.textSecondary}
          fontSize={13}
          onPress={() => {}}
        >
          Forgot Password?
        </Text>
        <Text
          fontFamily={fonts.medium.fontFamily}
          fontWeight={fonts.medium.fontWeight}
          color={colors.text}
          fontSize={13}
          onPress={switchScreen}
          textDecorationLine="underline"
        >
          Don't have an account? Sign up
        </Text>
      </YStack>
    </YStack>
  );
}
