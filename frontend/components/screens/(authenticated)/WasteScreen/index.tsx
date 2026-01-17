import { ScrollView } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";

import WasteSummaryCard from "@/components/screens/(authenticated)/WasteScreen/WasteSummaryCard";
import ForecastedWasteCard from "@/components/screens/(authenticated)/WasteScreen/ForecastedWasteCard";
import RescueRecipeCard from "@/components/screens/(authenticated)/WasteScreen/RescueRecipeCard";
import CategoryPieChart from "@/components/screens/(authenticated)/WasteScreen/CategoryPieChart";
import StreakCard from "@/components/screens/(authenticated)/WasteScreen/StreakCard";
import WasteLogSection from "@/components/screens/(authenticated)/WasteScreen/WasteLogSection";
import WeeklyWasteTrendGraph from "@/components/screens/(authenticated)/WasteScreen/WeeklyWasteTrendGraph";
import ImpactCard from "@/components/screens/(authenticated)/WasteScreen/ImpactCard";
import InsightCard from "@/components/screens/(authenticated)/WasteScreen/InsightCard";
// import PremiumUpgradeCard from "@/components/screens/(authenticated)/WasteScreen/PremiumUpgradeCard";

export default function WasteScreen() {
  const { colors } = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: tabBarHeight - 30,
      }}
    >
      <ReusableHeader title="Waste Tracker" showAvatar={false} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 32,
          gap: 20,
        }}
      >
        {/* Top Summary Cards */}
        <WasteSummaryCard itemCount={10} estimatedLoss={100} />
        <ForecastedWasteCard forecastedItems={3} />
        <RescueRecipeCard />

        {/* Visual Analytics */}
        <CategoryPieChart />
        <WeeklyWasteTrendGraph />
        <StreakCard currentStreak={4} />

        {/* History and Impact */}
        <WasteLogSection />
        <ImpactCard savedEmissions={1.2} savedWater={25} />

        {/* Final Insight */}
        <InsightCard />

        {/* Future Premium Option */}
        {/* <PremiumUpgradeCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
