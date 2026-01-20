import { useState, useCallback } from "react";
import { ScrollView, XStack, Button, Text, YStack, View } from "tamagui";
import { RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Leaf, Share2 } from "@tamagui/lucide-icons";

// Components Imports
import WasteSummaryCard from "@/components/screens/(authenticated)/WasteScreen/WasteSummaryCard";
import CategoryWasteList from "@/components/screens/(authenticated)/WasteScreen/CategoryPieChart"; // Naam update kiya for clarity
import WasteLogSection from "@/components/screens/(authenticated)/WasteScreen/WasteLogSection";
import WeeklyWasteTrendGraph from "@/components/screens/(authenticated)/WasteScreen/WeeklyWasteTrendGraph";
import ImpactCard from "@/components/screens/(authenticated)/WasteScreen/ImpactCard";

export default function WasteScreen() {
  const { colors } = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();
  
  // 1. States
  const [activeFilter, setActiveFilter] = useState("Month");
  const [refreshing, setRefreshing] = useState(false);
  const hasData = true; // Backend integration ke waqt isay dynamic karenge

  // 2. Pull-to-Refresh Logic
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API fetch (2 seconds delay)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      
      {/* 3. Professional Header */}
      <XStack jc="space-between" ai="center" px="$4" py="$2">
        <YStack>
          <Text fontSize="$7" fontWeight="900" color={colors.text}>Insights</Text>
          <Text fontSize="$2" color={colors.textSecondary}>Track your kitchen waste</Text>
        </YStack>
        <Button 
          size="$3" 
          circular 
          icon={<Share2 size={18} color={colors.primary} />} 
          backgroundColor={colors.primary + "10"}
          chromeless 
        />
      </XStack>

      {/* 4. Time Range Filter (Sticky-ready) */}
      <XStack px="$4" py="$3" gap="$2" backgroundColor={colors.background}>
        {["Week", "Month", "Year"].map((filter) => (
          <Button
            key={filter}
            f={1} // Buttons take equal width
            size="$3"
            borderRadius="$4"
            backgroundColor={activeFilter === filter ? colors.primary : colors.surface}
            onPress={() => setActiveFilter(filter)}
            borderWidth={1}
            borderColor={activeFilter === filter ? colors.primary : colors.border}
          >
            <Text 
              color={activeFilter === filter ? "white" : colors.textSecondary} 
              fontWeight="700"
              fontSize="$3"
            >
              {filter}
            </Text>
          </Button>
        ))}
      </XStack>

      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={colors.primary} 
            colors={[colors.primary]} // Android support
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: tabBarHeight + 20,
          gap: 20,
        }}
      >
        {!hasData ? (
          /* Empty State UI */
          <YStack ai="center" jc="center" py="$10" gap="$4" mt="$10">
            <YStack backgroundColor={colors.primary + "15"} p="$6" borderRadius="$10">
              <Leaf size={50} color={colors.primary} />
            </YStack>
            <Text fontSize="$6" fontWeight="800" color={colors.text}>No waste logged yet</Text>
            <Text textAlign="center" color={colors.textSecondary} px="$6" lineHeight={20}>
              Your kitchen is looking green! Any food you throw away will show up here as insights.
            </Text>
          </YStack>
        ) : (
          /* Main Content */
          <>
            <WasteSummaryCard 
              itemCount={10} 
              estimatedLoss={100.50} 
              label={`This ${activeFilter}'s Waste`} 
            />

            <CategoryWasteList />
            
            <WeeklyWasteTrendGraph />
            
            <ImpactCard savedEmissions={1.2} savedWater={25} />

            <WasteLogSection />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}