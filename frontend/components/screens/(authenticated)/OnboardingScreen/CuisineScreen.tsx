import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Check, Heart } from "@tamagui/lucide-icons";
import { YStack, XStack, Text, Card, View, H4 } from "tamagui";
import StepContainer from "@/components/ui/reuseable/ThemedStepContainer";
import { CUISINE_OPTIONS } from "@/constants";
import { useOnboarding } from "@/context/OnboardingContext";

export default function CuisineScreen() {
  const router = useRouter();
  const { colors, fonts } = useThemeColors();
  const { selections, toggleSelection, isSelected } = useOnboarding();

  return (
    <SafeAreaView 
      style={{ flex: 1, backgroundColor: colors.background }} 
      edges={["top", "left", "right"]} // Bottom edge StepContainer handle karega
    >
      <StepContainer
        title="Favorite Cuisines"
        step={3}
        totalSteps={4}
        onNext={() => router.push("/onboarding/summary")}
        disableNext={selections.cuisines.length === 0}
        showBack
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack space="$4" paddingBottom="$10">
            <YStack space="$1">
              <XStack ai="center" space="$2">
                <H4 color={colors.text} fontFamily={fonts.bold?.fontFamily} fontSize="$7">
                  Choose what you love
                </H4>
                <Heart size={18} color={colors.primary} fill={colors.primary} />
              </XStack>
              <Text fontSize={15} color={colors.textSecondary}>
                We'll prioritize these in your meal plans.
              </Text>
            </YStack>

            {/* Grid Layout: 2 items per row */}
            <XStack fw="wrap" jc="space-between" gap="$3">
              {CUISINE_OPTIONS.map((option) => {
                const selected = isSelected("cuisines", option);

                return (
                  <Card
                    key={option}
                    f={1}
                    fb="45%" // 2 items per row with gap
                    bordered
                    borderWidth={selected ? 2 : 1}
                    borderColor={selected ? colors.primary : colors.border}
                    backgroundColor={selected ? colors.primary + "10" : colors.surface}
                    onPress={() => toggleSelection("cuisines", option)}
                    pressStyle={{ scale: 0.97 }}
                    animation="quick"
                    p="$4"
                    ai="center"
                    jc="center"
                    br="$5"
                    elevation={selected ? 4 : 0}
                  >
                    <YStack ai="center" space="$2">
                      <Text
                        color={selected ? colors.primary : colors.text}
                        fontSize={16}
                        fontWeight={selected ? "700" : "500"}
                        ta="center"
                      >
                        {option}
                      </Text>
                      
                      {selected && (
                        <View 
                          pos="absolute" 
                          top={-10} 
                          right={-10} 
                          bc={colors.primary} 
                          br="$10" 
                          p="$1"
                        >
                          <Check size={12} color="white" strokeWidth={4} />
                        </View>
                      )}
                    </YStack>
                  </Card>
                );
              })}
            </XStack>
          </YStack>
        </ScrollView>
      </StepContainer>
    </SafeAreaView>
  );
}