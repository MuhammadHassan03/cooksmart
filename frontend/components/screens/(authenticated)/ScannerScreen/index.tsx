import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Paragraph,
  Text,
  XStack,
  YStack,
  Card,
  H3,
  View,
  ScrollView,
} from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Camera, Plus, Crown, Sparkles, ChevronRight, ShoppingCart } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useScanContext } from "@/context/ScanContext";
import { MotiView } from "moti";

export default function CreateScreen() {
  const { colors, fonts } = useThemeColors();
  const { scansLeft } = useScanContext();
  const router = useRouter();

  const isDark = colors.background !== '#F9FAFB';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <YStack padding="$5" gap="$6">
          
          {/* Header */}
          <YStack marginTop="$2" gap="$1">
            <H3 fontFamily={fonts.bold.fontFamily} color={colors.text}>Add Ingredients</H3>
            <Paragraph color={colors.textSecondary} fontSize={15} lineHeight={22}>
              Reduce food waste by keeping your FridgeChef inventory updated.
            </Paragraph>
          </YStack>

          <YStack gap="$4">
            {/* 1. AI SCAN CARD */}
            <MotiView
              from={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <Card
                padding="$0" 
                borderRadius="$8" 
                borderWidth={1} 
                borderColor={isDark ? "$gray10" : "$gray4"}
                backgroundColor={colors.surface} 
                overflow="hidden" 
                elevate
                onPress={() => router.push("/(scanner)/ai")}
              >
                <YStack padding="$5" gap="$4">
                  <XStack justifyContent="space-between" alignItems="center">
                    <View backgroundColor={isDark ? "$green10" : "$green5"} padding="$2.5" borderRadius="$5">
                      <Camera size={24} color={isDark ? "white" : "$green10"} />
                    </View>
                    <XStack backgroundColor="$yellow4" paddingHorizontal="$3" paddingVertical="$1" borderRadius="$10" alignItems="center" gap="$1.5">
                      <Sparkles size={12} color="$yellow10" fill="$yellow10" />
                      <Text fontSize={11} fontWeight="800" color="$yellow10" textTransform="uppercase">Premium AI</Text>
                    </XStack>
                  </XStack>

                  <YStack gap="$1">
                    <Text fontSize={20} fontWeight="800" color={colors.text}>Fridge Scanner</Text>
                    <Text fontSize={14} color={colors.textSecondary}>
                      Auto-detect items and set expiry dates instantly.
                    </Text>
                  </YStack>

                  <XStack alignItems="center" justifyContent="space-between" marginTop="$2">
                    <XStack alignItems="center" gap="$2">
                      <Crown size={14} color={colors.primary} />
                      <Text fontSize={12} fontWeight="600" color={colors.textSecondary}>
                        {scansLeft} trial scans left 
                      </Text>
                    </XStack>
                    <Button 
                      backgroundColor={colors.primary} 
                      borderRadius="$10" 
                      size="$3" 
                      paddingHorizontal="$4"
                      onPress={() => router.push("/(scanner)/ai")}
                    >
                      <Text color="white" fontWeight="700">Scan Now</Text>
                    </Button>
                  </XStack>
                </YStack>
              </Card>
            </MotiView>

            {/* 2. MANUAL ENTRY */}
            <Card
              padding="$4" 
              borderRadius="$7" 
              borderWidth={1} 
              borderColor={colors.border} 
              backgroundColor={colors.surface}
              onPress={() => router.push("/(scanner)/manual")}
              pressStyle={{ scale: 0.98, backgroundColor: colors.border }}
            >
              <XStack alignItems="center" justifyContent="space-between" gap="$4">
                <XStack alignItems="center" gap="$4" flex={1}>
                  <View backgroundColor={isDark ? "$gray11" : "$gray3"} padding="$2.5" borderRadius="$5">
                    <Plus size={20} color={colors.text} />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={16} fontWeight="700" color={colors.text}>Manual Add</Text>
                    <Text fontSize={12} color={colors.textSecondary} flexWrap="wrap">
                      Add custom items or bulk grains
                    </Text>
                  </YStack>
                </XStack>
                <ChevronRight size={20} color={colors.textSecondary} opacity={0.5} />
              </XStack>
            </Card>

            {/* 3. GROCERY LIST */}
            <Card
              padding="$4" 
              borderRadius="$7" 
              borderWidth={1} 
              borderColor={colors.border} 
              backgroundColor={colors.surface}
              // onPress={() => router.push("/(scanner)/grocery")}
              pressStyle={{ scale: 0.98, backgroundColor: colors.border }}
            >
              <XStack alignItems="center" justifyContent="space-between" gap="$4">
                <XStack alignItems="center" gap="$4" flex={1}>
                  <View backgroundColor={isDark ? "$orange10" : "$orange2"} padding="$2.5" borderRadius="$5">
                    <ShoppingCart size={20} color={isDark ? "white" : "$orange10"} />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={16} fontWeight="700" color={colors.text}>Grocery List</Text>
                    <Text fontSize={12} color={colors.textSecondary} flexWrap="wrap">
                      View missing items for recipes
                    </Text>
                  </YStack>
                </XStack>
                <ChevronRight size={20} color={colors.textSecondary} opacity={0.5} />
              </XStack>
            </Card>
          </YStack>

          {/* Quick Tip Box */}
          <YStack 
            padding="$4" 
            backgroundColor={isDark ? "$blue11" : "$blue2"} 
            borderRadius="$6" 
            borderWidth={1} 
            borderColor={isDark ? "$blue10" : "$blue4"}
          >
             <XStack gap="$3" alignItems="flex-start">
                <Sparkles size={18} color={isDark ? "white" : "$blue10"} />
                <YStack flex={1}>
                  <Text fontSize={13} color={isDark ? "white" : "$blue11"} fontWeight="500" flexWrap="wrap">
                    Tip: Use the Expiration Tracker to get alerts before your milk goes bad!
                  </Text>
                </YStack>
             </XStack>
          </YStack>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}