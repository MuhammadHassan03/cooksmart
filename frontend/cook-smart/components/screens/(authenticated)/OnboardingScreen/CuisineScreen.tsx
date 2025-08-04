import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
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
import { CUISINE_OPTIONS } from "@/constants";
import { useOnboarding } from "@/context/OnboardingContext";

export default function CuisineScreen() {
  const router = useRouter();
  const { colors, fonts } = useThemeColors();
  const { selections, toggleSelection, isSelected } = useOnboarding();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack flex={1}>
        <StepContainer
          title="Preferred cuisines?"
          step={3}
          totalSteps={4}
          onNext={() => router.push("/onboarding/summary")}
          disableNext={selections.cuisines.length === 0}
          showBack
        >
          <YStack paddingHorizontal="$4" marginTop="$4" space="$4">
            <YStack>
              <H4 color={colors.text} fontFamily={fonts.bold.fontFamily}>
                Choose what you love
              </H4>
              <Text fontSize={14} color={colors.textSecondary}>
                This helps us suggest meals you'll enjoy
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
              {CUISINE_OPTIONS.map((option, index) => {
                const selectedOption = isSelected("cuisines", option);

                return (
                  <YStack key={option}>
                    <Pressable
                      onPress={() => toggleSelection("cuisines", option)}
                      accessibilityLabel={`Select ${option} cuisine`}
                    >
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
                          onCheckedChange={() => {}}
                          backgroundColor={colors.surface}
                        >
                          <Checkbox.Indicator>
                            <Check size={16} color={colors.primary} />
                          </Checkbox.Indicator>
                        </Checkbox>
                      </XStack>
                    </Pressable>

                    {index !== CUISINE_OPTIONS.length - 1 && (
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
