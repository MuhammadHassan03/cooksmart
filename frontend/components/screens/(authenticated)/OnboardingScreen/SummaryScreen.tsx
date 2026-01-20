import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  YStack,
  H4,
  Text,
  Card,
  XStack,
  ScrollView,
  View,
  Circle,
} from "tamagui";
import { Edit3, CheckCircle2, Utensils, AlertTriangle, Globe } from "@tamagui/lucide-icons";  
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import StepContainer from "@/components/ui/reuseable/ThemedStepContainer";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuthStore } from "@/utils/store/useAuthStore";

export default function SummaryScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAuthStore();
  const { selections } = useOnboarding();
  const { colors, fonts } = useThemeColors();

  const { diet, allergies, cuisines } = selections;

  const renderSection = (
    title: string, 
    items: string[], 
    icon: any, 
    route: string,
    accentColor: string
  ) => (
    <YStack space="$3">
      <XStack jc="space-between" ai="center">
        <XStack ai="center" space="$2">
          <View bc={accentColor + "20"} p="$1.5" br="$3">
            {icon}
          </View>
          <H4 fontSize={18} fontFamily={fonts.bold?.fontFamily} color={colors.text}>
            {title}
          </H4>
        </XStack>
        <Circle 
          size={32} 
          bc={colors.surface} 
          onPress={() => router.push(route as any)}
          pressStyle={{ scale: 0.9, bc: colors.border }}
        >
          <Edit3 size={14} color={colors.textSecondary} />
        </Circle>
      </XStack>

      <XStack fw="wrap" gap="$2">
        {items.length > 0 ? (
          items.map((item) => (
            <View 
              key={item} 
              bc={colors.surface} 
              bw={1} 
              boc={colors.border} 
              px="$3" 
              py="$1.5" 
              br="$10"
            >
              <Text fontSize={14} fow="600" color={colors.text}>
                {item}
              </Text>
            </View>
          ))
        ) : (
          <Text fontSize={14} color={colors.textSecondary} fst="italic" px="$1">
            No preferences selected
          </Text>
        )}
      </XStack>
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
    <SafeAreaView 
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <StepContainer
        title="Ready to cook?"
        description="Review your settings before we personalize your experience."
        step={4}
        totalSteps={4}
        nextLabel="Complete Setup"
        onNext={handleSubmit}
        showBack={true}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack space="$8" pb="$10">
            
            {/* Hero Success Card */}
            <Card elevate bc={colors.primary} p="$4" br="$6" space="$2">
              <XStack ai="center" space="$3">
                <CheckCircle2 size={32} color="white" />
                <YStack>
                  <Text color="white" fow="800" fontSize={18}>Perfect!</Text>
                  <Text color="white" opacity={0.8} fontSize={14}>
                    Your taste profile is looking great.
                  </Text>
                </YStack>
              </XStack>
            </Card>

            <YStack space="$6">
              {renderSection(
                "Dietary Goals", 
                diet, 
                <Utensils size={18} color={colors.primary} />, 
                "/onboarding/diet",
                colors.primary
              )}
              
              {renderSection(
                "Health & Safety", 
                allergies, 
                <AlertTriangle size={18} color="#FF9500" />, 
                "/onboarding/allergy",
                "#FF9500"
              )}
              
              {renderSection(
                "Taste Profile", 
                cuisines, 
                <Globe size={18} color="#5856D6" />, 
                "/onboarding/cuisine",
                "#5856D6"
              )}
            </YStack>
          </YStack>
        </ScrollView>
      </StepContainer>
    </SafeAreaView>
  );
}