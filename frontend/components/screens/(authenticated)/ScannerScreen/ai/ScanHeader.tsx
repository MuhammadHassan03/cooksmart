import React from "react";
import { Text, H4, Paragraph, XStack, YStack, View } from "tamagui";
import { Crown, Sparkles, Zap } from "@tamagui/lucide-icons";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useScanContext } from "@/context/ScanContext";
import { MotiView } from "moti";

export function ScanHeader() {
  const { scansLeft } = useScanContext(); 
  const { colors, fonts, isLight } = useThemeColors();
  
  const MAX_SCANS = 10;
  const progressWidth = Math.min((scansLeft / MAX_SCANS) * 100, 100);

  return (
    <YStack 
      paddingHorizontal="$4" 
      paddingTop="$6" 
      paddingBottom="$4" 
      space="$4"
      backgroundColor={isLight ? "#FFFFFF" : "#000000"} // Consistent with ManualScreen
    >
      
      {/* Upper Row: Title & Pro Badge */}
      <XStack justifyContent="space-between" alignItems="center">
        <YStack space="$0.5" flex={1}>
          <XStack alignItems="center" space="$2">
            <H4 
              color={colors.text} 
              fontFamily={fonts.bold.fontFamily} 
              fontSize={28} 
              letterSpacing={-1.5} // Tight professional spacing
              fontWeight="900"
            >
              Fridge AI
            </H4>
            <MotiView
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <View 
                backgroundColor={isLight ? "$blue2" : "rgba(0, 122, 255, 0.15)"} 
                padding="$1.5" 
                borderRadius="$6"
              >
                <Sparkles size={16} color={isLight ? "$blue10" : "$blue9"} fill={isLight ? "$blue10" : "$blue9"} />
              </View>
            </MotiView>
          </XStack>
          <Paragraph 
            fontSize={13} 
            color={colors.textSecondary} 
            fontWeight="600"
            opacity={0.6}
            letterSpacing={-0.2}
          >
            Detect ingredients in real-time
          </Paragraph>
        </YStack>

        {/* Pro Badge - High Contrast */}
        <XStack
          backgroundColor={isLight ? "$yellow2" : "rgba(255, 184, 0, 0.1)"}
          paddingHorizontal="$3"
          paddingVertical="$1.5"
          borderRadius="$10"
          alignItems="center"
          space="$1.5"
          borderWidth={1.5}
          borderColor={isLight ? "$yellow5" : "$yellow9"}
          elevation={isLight ? 2 : 0} // Slight lift in light mode
        >
          <Crown size={12} color={isLight ? "$yellow10" : "$yellow8"} fill={isLight ? "$yellow10" : "transparent"} />
          <Text 
            fontSize={11} 
            color={isLight ? "$yellow11" : "$yellow8"} 
            fontWeight="900" 
            letterSpacing={1}
          >
            PRO
          </Text>
        </XStack>
      </XStack>

      {/* Scans Progress Card - Modern Glass/Card Look */}
      <YStack 
        backgroundColor={isLight ? "#f8f9fa" : "#111111"} 
        padding="$4" 
        borderRadius="$10" 
        space="$3"
        borderWidth={1}
        borderColor={isLight ? "$gray4" : "#222222"}
        shadowColor="#000"
        shadowRadius={isLight ? 10 : 0}
        shadowOpacity={isLight ? 0.05 : 0}
      >
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" space="$2">
            <View 
              bg={isLight ? "$gray4" : "#1a1a1a"} 
              p="$1.5" 
              br="$5"
            >
              <Zap size={14} color={scansLeft > 2 ? colors.primary : "$red10"} fill={scansLeft > 2 ? colors.primary : "$red10"} />
            </View>
            <Text fontSize={14} fontWeight="800" color={colors.text} letterSpacing={-0.3}>
              Scan Credits
            </Text>
          </XStack>
          
          <XStack ai="center" gap="$1.5">
             <Text fontSize={14} fontWeight="900" color={colors.text}>
              {scansLeft}
            </Text>
            <Text fontSize={12} fontWeight="600" color={colors.textSecondary} opacity={0.5}>
              / {MAX_SCANS}
            </Text>
          </XStack>
        </XStack>

        {/* Custom Progress Bar - Smoother UI */}
        <View 
          height={8} 
          width="100%" 
          backgroundColor={isLight ? "$gray5" : "#1a1a1a"} 
          borderRadius="$10" 
          overflow="hidden"
        >
          <MotiView
            from={{ width: '0%' }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ type: 'spring', damping: 15 }}
            style={{
              height: '100%',
              backgroundColor: scansLeft > 2 ? colors.primary : "#ff3b30",
              borderRadius: 10,
            }}
          />
        </View>
      </YStack>

    </YStack>
  );
}