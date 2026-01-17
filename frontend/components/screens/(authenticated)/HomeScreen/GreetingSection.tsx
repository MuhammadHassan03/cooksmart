import { H2, Text, YStack } from "tamagui"
import { useAuth } from "@/context/AuthContext"
import { useThemeColors } from "@/hooks/theme/useThemeColors"

export const GreetingSection = () => {
  const { user } = useAuth()
  const { colors, fonts } = useThemeColors()

  const greeting = `Good ${new Date().getHours() < 12 ? "Morning" : "Evening"}, ${user?.fullName || "Chef"}`

  return (
    <YStack mb="$4">
      <H2 color={colors.text} fontFamily={fonts.bold.fontFamily}>{greeting}</H2>
      <Text color={colors.textSecondary}>Here's what’s cooking today 🍳</Text>
    </YStack>
  )
}