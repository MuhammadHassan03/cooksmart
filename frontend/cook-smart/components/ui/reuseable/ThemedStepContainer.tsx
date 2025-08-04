import { ReactNode } from "react";
import { useRouter } from "expo-router";
import { YStack, Text, Button } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

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
  nextLabel = "Next",
  backLabel = "Back",
  footer,
}: StepContainerProps) {
  const router = useRouter();
  const { colors, fonts } = useThemeColors();

  return (
    <YStack flex={1} padding="$4" justifyContent="space-between" backgroundColor={colors.background}>
      <YStack space="$1">
        <Text fontSize={24} fontFamily={fonts.bold.fontFamily} color={colors.text}>
          {title}
        </Text>
        <Text fontSize={14} color={colors.textSecondary}>
          Step {step} of {totalSteps}
        </Text>
        {description && (
          <Text fontSize={14} color={colors.textSecondary}>
            {description}
          </Text>
        )}
      </YStack>

      <YStack flex={1} paddingTop="$4">
        {children}
      </YStack>

      {footer ?? (
        <YStack space="$2">
          {onNext && (
            <Button
              backgroundColor={colors.primary}
              onPress={onNext}
              disabled={disableNext}
            >
              <Text color={colors.background}>{nextLabel}</Text>
            </Button>
          )}
          {showBack && (
            <Button
              backgroundColor={colors.card}
              onPress={onBack ?? (() => router.back())}
            >
              <Text color={colors.text}>{backLabel}</Text>
            </Button>
          )}
        </YStack>
      )}
    </YStack>
  );
}
