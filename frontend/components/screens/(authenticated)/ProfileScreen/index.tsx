import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";
import UserCard from "@/components/screens/(authenticated)/ProfileScreen/UserCard";
import DailyTipCard from "@/components/screens/(authenticated)/ProfileScreen/DailyTipCard";
import PremiumPromptCard from "@/components/screens/(authenticated)/ProfileScreen/PremiumPromptCard";
import SettingsSection from "@/components/screens/(authenticated)/ProfileScreen/SettingsSection";
import AppFooter from "@/components/screens/(authenticated)/ProfileScreen/AppFooter";

export default function ProfileScreen() {
  const { colors } = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingBottom: tabBarHeight - 30 }}>
      <YStack flex={1}>
        <ReusableHeader title="My Profile" />
        <ScrollView
          flex={1}
          paddingBottom={"$13"}
          paddingHorizontal={"$4"}
          showsVerticalScrollIndicator={false}
          paddingTop={10}
        >
          <UserCard />
          <DailyTipCard />
          <PremiumPromptCard />
          <SettingsSection />
          <AppFooter />
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}
