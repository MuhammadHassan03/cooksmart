import { memo } from "react";
import { Text, View, YStack } from "tamagui";

export const DatePill = memo(({ item, isSelected, onSelect, colors }: any) => (
  <YStack
    ai="center"
    jc="center"
    p="$2"
    br="$8" // Thora zyada round for premium feel
    w={60}
    h={90}
    bg={isSelected ? colors.primary : colors.card}
    onPress={() => onSelect(item.dateString)}
    bw={1.5}
    boc={isSelected ? colors.primary : colors.border + '20'} // Subtle border
    pressStyle={{ scale: 0.95 }}
    elevation={isSelected ? 8 : 0} // Glow effect for selected
    shc={colors.primary}
    animation="bouncy"
  >
    <Text 
      color={isSelected ? "white" : colors.textSecondary} 
      fontSize={12} 
      fontWeight="700" 
      tt="uppercase" 
      ls={1}
    >
      {item.dayName}
    </Text>
    <Text 
      color={isSelected ? "white" : colors.text} 
      fontWeight="900" 
      fontSize={24}
      mt="$1"
    >
      {item.dayNumber}
    </Text>
    
    {/* Selected Indicator Dot */}
    {isSelected && (
      <View w={4} h={4} br="$full" bg="white" mt="$1" />
    )}
  </YStack>
));