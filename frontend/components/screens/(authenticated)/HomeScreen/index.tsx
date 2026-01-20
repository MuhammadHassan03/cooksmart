import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { GreetingSection } from "@/components/screens/(authenticated)/HomeScreen/GreetingSection";
import { SmartNudgesSection } from "@/components/screens/(authenticated)/HomeScreen/SmartNudgesSection";
import { QuickActionsSection } from "@/components/screens/(authenticated)/HomeScreen/QuickActionsSection";
import { ExpiringSoonSection } from "@/components/screens/(authenticated)/HomeScreen/ExpiringSoonSection";
import { SuggestedRecipesSection } from "@/components/screens/(authenticated)/HomeScreen/SuggestedRecipesSection";
import { PremiumUpgradeCard } from "@/components/screens/(authenticated)/HomeScreen/PremiumUpgradeCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHomeData } from "@/hooks/(authenticated)/useHomeData";

export default function HomeScreen() {
  const { expiringSoon, allInventory, isLoading } = useHomeData();
  const { colors } = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <YStack f={1} backgroundColor={colors.background}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        edges={["top", "left", "right"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 10,
            paddingBottom: tabBarHeight + 20,
          }}
        >
          <GreetingSection />
          <YStack gap="$5" mt="$4">
            <QuickActionsSection />

            <ExpiringSoonSection />

            <SuggestedRecipesSection />

            <SmartNudgesSection />

            <PremiumUpgradeCard />
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </YStack>
  );
}
