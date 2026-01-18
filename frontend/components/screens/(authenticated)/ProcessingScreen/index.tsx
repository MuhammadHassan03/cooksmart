import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  YStack,
  Text,
  Spinner,
  H3,
  Card,
  Paragraph,
  XStack,
  AnimatePresence,
  View,
} from "tamagui";
import { inventoryQueries } from "@/database/queries/inventory.queries";
import api from "@/services/api";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import {
  CheckCircle2,
  Sparkles,
  BrainCircuit,
  Zap,
} from "@tamagui/lucide-icons";
import { MotiView, MotiText } from "moti";
import * as Haptics from "expo-haptics";
import { appName } from "@/constants";
import { useIngredientsManager } from "@/hooks/(authenticated)/useIngredientsManager";
import { apiQueue } from "@/utils/apiQueue";

export default function ProcessingScreen() {
  const { items } = useLocalSearchParams<{ items: string }>();
  const router = useRouter();
  const { colors } = useThemeColors();
  const [currentStep, setCurrentStep] = useState(0);
  const { saveToLocalPentry } = useIngredientsManager();
  const steps = [
    {
      label: "Syncing Ingredient Manager...", // Milestone: Phase 1 [cite: 114]
      icon: <Zap size={20} color={colors.primary} />,
    },
    {
      label: "Filtering Diets & Allergies...", // Feature 10: Diet & Allergy Filters
      icon: <BrainCircuit size={20} color={colors.primary} />,
    },
    {
      label: "Setting Expiration Tracker...", // Feature 4: Expiration Tracker
      icon: <Sparkles size={20} color={colors.primary} />,
    },
    {
      label: "Finalizing Personal Meal Plan...", // Feature 8: Meal Planning Calendar [cite: 59]
      icon: <CheckCircle2 size={20} color={colors.primary} />,
    },
  ];

  useEffect(() => {
    const processData = async () => {
      try {
        const ingredients = JSON.parse(items || "[]");
        // Step 1: Local Save
        setCurrentStep(0);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        saveToLocalPentry(ingredients);
        // Step 2: AI Logic
        setCurrentStep(1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // Backend call logic here
        const result = await apiQueue.enqueue(
          async () => {
            await api.post("/inventory/add", { items: ingredients });
          },
          {
            url: "/inventory/add",
            method: "POST",
            data: ingredients,
          },
        );
        setCurrentStep(2);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setCurrentStep(3);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        await new Promise((resolve) => setTimeout(resolve, 800));
        router.replace("/(tabs)");
      } catch (error) {
        console.error("Processing Error:", error);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        // router.back();
      }
    };
    processData();
  }, [items]);

  return (
    <YStack
      flex={1}
      jc="center"
      ai="center"
      bg={colors.background}
      px="$5"
      space="$6"
    >
      {/* Background Pulse Animation */}
      <View position="absolute" opacity={0.1}>
        <MotiView
          from={{ scale: 0.6, opacity: 0.2 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ loop: true, duration: 2000, type: "timing" }}
          style={{
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: colors.primary,
          }}
        />
      </View>

      <YStack ai="center" space="$4" width="100%">
        <MotiView
          from={{ scale: 0, rotate: "0deg" }}
          animate={{ scale: 1, rotate: "360deg" }}
          transition={{ type: "spring", damping: 15 }}
        >
          <View p="$4" br="$10" bg={colors.primary + "20"}>
            <Spinner size="large" color={colors.primary} />
          </View>
        </MotiView>

        <Card
          elevate
          bordered
          padding="$6"
          width="100%"
          br="$8"
          backgroundColor={colors.surface}
        >
          <YStack space="$4">
            <YStack ai="center" space="$1">
              <H3 textAlign="center" color={colors.text} fontWeight="800">
                {appName} AI
              </H3>
              <Text
                color={colors.primary}
                fontSize={12}
                fontWeight="bold"
                ls={2}
              >
                PROCESSING DATA
              </Text>
            </YStack>

            <Paragraph
              textAlign="center"
              color={colors.textSecondary}
              fontSize={15}
              lineHeight={22}
            >
              We are analyzing your ingredients to curate the best recipes
              tailored to your personal diet and allergy preferences.
            </Paragraph>

            <Separator opacity={0.2} />

            {/* Stepper Logic */}
            <YStack space="$3" py="$2">
              {steps.map((step, idx) => (
                <XStack
                  key={idx}
                  space="$3"
                  ai="center"
                  opacity={currentStep >= idx ? 1 : 0.3}
                >
                  <MotiView
                    animate={{
                      scale: currentStep === idx ? 1.2 : 1,
                      opacity: currentStep >= idx ? 1 : 0.5,
                    }}
                  >
                    {currentStep > idx ? (
                      <CheckCircle2
                        size={18}
                        color={colors.success || "$green10"}
                      />
                    ) : (
                      step.icon
                    )}
                  </MotiView>
                  <MotiText
                    style={{
                      color:
                        currentStep === idx
                          ? colors.text
                          : colors.textSecondary,
                      fontWeight: currentStep === idx ? "700" : "400",
                      fontSize: 14,
                    }}
                  >
                    {step.label}
                  </MotiText>
                </XStack>
              ))}
            </YStack>
          </YStack>
        </Card>
      </YStack>

      {/* Footer Info */}
      <MotiView
        from={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 500 }}
      >
        <YStack ai="center" space="$2">
          <XStack ai="center" space="$2">
            <Sparkles size={14} color={colors.textSecondary} />
            <Text color={colors.textSecondary} fontSize={12} textAlign="center">
              Reducing food waste with Smart Intelligence
            </Text>
          </XStack>
        </YStack>
      </MotiView>
    </YStack>
  );
}

// Helper to make it work
const Separator = ({ opacity }: { opacity: number }) => (
  <View height={1} width="100%" bg="$color" opacity={opacity} />
);
