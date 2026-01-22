import React from "react";
import { Card, XStack, YStack, Text, View, GetProps } from "tamagui";
import { Package, ChevronRight } from "@tamagui/lucide-icons";
import { ItemCardProps } from "@/utils/types/cards";

export const ItemCard = ({
  name,
  subtitle,
  icon,
  leftElement, // Isay add karein
  rightElement,
  isUrgent = false,
  onPress,
  variant = "default",
  bg, // Dynamic background support
  ...rest // Baaki Tamagui props (bw, boc, br etc)
}: ItemCardProps & GetProps<typeof Card>) => {
  return (
    <Card
      onPress={onPress}
      disabled={!onPress}
      padding="$3.5"
      borderRadius="$6"
      bg={bg || (isUrgent ? "$red1" : "$card")} // Fallback to $card
      borderWidth={1}
      borderColor={isUrgent ? "$red5" : "$border"}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
      elevate={variant === "default"}
      {...rest} // Taake MealSlot se bheji gayi styling apply ho
    >
      <XStack jc="space-between" ai="center" space="$3">
        
        {/* Left Side: Custom Element ya Default Icon */}
        <XStack space="$3" f={1} ai="center">
          {leftElement ? (
            leftElement 
          ) : (
            <View 
              p="$2.5" br="$4" 
              bg={isUrgent ? "$red2" : "$primarySubtle"}
              ai="center" jc="center"
            >
              {icon || <Package size={20} color={isUrgent ? "$red10" : "$primary"} />}
            </View>
          )}

          <YStack f={1}>
            {/* Name supports both string and element */}
            {typeof name === 'string' ? (
              <Text fontSize="$4" fontWeight="700" color={isUrgent ? "$red10" : "$text"} numberOfLines={1}>
                {name}
              </Text>
            ) : name}
            
            {subtitle && (
              <View mt="$1">
                {typeof subtitle === 'string' ? (
                  <Text fontSize="$2" color="$textSecondary" numberOfLines={1}>
                    {subtitle}
                  </Text>
                ) : subtitle}
              </View>
            )}
          </YStack>
        </XStack>

        {/* Right Side */}
        <XStack ai="center">
          {rightElement || (onPress && <ChevronRight size={18} color="$textQuaternary" />)}
        </XStack>
      </XStack>
    </Card>
  );
};