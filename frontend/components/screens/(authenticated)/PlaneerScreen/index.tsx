import React, { useState, useMemo } from "react";
import { YStack, Button } from "tamagui";
import { 
  ShoppingBasket, 
  CalendarDays, 
  Plus, 
  Share2, 
  Sparkles 
} from "@tamagui/lucide-icons";
import { AnimatePresence, MotiView } from "moti";

// Hooks
import { useThemeColors } from "@/hooks/theme/useThemeColors";

// Screen Views
import { GroceryListView } from "@/components/screens/(authenticated)/PlaneerScreen/GroceryListView";
import { MealPlanView } from "@/components/screens/(authenticated)/PlaneerScreen/MealPlanView";
import { SceneBackground } from "@/components/ui/reuseable/ThemedSceneBackground";
import { AppHeader } from "@/components/ui/reuseable/ThemedHeader";
import { TabSwitcher } from "@/components/ui/reuseable/ThemedTabSwitcher";
import { SmartCard } from "@/components/ui/reuseable/ThemedSmartcard";

export default function PlannerScreen() {
  const [activeTab, setActiveTab] = useState<"grocery" | "meal">("grocery");
  const { colors } = useThemeColors();

  // 1. Tab Options Configuration
  const tabOptions = [
    { key: "grocery", label: "Grocery", Icon: ShoppingBasket },
    { key: "meal", label: "Meal Plan", Icon: CalendarDays },
  ];

  // 2. Dynamic Header Content based on Tab
  const isGrocery = activeTab === "grocery";
  
  const headerData = useMemo(() => ({
    title: isGrocery ? "Grocery List" : "Meal Planner",
    subtitle: isGrocery ? "Manage Inventory" : "Weekly Schedule",
  }), [isGrocery]);

  // 3. Header Buttons (Dynamic Actions)
  const HeaderButtons = () => (
    <>
      <Button
        circular
        size="$4"
        bg="$background"
        bw={1}
        boc="$border"
        icon={<Share2 size={18} color={colors.text} />}
        pressStyle={{ scale: 0.95 }}
      />
      <Button
        circular
        size="$4"
        bg={colors.primary}
        icon={<Plus size={22} color="white" />}
        elevation="$2"
        pressStyle={{ scale: 0.95, opacity: 0.9 }}
      />
    </>
  );

  return (
    <YStack f={1} bg={colors.background}>
      {/* Background Decorative Glow */}
      <SceneBackground />

      {/* Reusable Dynamic Header */}
      <AppHeader
        title={headerData.title}
        subtitle={headerData.subtitle}
        rightElement={<HeaderButtons />}
      />

      {/* Reusable Sliding Tab Switcher */}
      <TabSwitcher
        options={tabOptions}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Content Area with Animation */}
      <YStack f={1} px="$5" pt="$5">
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={activeTab}
            from={{ opacity: 0, scale: 0.98, translateY: 10 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 0.98, translateY: -10 }}
            transition={{ type: "timing", duration: 250 }}
            style={{ flex: 1 }}
          >
            {/* Reusable Insight Card */}
            <SmartCard
              title="Smart Suggestion"
              description={isGrocery ? "You're low on Spinach!" : "Next meal: Grilled Chicken at 8 PM"}
              Icon={Sparkles}
              onPress={() => console.log("Suggestion clicked")}
            />

            {isGrocery ? <GroceryListView /> : <MealPlanView />}
          </MotiView>
        </AnimatePresence>
      </YStack>
    </YStack>
  );
}