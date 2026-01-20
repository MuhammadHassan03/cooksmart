import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ScrollView, View, XStack } from "tamagui";
import UserCard from "./UserCard";
import DailyTipCard from "./DailyTipCard";
import PremiumPromptCard from "./PremiumPromptCard";
import SettingsSection from "./SettingsSection";
import AppFooter from "./AppFooter";

export default function ProfileScreen() {
  const { colors } = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View f={1} bc={colors.background}>
      <ScrollView
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