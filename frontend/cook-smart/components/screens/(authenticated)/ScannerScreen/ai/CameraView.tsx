import { CameraView, CameraType } from "expo-camera"
import { Button, XStack, YStack, Text, View } from "tamagui"
import { Maximize, Minimize } from "@tamagui/lucide-icons"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { useWindowDimensions, StyleSheet } from "react-native"

interface CameraViewProps {
  isFullScreen: boolean
  onToggle: () => void
  facing?: CameraType
  cameraRef?: React.RefObject<any>
}

export function CustomCameraView({
  isFullScreen,
  onToggle,
  facing = "back",
  cameraRef,
}: CameraViewProps) {
  const { colors } = useThemeColors()
  const { height, width } = useWindowDimensions()

  const viewHeight = isFullScreen ? height : height * 0.55

  return (
    <YStack width="100%" overflow="hidden" borderRadius="$4" position="relative">
      {/* Camera View */}
      <YStack
        animation="medium"
        animateOnly={["height"]}
        height={viewHeight}
        width="100%"
      >
        <CameraView
          ref={cameraRef}
          style={{ flex: 1, width: "100%" }}
          facing={facing}
        />

        {/* Overlay with circle cutout */}
        <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, styles.overlay]}>
          <View style={styles.maskContainer}>
            <View style={styles.topMask} />
            <View style={styles.middleRow}>
              <View style={styles.sideMask} />
              <View style={styles.transparentCircle} />
              <View style={styles.sideMask} />
            </View>
            <View style={styles.bottomMask} />
          </View>
        </View>

        {/* Tip Text */}
        <YStack
          position="absolute"
          bottom="$4"
          width="100%"
          alignItems="center"
          pointerEvents="none"
        >
          <Text fontSize={13} color={colors.textSecondary} fontWeight="500">
            Align ingredients within the circle
          </Text>
        </YStack>
      </YStack>

      {/* Toggle Button */}
      <XStack position="absolute" top="$4" right="$4" zIndex={10}>
        <Button
          icon={isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
          circular
          size="$3"
          backgroundColor={colors.surface}
          onPress={onToggle}
          elevate
          color={colors.text}
        />
      </XStack>
    </YStack>
  )
}

const CIRCLE_SIZE = 230

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  maskContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  topMask: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
  },
  middleRow: {
    flexDirection: "row",
  },
  sideMask: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: (1000 - CIRCLE_SIZE) / 2,
    height: CIRCLE_SIZE,
  },
  transparentCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "transparent",
  },
  bottomMask: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
  },
})
