import { H2, Text, YStack, XStack, Avatar, View } from "tamagui"
import { useAuth } from "@/context/AuthContext"
import { useThemeColors } from "@/hooks/theme/useThemeColors"

export const GreetingSection = () => {
  const { user } = useAuth()
  const { colors, fonts } = useThemeColors()

  // 1. Greeting Logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  // 2. Format Date
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <XStack justifyContent="space-between" alignItems="flex-start" marginBottom="$4" paddingTop="$2">
      <YStack flex={1} gap="$0.5">
        {/* Date: Small, clean and uppercase */}
        <Text 
          color={colors.textSecondary} 
          fontSize={12} // Fixed: fS -> fontSize
          fontFamily={fonts.bold.fontFamily} 
          textTransform="uppercase" // Fixed: tt -> textTransform
          letterSpacing={1.2} // Fixed: lS -> letterSpacing
          opacity={0.8}
        >
          {today}
        </Text>

        {/* Name: Main focus point */}
        <H2 
          color={colors.text} 
          fontSize={26} // Fixed: fS -> fontSize
          fontFamily={fonts.bold.fontFamily} 
          letterSpacing={-0.5} // Fixed: ls -> letterSpacing
        >
          {getGreeting()}, {user?.fullName?.split(" ")[0] || "Chef"}!
        </H2>

        {/* Sub-greeting: Friendly context */}
        <XStack alignItems="center" gap="$1.5">
          <Text 
            color={colors.textSecondary} 
            fontSize={14} // Fixed: fS -> fontSize
            fontFamily={fonts.medium.fontFamily}
          >
            Ready to save some food today?
          </Text>
          <Text fontSize={14}>🥗</Text>
        </XStack>
      </YStack>

      {/* 3. Personalized Avatar with subtle ring */}
      <View 
        padding={2} // Fixed: p -> padding
        borderRadius="$10" // Fixed: br -> borderRadius
        borderWidth={2} // Fixed: bw -> borderWidth
        borderColor={colors.primarySubtle} // Soft emerald ring. Fixed: boc -> borderColor
      >
        <Avatar circular size="$4.5">
          <Avatar.Image 
            src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.fullName || "Chef"}&background=00C38B&color=fff`} 
          />
          <Avatar.Fallback backgroundColor={colors.surface} /> 
          {/* Fixed: bc -> backgroundColor */}
        </Avatar>
      </View>
    </XStack>
  )
}