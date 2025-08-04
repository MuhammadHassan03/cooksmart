import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  YStack,
  H4,
  Text,
  Card,
  Separator,
  Button,
  XStack,
  ScrollView,
} from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import StepContainer from "@/components/ui/reuseable/ThemedStepContainer";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/context/AuthContext";

export default function SummaryScreen() {
  const router = useRouter();
  const { setIsOnboarded, completeOnboarding } = useAuth();
  const { selections } = useOnboarding();
  const { colors, fonts } = useThemeColors();

  const { diet, allergies, cuisines } = selections;

  const renderSection = (title: string, items: string[]) => (
    <YStack space="$3">
      <H4 fontFamily={fonts.bold.fontFamily} color={colors.text}>
        {title}
      </H4>

      <Card
        elevate
        bordered
        backgroundColor={colors.surface}
        borderColor={colors.border}
        paddingVertical="$3"
        paddingHorizontal="$4"
        space="$2"
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <YStack key={item}>
              <XStack alignItems="center" space="$2">
                <Text fontSize={15} color={colors.primary}>
                  •
                </Text>
                <Text fontSize={15} color={colors.text}>
                  {item}
                </Text>
              </XStack>
              {index !== items.length - 1 && (
                <Separator borderColor={colors.divider} />
              )}
            </YStack>
          ))
        ) : (
          <Text fontSize={15} color={colors.textSecondary} fontStyle="italic">
            No selections made
          </Text>
        )}
      </Card>
    </YStack>
  );

  const handleSubmit = async () => {
    try {
      await completeOnboarding({ diet, allergies, cuisines });
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack flex={1}>
        <StepContainer
          title="Your Summary"
          step={4}
          totalSteps={4}
          nextLabel="Submit"
          onNext={handleSubmit}
          showBack={false}
          disableNext={false}
        >
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 40,
            }}
          >
            <YStack space="$6">
              {renderSection("Diet Preferences", diet)}
              {renderSection("Allergies", allergies)}
              {renderSection("Favorite Cuisines", cuisines)}
            </YStack>
          </ScrollView>
        </StepContainer>
      </YStack>
    </SafeAreaView>
  );
}
