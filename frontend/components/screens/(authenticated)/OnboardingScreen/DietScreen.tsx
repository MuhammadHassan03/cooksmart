import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Check, Leaf, Salad, Flame, Zap, CircleDot } from "@tamagui/lucide-icons";
import { YStack, XStack, Text, H4, Card, View } from "tamagui";
import StepContainer from "@/components/ui/reuseable/ThemedStepContainer";
import { DIET_OPTIONS } from "@/constants";
import { useOnboarding } from "@/context/OnboardingContext";

const DIET_ICONS: Record<string, any> = {
  Vegetarian: Salad,
  Vegan: Leaf,
  Keto: Flame,
  Paleo: Zap,
  Standard: CircleDot,
};

export default function DietScreen() {
  const router = useRouter();
  const { colors, fonts } = useThemeColors();
  const { selections, toggleSelection, isSelected } = useOnboarding();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StepContainer
        title="Dietary Preference"
        step={1}
        totalSteps={4}
        onNext={() => router.push("/onboarding/allergy")}
        disableNext={selections.diet.length === 0}
        showBack={false}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack paddingHorizontal="$4" marginTop="$4" space="$5" paddingBottom="$10">
            <YStack space="$1">
              <H4 color={colors.text} fontFamily={fonts.bold.fontFamily} fontSize="$8">
                What's your diet?
              </H4>
              <Text fontSize={16} color={colors.textSecondary}>
                Select all that apply. This helps us customize your meal plans.
              </Text>
            </YStack>

            <YStack space="$3">
              {DIET_OPTIONS.map((option) => {
                const selected = isSelected("diet", option);
                const IconComponent = DIET_ICONS[option] || CircleDot;

                return (
                  /* FIX: Pressable hata kar Card ka onPress use kiya hai */
                  <Card
                    key={option}
                    bordered
                    borderWidth={2}
                    borderColor={selected ? colors.primary : colors.border}
                    backgroundColor={selected ? colors.primary + "15" : colors.surface}
                    padding="$4"
                    borderRadius="$6"
                    onPress={() => toggleSelection("diet", option)} // Card level click
                    pressStyle={{ scale: 0.97, opacity: 0.8 }}
                    animation="medium"
                    cursor="pointer"
                    elevate={selected}
                  >
                    <XStack justifyContent="space-between" alignItems="center">
                      <XStack space="$3" alignItems="center">
                        <View 
                          p="$2" 
                          br="$4" 
                          bc={selected ? colors.primary : colors.background}
                          bw={1}
                          boc={selected ? colors.primary : colors.border}
                        >
                          <IconComponent 
                            size={22} 
                            color={selected ? "white" : colors.textSecondary} 
                          />
                        </View>

                        <YStack>
                          <Text
                            color={colors.text}
                            fontSize={16}
                            fontWeight={selected ? "700" : "500"}
                          >
                            {option}
                          </Text>
                        </YStack>
                      </XStack>

                      <View 
                        w={24} h={24} br={12} 
                        bw={2} boc={selected ? colors.primary : colors.border}
                        ai="center" jc="center"
                        bc={selected ? colors.primary : "transparent"}
                      >
                        {selected && <Check size={14} color="white" strokeWidth={3} />}
                      </View>
                    </XStack>
                  </Card>
                );
              })}
            </YStack>
          </YStack>
        </ScrollView>
      </StepContainer>
    </SafeAreaView>
  );
}