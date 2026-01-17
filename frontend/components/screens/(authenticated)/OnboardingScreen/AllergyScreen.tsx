import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Check } from "@tamagui/lucide-icons";
import {
  YStack,
  XStack,
  Text,
  H4,
  Card,
  Separator,
  Checkbox,
} from "tamagui";
import StepContainer from "@/components/ui/reuseable/ThemedStepContainer";
import { ALLERGY_OPTIONS } from "@/constants";
import { useOnboarding } from "@/context/OnboardingContext";

export default function AllergyScreen() {
  const router = useRouter();
  const { colors, fonts } = useThemeColors();
  const { selections, toggleSelection, isSelected } = useOnboarding();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack flex={1}>
        <StepContainer
          title="Any food allergies?"
          step={2}
          totalSteps={4}
          onNext={() => router.push("/onboarding/cuisine")}
          disableNext={selections.allergies.length === 0}
          showBack
        >
          <YStack paddingHorizontal="$4" marginTop="$4" space="$4">
            <YStack>
              <H4 color={colors.text} fontFamily={fonts.bold.fontFamily}>
                Choose all that apply
              </H4>
              <Text fontSize={14} color={colors.textSecondary}>
                This helps us keep you safe
              </Text>
            </YStack>

            <Card
              elevate
              bordered
              backgroundColor={colors.surface}
              borderColor={colors.border}
              padding="$3"
              space="$2"
            >
              {ALLERGY_OPTIONS.map((option, index) => {
                const selectedOption = isSelected("allergies", option);

                return (
                  <YStack key={option}>
                    <Pressable onPress={() => toggleSelection("allergies", option)} accessibilityLabel={`Select ${option}`}>
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                        paddingVertical="$2"
                        paddingHorizontal="$1"
                      >
                        <Text
                          color={colors.text}
                          fontSize={15}
                          fontWeight={selectedOption ? "700" : "500"}
                        >
                          {option}
                        </Text>

                        <Checkbox
                          size="$4"
                          checked={selectedOption}
                          onCheckedChange={() => toggleSelection("allergies", option)}
                          backgroundColor={colors.surface}
                        >
                          <Checkbox.Indicator>
                            <Check size={16} color={colors.primary} />
                          </Checkbox.Indicator>
                        </Checkbox>
                      </XStack>
                    </Pressable>

                    {index !== ALLERGY_OPTIONS.length - 1 && (
                      <Separator borderColor={colors.divider} />
                    )}
                  </YStack>
                );
              })}
            </Card>
          </YStack>
        </StepContainer>
      </YStack>
    </SafeAreaView>
  );
}
