import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Check, AlertCircle } from "@tamagui/lucide-icons";
import { YStack, XStack, Text, H4, Card, View } from "tamagui";
import StepContainer from "@/components/ui/reuseable/ThemedStepContainer";
import { ALLERGY_OPTIONS } from "@/constants";
import { useOnboarding } from "@/context/OnboardingContext";

export default function AllergyScreen() {
  const router = useRouter();
  const { colors, fonts } = useThemeColors();
  const { selections, toggleSelection, isSelected } = useOnboarding();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StepContainer
        title="Food Safety"
        step={2}
        totalSteps={4}
        onNext={() => router.push("/onboarding/cuisine")}
        // Optional: Allergies empty bhi ho sakti hain agar user ko koi allergy nahi
        disableNext={false} 
        showBack
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack paddingHorizontal="$4" marginTop="$4" space="$5" paddingBottom="$10">
            
            <YStack space="$2">
              <XStack ai="center" space="$2">
                <H4 color={colors.text} fontFamily={fonts.bold.fontFamily} fontSize="$8">
                  Any allergies?
                </H4>
                <View bc={colors.error + "20"} p="$1" br="$10">
                  <AlertCircle size={16} color={colors.error} />
                </View>
              </XStack>
              <Text fontSize={16} color={colors.textSecondary}>
                We'll exclude these ingredients from your meal suggestions.
              </Text>
            </YStack>

            {/* Grid Layout for Allergies */}
            <XStack fw="wrap" gap="$3">
              {ALLERGY_OPTIONS.map((option) => {
                const selected = isSelected("allergies", option);

                return (
                  <Card
                    key={option}
                    bordered
                    borderWidth={2}
                    borderColor={selected ? colors.primary : colors.border}
                    backgroundColor={selected ? colors.primary + "15" : colors.surface}
                    paddingVertical="$3"
                    paddingHorizontal="$4"
                    borderRadius="$10" // Pill shape
                    onPress={() => toggleSelection("allergies", option)}
                    pressStyle={{ scale: 0.95 }}
                    animation="quick"
                    elevation={selected ? 2 : 0}
                  >
                    <XStack ai="center" space="$2">
                      {selected && (
                        <View bc={colors.primary} br="$10" p="$0.5">
                          <Check size={12} color="white" strokeWidth={4} />
                        </View>
                      )}
                      <Text
                        color={selected ? colors.primary : colors.text}
                        fontSize={15}
                        fontWeight={selected ? "700" : "500"}
                      >
                        {option}
                      </Text>
                    </XStack>
                  </Card>
                );
              })}

              {/* Special "None" Option if needed */}
              {selections.allergies.length === 0 && (
                <View py="$2" px="$1">
                  <Text color={colors.textSecondary} fontStyle="italic" fontSize={14}>
                    Tip: Tap items to select. Leave empty if none.
                  </Text>
                </View>
              )}
            </XStack>

          </YStack>
        </ScrollView>
      </StepContainer>
    </SafeAreaView>
  );
}