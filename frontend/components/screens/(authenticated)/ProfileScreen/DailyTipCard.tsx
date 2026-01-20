import React, { memo } from "react";
import { Text, XStack, YStack, View } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { MotiView } from "moti";
import { Lightbulb } from "@tamagui/lucide-icons";

const DailyTipCard = () => {
  const { colors, fonts } = useThemeColors();

  const themeAccent = colors.accent || colors.primary;
  const bgTint = themeAccent.length === 7 ? themeAccent + "15" : themeAccent;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 600, delay: 200 }}
      // ✅ Fix: Ensure MotiView doesn't take extra space
      style={{ width: "100%" }} 
    >
      <XStack
        width="100%" // ✅ Full width
        backgroundColor={bgTint} 
        padding="$3.5"
        borderRadius="$6"
        borderWidth={1}
        borderColor={themeAccent + "30"}
        marginBottom="$5"
        alignItems="flex-start" // ✅ Vertical alignment content ke hisab se
        gap="$3"
      >
        {/* Icon Container - Fixed size */}
        <View 
          backgroundColor={themeAccent + "25"} 
          padding="$2" 
          borderRadius="$4"
          alignItems="center"
          justifyContent="center"
          flexShrink={0} // ✅ Prevent icon from shrinking
        >
          <Lightbulb size={20} color={themeAccent} />
        </View>

        {/* Content Container */}
        <YStack flex={1} gap="$0.5" justifyContent="center">
          <Text 
            fontSize={12} // Slightly smaller for better hierarchy
            fontWeight="900" 
            color={themeAccent}
            textTransform="uppercase"
            letterSpacing={1}
          >
            Smart Tip
          </Text>
          <Text 
            color={colors.text} 
            fontSize={13} 
            lineHeight={18}
            fontFamily={fonts?.medium?.fontFamily}
          >
            Store herbs like cilantro in a glass of water to keep them fresh longer. 🌿
          </Text>
        </YStack>
      </XStack>
    </MotiView>
  );
};

export default memo(DailyTipCard);