import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ScrollView, View, XStack } from "tamagui";
import UserCard from "./UserCard";
import DailyTipCard from "./DailyTipCard";
import PremiumPromptCard from "./PremiumPromptCard";
import SettingsSection from "./SettingsSection";
import AppFooter from "./AppFooter";
import { useProfile } from "@/hooks/(authenticated)/useProfile";
import { useState } from "react";
import { RefreshControl } from "react-native";

export default function ProfileScreen() {
  const { colors } = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();
  const { loading, refresh } = useProfile();
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View f={1} bc={colors.background}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await refresh();
              setRefreshing(false);
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingBottom: tabBarHeight + 20, 
          paddingHorizontal: 16,
          paddingTop: 60 
        }}
      >
        <UserCard />
        <XStack gap="$3" mb="$4">
          <DailyTipCard /> {/* Ab ye side-by-side ho sakte hain ya grid mein */}
        </XStack>
        <PremiumPromptCard />
        <SettingsSection />
        <AppFooter />
      </ScrollView>
    </View>
  );
}