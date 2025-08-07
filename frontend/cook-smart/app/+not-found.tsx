import { Stack } from "expo-router"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { SafeAreaView } from "react-native-safe-area-context"
import { MotiView } from "moti"
import { YStack, Text, Button, Card } from "tamagui"
import { useRouter } from "expo-router"
import { AlertTriangle } from "@tamagui/lucide-icons"

export default function NotFoundScreen() {
  const { colors, fonts } = useThemeColors()
  const router = useRouter()

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          padding="$6"
        >
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 400 }}
            style={{ width: "100%" }}
          >
            <Card
              backgroundColor={colors.surface}
              borderColor={colors.accent}
              borderWidth={1}
              padding="$5"
              borderRadius="$6"
              alignItems="center"
              justifyContent="center"
              elevate
            >
              <AlertTriangle size={32} color={colors.accent} />
              <Text
                fontSize={18}
                fontFamily={fonts.bold.fontFamily}
                color={colors.text}
                mt="$3"
              >
                Page Not Found
              </Text>
              <Text
                fontSize={14}
                fontFamily={fonts.regular.fontFamily}
                color={colors.textSecondary}
                mt="$2"
                textAlign="center"
              >
                Hmm, we couldn't find that screen. It might have expired or moved.
              </Text>

              <Button
                size="$3"
                mt="$4"
                backgroundColor={colors.accent}
                color="$white"
                fontFamily={fonts.medium.fontFamily}
                borderRadius="$4"
                onPress={() => router.replace("/")}
              >
                Go to Home
              </Button>
            </Card>
          </MotiView>
        </YStack>
      </SafeAreaView>
    </>
  )
}
