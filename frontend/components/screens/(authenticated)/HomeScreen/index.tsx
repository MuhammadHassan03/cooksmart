import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "tamagui"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { useAuth } from "@/context/AuthContext"
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader"
import { GreetingSection } from "@/components/screens/(authenticated)/HomeScreen/GreetingSection"
import { SmartNudgesSection } from "@/components/screens/(authenticated)/HomeScreen/SmartNudgesSection"
import { QuickActionsSection } from "@/components/screens/(authenticated)/HomeScreen/QuickActionsSection"
import { ExpiringSoonSection } from "@/components/screens/(authenticated)/HomeScreen/ExpiringSoonSection"
import { SuggestedRecipesSection } from "@/components/screens/(authenticated)/HomeScreen/SuggestedRecipesSection"
import { AISnippetCard } from "@/components/screens/(authenticated)/HomeScreen/AISnippetCard"
import { PremiumUpgradeCard } from "@/components/screens/(authenticated)/HomeScreen/PremiumUpgradeCard"
import { appName } from "@/constants"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"

export default function HomeScreen() {
  const { colors } = useThemeColors()
  const tabBarHeight = useBottomTabBarHeight()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: tabBarHeight - 30,
      }}
    >
      <ReusableHeader title={appName} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
        <GreetingSection />
        <QuickActionsSection />
        <ExpiringSoonSection />
        <SuggestedRecipesSection />
        <SmartNudgesSection />
        <AISnippetCard />
        <PremiumUpgradeCard />
      </ScrollView>
    </SafeAreaView>
  )
}
