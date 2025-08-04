import React from "react"
import { XStack, Text, Avatar, View, Button } from "tamagui"
import { useAuth } from "@/context/AuthContext"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { useRouter } from "expo-router"

type ReusableHeaderProps = {
  title?: string
  showAvatar?: boolean
  rightSlot?: React.ReactNode
}

export function ReusableHeader({
  title = "FridgeChef",
  showAvatar = true,
  rightSlot
}: ReusableHeaderProps) {
  const { user } = useAuth()
  const { colors } = useThemeColors()
  const router = useRouter()

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "C"

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="$4"
      paddingTop="$4"
      paddingBottom="$2"
      backgroundColor={colors.surface}
      borderBottomWidth={1}
      borderColor={colors.border}
    >
      <Text
        fontWeight="800"
        fontSize={22}
        color={colors.text}
        fontFamily="System"
      >
        {title}
      </Text>

      <XStack alignItems="center" gap="$3">
        {rightSlot}

        {showAvatar && (
          <Button
            chromeless
            circular
            size="$3"
            onPress={() => router.push("/(profile)/account")}
          >
            <Avatar
              circular
              size="$3"
              backgroundColor={colors.primary}
              borderColor={colors.border}
              borderWidth={1}
            >
              {user?.profileImageUrl ? (
                <Avatar.Image src={user.profileImageUrl} />
              ) : (
                <Avatar.Fallback>
                  <Text fontWeight="600" color={colors.card}>
                    {userInitials}
                  </Text>
                </Avatar.Fallback>
              )}
            </Avatar>
          </Button>
        )}
      </XStack>
    </XStack>
  )
}
