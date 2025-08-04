import {
  Button,
  Spinner,
  XStack,
  YStack,
  Progress,
  Text,
  Card,
  useTheme,
} from "tamagui"
import { MotiView, AnimatePresence } from "moti"
import { useScanContext } from "@/context/ScanContext"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { AlertTriangle } from "@tamagui/lucide-icons"

interface DetectionControlsProps {
  capturedUri: string | null
  isDetecting: boolean
  onRetake: () => void
  onCapture: () => void
  onDetect: () => void
  onUpsellTrigger?: () => void
}

export function DetectionControls({
  capturedUri,
  isDetecting,
  onRetake,
  onCapture,
  onDetect,
  onUpsellTrigger,
}: DetectionControlsProps) {
  const { scansLeft } = useScanContext()
  const { colors } = useThemeColors()

  const reachedLimit = scansLeft <= 0

  const sharedCardStyles = {
    padding: "$4",
    borderRadius: "$6",
    backgroundColor: colors.surface + "CC",
    borderWidth: 1,
    borderColor: colors.border,
    elevate: true,
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {capturedUri ? (
        <MotiView
          key="detected"
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 20 }}
          transition={{ type: "timing", duration: 300 }}
        >
          <Card {...sharedCardStyles} width={320} alignItems="center">
            {isDetecting ? (
              <YStack space="$3" alignItems="center">
                <Spinner size="large" color={colors.primary} />
                <Progress value={75} max={100} size="$2" width="100%">
                  <Progress.Indicator animation={'medium'}  />
                </Progress>
                <Text fontSize={13} color={colors.textSecondary}>
                  Analyzing ingredients...
                </Text>
              </YStack>
            ) : (
              <XStack space="$3" width="100%">
                <Button
                  onPress={onRetake}
                  size="$4"
                  flex={1}
                  borderRadius="$5"
                  fontWeight="500"
                  color={colors.background}
                >
                  Retake
                </Button>
                <Button
                  onPress={() => {
                    if (reachedLimit) {
                      onUpsellTrigger?.()
                    } else {
                      onDetect()
                    }
                  }}
                  backgroundColor={
                    reachedLimit ? colors.border : colors.primary
                  }
                  color={colors.background}
                  size="$4"
                  flex={1}
                  borderRadius="$5"
                  elevate
                  fontWeight="600"
                  disabled={reachedLimit}
                >
                  {reachedLimit ? "Upgrade" : "Detect"}
                </Button>
              </XStack>
            )}
          </Card>
        </MotiView>
      ) : (
        <MotiView
          key="capture"
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "timing", duration: 300 }}
        >
          <Card
            {...sharedCardStyles}
            width={300}
            alignItems="center"
            space="$3"
          >
            <Button
              backgroundColor={
                colors.text
              }
              color={colors.background}
              size="$6"
              onPress={() => {
                if (reachedLimit) {
                  onUpsellTrigger?.()
                } else {
                  onCapture()
                }
              }}
              borderRadius="$10"
              width={'100%'}
              elevate
              fontWeight="600"
            >
              {reachedLimit ? "Upgrade to Scan" : "Capture"}
            </Button>

            <Text
              fontSize={12}
              color={scansLeft > 0 ? colors.textSecondary : colors.warning}
              textAlign="center"
            >
              {scansLeft > 0
                ? `${scansLeft} scans left today`
                : "You’ve reached your daily scan limit"}
            </Text>

            {reachedLimit && (
              <XStack alignItems="center" space="$2">
                <AlertTriangle size={14} color={colors.warning} />
                <Text fontSize={11} color={colors.warning}>
                  Unlock unlimited scans with Premium
                </Text>
              </XStack>
            )}
          </Card>
        </MotiView>
      )}
    </AnimatePresence>
  )
}
