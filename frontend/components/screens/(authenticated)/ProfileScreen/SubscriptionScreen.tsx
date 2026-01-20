import React, { memo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, XStack, Text, Button, Card, ScrollView, View, Separator } from "tamagui";
import { CheckCircle2, Zap, Star, ShieldCheck, Crown } from "@tamagui/lucide-icons";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

const features = [
  "Unlimited AI Recipe Scanning",
  "Advanced Waste Analytics",
  "Priority Meal Planning",
  "Exclusive Recipe Marketplace Access",
  "Ad-free Experience",
];

export default function SubscriptionScreen() {
  const { colors, fonts } = useThemeColors();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ReusableHeader title="Premium" showAvatar={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$4" gap="$6" alignItems="center">
          
          {/* Header Section */}
          <YStack ai="center" gap="$2" marginTop="$2">
            <View backgroundColor="$gold" p="$2" br="$10">
               <Crown size={32} color="black" />
            </View>
            <Text fontSize={28} fontWeight="900" color={colors.text} textAlign="center">
              Unlock the Full Potential
            </Text>
            <Text fontSize={16} color={colors.textSecondary} textAlign="center" px="$4">
              Join thousands of chefs reducing waste and eating smarter.
            </Text>
          </YStack>

          {/* Plan Selection */}
          <XStack backgroundColor={colors.surface} p="$1.5" br="$10" bw={1} boc={colors.border}>
            <PlanToggle 
              active={selectedPlan === "monthly"} 
              label="Monthly" 
              onPress={() => setSelectedPlan("monthly")} 
            />
            <PlanToggle 
              active={selectedPlan === "yearly"} 
              label="Yearly" 
              onPress={() => setSelectedPlan("yearly")} 
              isBestValue
            />
          </XStack>

          {/* Pricing Card */}
          <Card 
            width="100%" 
            p="$6" 
            br="$8" 
            bw={2} 
            boc="$gold" 
            backgroundColor={colors.card}
            elevate
          >
            <YStack ai="center" gap="$2">
              <Text fontWeight="800" color={colors.textSecondary} tt="uppercase" lS={1}>
                {selectedPlan === "yearly" ? "Annual Pro" : "Monthly Pro"}
              </Text>
              <XStack ai="flex-end" gap="$1">
                <Text fontSize={48} fontWeight="900" color={colors.text}>
                  {selectedPlan === "yearly" ? "$49.99" : "$5.99"}
                </Text>
                <Text fontSize={18} color={colors.textSecondary} mb="$2">
                  /{selectedPlan === "yearly" ? "yr" : "mo"}
                </Text>
              </XStack>
              {selectedPlan === "yearly" && (
                <View bc="$gold" px="$3" py="$1" br="$4">
                  <Text fontSize={12} fontWeight="900" color="black">SAVE 30%</Text>
                </View>
              )}
            </YStack>

            <Separator my="$6" boc={colors.border} />

            {/* Features List */}
            <YStack gap="$4">
              {features.map((f) => (
                <XStack key={f} ai="center" gap="$3">
                  <CheckCircle2 size={20} color={colors.primary} />
                  <Text fontSize={15} color={colors.text} fontWeight="500">{f}</Text>
                </XStack>
              ))}
            </YStack>

            <Button
              mt="$8"
              size="$5"
              bc={colors.primary}
              pressStyle={{ scale: 0.97 }}
              onPress={() => console.log("Subscribe")}
            >
              <Text color="white" fontWeight="800" fontSize={16}>Start My Premium Journey</Text>
            </Button>
            
            <Text textAlign="center" mt="$4" fontSize={12} color={colors.textSecondary}>
              Cancel anytime. Secure payment via App Store.
            </Text>
          </Card>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper Component for Toggle
const PlanToggle = ({ active, label, onPress, isBestValue }: any) => {
  const { colors } = useThemeColors();
  return (
    <Button
      flex={1}
      bc={active ? colors.card : "transparent"}
      br="$10"
      bw={0}
      h="$3.5"
      onPress={onPress}
      pressStyle={{ opacity: 0.8 }}
    >
      <Text fontWeight={active ? "800" : "500"} color={active ? colors.text : colors.textSecondary}>
        {label}
      </Text>
    </Button>
  );
};