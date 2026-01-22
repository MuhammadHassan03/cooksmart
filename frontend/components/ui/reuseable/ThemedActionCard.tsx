import { ActionCardProps } from "@/utils/types/cards";
import React, { memo } from "react"
import { Card, YStack, Text, Circle, GetProps } from "tamagui"

export const ActionCard = memo(({ label, icon, onPress, flex, variant = 'surface' }: ActionCardProps) => {
  const isPrimary = variant === 'primary';

  return (
    <Card
      flex={flex}
      backgroundColor={isPrimary ? "$primary" : "$background"}
      padding="$4"
      borderRadius="$6"
      onPress={onPress}
      pressStyle={{ scale: 0.96, opacity: 0.9 }}
      borderWidth={1}
      borderColor={isPrimary ? "$primary" : "$border"}
      shadowColor={isPrimary ? "$primary" : "transparent"}
      shadowRadius={isPrimary ? 15 : 0}
      shadowOpacity={0.2}
    >
      <YStack alignItems="center" justifyContent="center" gap="$3">
        <Circle 
          size={48} 
          backgroundColor={isPrimary ? "rgba(255,255,255,0.2)" : "$primarySubtle"}
        >
          {icon}
        </Circle>
        <Text 
          fontWeight="700"
          fontSize={14} 
          color={isPrimary ? "white" : "$text"} 
          textAlign="center"
        >
          {label}
        </Text>
      </YStack>
    </Card>
  )
})