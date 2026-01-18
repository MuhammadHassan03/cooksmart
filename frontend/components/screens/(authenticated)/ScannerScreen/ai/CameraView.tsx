import React, { useEffect, useMemo } from "react"
import { CameraView, CameraType } from "expo-camera"
import { Button, XStack, YStack, Text, View, Circle } from "tamagui"
import { Maximize, Minimize } from "@tamagui/lucide-icons"
import { useThemeColors } from "@/hooks/theme/useThemeColors"
import { useWindowDimensions, StyleSheet, ViewStyle } from "react-native"
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  withSequence,
  Easing 
} from "react-native-reanimated"

interface CameraViewProps {
  isFullScreen: boolean
  onToggle: () => void
  facing?: CameraType
  cameraRef?: React.RefObject<any>
}

function FrameCorners({ color }: { color: any }) {
  const s = 30; const t = 4;
  return (
    <>
      <View position="absolute" top={0} left={0} width={s} height={s} borderTopWidth={t} borderLeftWidth={t} borderColor={color} borderTopLeftRadius={20} />
      <View position="absolute" top={0} right={0} width={s} height={s} borderTopWidth={t} borderRightWidth={t} borderColor={color} borderTopRightRadius={20} />
      <View position="absolute" bottom={0} left={0} width={s} height={s} borderBottomWidth={t} borderLeftWidth={t} borderColor={color} borderBottomLeftRadius={20} />
      <View position="absolute" bottom={0} right={0} width={s} height={s} borderBottomWidth={t} borderRightWidth={t} borderColor={color} borderBottomRightRadius={20} />
    </>
  )
}

const FRAME_SIZE = 280

export function CustomCameraView({ isFullScreen, onToggle, facing = "back", cameraRef }: CameraViewProps) {
  const { colors, isLight } = useThemeColors()
  const { height: SCREEN_HEIGHT } = useWindowDimensions()

  const translateY = useSharedValue(0)
  const pulseOpacity = useSharedValue(0.4)

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(FRAME_SIZE - 10, { duration: 2000, easing: Easing.inOut(Easing.sin) }), 
      -1, 
      true
    )
    pulseOpacity.value = withRepeat(
      withSequence(withTiming(1, { duration: 800 }), withTiming(0.4, { duration: 800 })), 
      -1, 
      true
    )
  }, [])

  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value
  }))

  const maskColor = useMemo(() => 
    isLight ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)", 
  [isLight])

  return (
    <YStack 
      width="100%" 
      height={isFullScreen ? SCREEN_HEIGHT : 450} 
      overflow="hidden" 
      borderRadius={isFullScreen ? 0 : 30} 
      backgroundColor="black"
      animation="bouncy"
    >
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing} />

      <View 
        style={StyleSheet.absoluteFill} 
        pointerEvents="none" 
        justifyContent="center" 
        alignItems="center"
      >
        <View 
          style={StyleSheet.absoluteFill} 
          backgroundColor={maskColor as any} 
          opacity={0.6} 
        />
        
        <View width={FRAME_SIZE} height={FRAME_SIZE} position="relative">
          <FrameCorners color={colors.primary} />
          
          <Animated.View style={[{ width: '100%' }, lineStyle]}>
            <View 
              height={3} 
              width="100%" 
              backgroundColor={colors.primary} 
              style={{ 
                shadowColor: String(colors.primary), 
                shadowRadius: 15, 
                shadowOpacity: 1, 
                elevation: 10 
              } as ViewStyle} 
            />
          </Animated.View>
        </View>

        {/* <XStack 
          marginTop="$6" 
          paddingHorizontal="$4" 
          paddingVertical="$2.5" 
          borderRadius="$10" 
          backgroundColor={isLight ? "rgba(255,255,255,0.85)" : "rgba(30,30,35,0.85)"} 
          alignItems="center" 
          space="$2"
          borderWidth={1}
          borderColor={isLight ? "$gray5" : "$gray10"}
        >
          <Animated.View style={pulseStyle}>
             <Circle size={8} backgroundColor={colors.primary} />
          </Animated.View>
          
          <Text 
            color={colors.text} 
            fontWeight="700" 
            fontSize={13} 
            letterSpacing={1}
          >
            AI DETECTING...
          </Text>
        </XStack> */}
      </View>

      <XStack position="absolute" top={isFullScreen ? 60 : 20} right={20}>
        <Button
          icon={isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
          circular
          size="$4"
          backgroundColor={colors.surface}
          onPress={onToggle}
          elevate
          color={colors.text}
          borderWidth={1}
          borderColor={colors.border}
        />
      </XStack>
    </YStack>
  )
}