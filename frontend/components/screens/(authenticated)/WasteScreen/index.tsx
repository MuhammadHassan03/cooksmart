import React, { useState, useCallback } from "react";
import { ScrollView, XStack, Button, Text, YStack, View, H4 } from "tamagui";
import { RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Leaf, Share2, ChevronLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";

// Components Imports
import WasteSummaryCard from "@/components/screens/(authenticated)/WasteScreen/WasteSummaryCard";
import CategoryWasteList from "@/components/screens/(authenticated)/WasteScreen/CategoryPieChart";
import WasteLogSection from "@/components/screens/(authenticated)/WasteScreen/WasteLogSection";
import WeeklyWasteTrendGraph from "@/components/screens/(authenticated)/WasteScreen/WeeklyWasteTrendGraph";
import ImpactCard from "@/components/screens/(authenticated)/WasteScreen/ImpactCard";

export default function WasteScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();
  const insets = useSafeAreaInsets(); // ✅ FIX: Bottom height issue solved
  
  const [activeFilter, setActiveFilter] = useState("Month");
  const [refreshing, setRefreshing] = useState(false);
  const hasData = true;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <View f={1} bg="$background" style={{ paddingTop: insets.top }}>
      
      {/* ✅ 1. Professional Header with Back Button */}
      <XStack jc="space-between" ai="center" px="$4" py="$2">
        <XStack ai="center" gap="$3">
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={{ padding: 8, marginLeft: -8 }}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <YStack>
            <H4 fontWeight="900" color={colors.text} lineHeight={28}>Insights</H4>
            <Text fontSize="$2" color={colors.textSecondary}>Waste Analytics</Text>
          </YStack>
        </XStack>

        <Button 
          size="$3" 
          circular 
          icon={<Share2 size={18} color={colors.primary} />} 
          backgroundColor={colors.primary + "10"}
          chromeless 
        />
      </XStack>

      {/* 2. Time Range Filter */}
      <XStack px="$4" py="$3" gap="$2">
        {["Week", "Month", "Year"].map((filter) => (
          <Button
            key={filter}
            f={1}
            size="$3"
            br="$10" // More modern rounded look
            backgroundColor={activeFilter === filter ? colors.primary : colors.surface}
            onPress={() => setActiveFilter(filter)}
            borderWidth={1}
            borderColor={activeFilter === filter ? colors.primary : colors.border}
          >
            <Text 
              color={activeFilter === filter ? "white" : colors.textSecondary} 
              fontWeight="700"
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
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          // ✅ FIX: Custom padding instead of tabBarHeight
          paddingBottom: insets.bottom + 40, 
          gap: 20,
        }}
      >
        {!hasData ? (
          <YStack ai="center" jc="center" py="$10" gap="$4" mt="$10">
            <View bg={colors.primary + "15"} p="$6" br="$10">
              <Leaf size={50} color={colors.primary} />
            </View>
            <Text fontSize="$6" fontWeight="800" color={colors.text}>No waste logged yet</Text>
            <Text textAlign="center" color={colors.textSecondary} px="$6">
              Your kitchen is looking green! Any food you throw away will show up here.
            </Text>
          </YStack>
        ) : (
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
    </View>
  );
}