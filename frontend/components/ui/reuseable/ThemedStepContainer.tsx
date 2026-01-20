import { ReactNode } from "react";
import { useRouter } from "expo-router";
import { YStack, Text, Button, XStack, View } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { ChevronLeft, ArrowRight } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type StepContainerProps = {
  title: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  showBack?: boolean;
  disableNext?: boolean;
  description?: string;
  nextLabel?: string;
  backLabel?: string;
  footer?: ReactNode;
};

export default function StepContainer({
  title,
  step,
  totalSteps,
  children,
  onNext,
  onBack,
  showBack = true,
  disableNext = false,
  description,
  nextLabel = "Continue",
  backLabel = "Back",
  footer,
}: StepContainerProps) {
  const router = useRouter();
  const { colors, fonts } = useThemeColors();
  const insets = useSafeAreaInsets();
  
  const progress = (step / totalSteps) * 100;

  return (
    <YStack flex={1} backgroundColor={colors.background}>
      {/* 1. Header & Progress Bar */}
      <YStack p="$4" space="$3">
        <XStack jc="space-between" ai="center">
          {showBack ? (
            <Button
              size="$3"
              circular
              icon={<ChevronLeft size={20} color={colors.text} />}
              backgroundColor={colors.surface}
              onPress={onBack ?? (() => router.back())}
              pressStyle={{ scale: 0.9 }}
            />
          ) : (
            <View w={40} />
          )}
          
          <YStack ai="center">
            <Text fontSize={12} fow="800" color={colors.textSecondary} tt="uppercase" letterSpacing={1}>
              Step {step} of {totalSteps}
            </Text>
          </YStack>
          
          <View w={40} />
        </XStack>

        <View h={6} w="100%" bc={colors.surface} br={10} ov="hidden">
          <View 
            h="100%" 
            w={`${progress}%`} 
            bc={colors.primary} 
            br={10} 
            animation="slow"
          />
        </View>
      </YStack>

      {/* 2. Content Area */}
      <YStack flex={1} px="$4">
        <YStack space="$2" mb="$5">
          <Text 
            fontSize={28} 
            fow="900" 
            color={colors.text} 
            lineHeight={34} 
            fontFamily={fonts.bold?.fontFamily}
          >
            {title}
          </Text>
          {description ? (
            <Text fontSize={16} color={colors.textSecondary} lineHeight={22}>
              {description}
            </Text>
          ) : null}
        </YStack>

        {children}
      </YStack>

      <YStack 
        paddingHorizontal="$4" 
        paddingTop="$2"
        paddingBottom={0} // Force zero padding at bottom
        backgroundColor={colors.background}
      >
        {footer ? footer : (
          <XStack space="$3">
            {showBack ? (
              <Button
                f={1}
                size="$5"
                br="$6"
                backgroundColor={colors.surface}
                onPress={onBack ?? (() => router.back())}
              >
                <Text fow="700" color={colors.text}>{backLabel}</Text>
              </Button>
            ) : null}
            
            <Button
              f={2}
              size="$5"
              br="$6"
              backgroundColor={disableNext ? colors.surface : colors.primary}
              onPress={onNext}
              disabled={disableNext}
              iconAfter={onNext ? <ArrowRight size={18} color={disableNext ? colors.textSecondary : "white"} /> : null}
              opacity={disableNext ? 0.6 : 1}
              pressStyle={{ scale: 0.98 }}
              animation="medium"
            >
              <Text fow="800" color={disableNext ? colors.textSecondary : "white"}>
                {nextLabel}
              </Text>
            </Button>
          </XStack>
        )}
      </YStack>
    </YStack>
  );
}