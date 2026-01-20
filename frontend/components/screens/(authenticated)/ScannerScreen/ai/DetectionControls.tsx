import {
  Button,
  XStack,
  YStack,
  Text,
  View,
  Circle,
  LinearGradient, // Make sure you have @tamagui/linear-gradient installed
} from "tamagui";
import { MotiView, AnimatePresence } from "moti";
import { useScanContext } from "@/context/ScanContext";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Camera, RefreshCcw, Crown, Sparkles } from "@tamagui/lucide-icons";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface DetectionControlsProps {
  capturedUri: string | null;
  isDetecting: boolean;
  onRetake: () => void;
  onCapture: () => void;
  onDetect: () => void;
  onUpsellTrigger?: () => void;
}

export function DetectionControls({
  capturedUri,
  isDetecting,
  onRetake,
  onCapture,
  onDetect,
  onUpsellTrigger,
}: DetectionControlsProps) {
  const { scansLeft } = useScanContext();
  const { colors, isLight } = useThemeColors();
  const reachedLimit = scansLeft <= 0;

  return (
    <View
      position="absolute"
      bottom={30}
      width={SCREEN_WIDTH}
      alignItems="center"
      pointerEvents="box-none"
      zIndex={100}
    >
      <AnimatePresence exitBeforeEnter>
        {capturedUri ? (
          <MotiView
            key="after-capture"
            from={{ opacity: 0, scale: 0.9, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, translateY: 20 }}
            style={{ width: "92%", alignItems: "center" }}
          >
            {/* The Control Center Container */}
            <XStack
              backgroundColor={
                isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 30, 35, 0.85)"
              }
              padding="$3"
              borderRadius={100}
              gap="$3"
              alignItems="center"
              borderWidth={1}
              borderColor={
                isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"
              }
              shadowColor="#000"
              shadowRadius={20}
              shadowOpacity={0.15}
            >
              {isDetecting ? (
                <XStack
                  flex={1}
                  alignItems="center"
                  justifyContent="center"
                  gap="$3"
                  height={55}
                >
                  <MotiView
                    animate={{ rotate: "360deg" }}
                    transition={{ loop: true, duration: 2000, type: "timing" }}
                  >
                    <Sparkles size={20} color={colors.primary} />
                  </MotiView>
                  <Text
                    fontSize={14}
                    fontWeight="900"
                    color={colors.text}
                    letterSpacing={2}
                  >
                    IDENTIFYING...
                  </Text>
                </XStack>
              ) : (
                <>
                  {/* RETAKE - Transparent/Subtle style */}
                  <Button
                    onPress={onRetake}
                    height={55}
                    width={55}
                    circular
                    backgroundColor={
                      isLight ? "$gray4" : "rgba(255,255,255,0.05)"
                    }
                    borderWidth={1}
                    borderColor={isLight ? "$gray6" : "rgba(255,255,255,0.1)"}
                    icon={
                      <RefreshCcw size={20} color={colors.text} opacity={0.8} />
                    }
                    pressStyle={{ scale: 0.9, backgroundColor: "$gray5" }}
                  />

                  {/* ANALYZE - Premium High-Contrast Button */}
                  <Button
                    flex={1}
                    height={55}
                    borderRadius={100}
                    backgroundColor={
                      reachedLimit ? "$orange10" : colors.primary
                    }
                    onPress={() =>
                      reachedLimit ? onUpsellTrigger?.() : onDetect()
                    }
                    pressStyle={{ scale: 0.96, opacity: 0.9 }}
                    elevation={8}
                    shadowColor={reachedLimit ? "$orange8" : colors.primary}
                    shadowRadius={15}
                    shadowOpacity={0.3}
                  >
                    <XStack gap="$2" alignItems="center">
                      {reachedLimit ? (
                        <Crown size={18} color="white" fill="white" />
                      ) : (
                        <Sparkles size={18} color="white" fill="white" />
                      )}
                      <Text
                        color="white"
                        fontWeight="900"
                        fontSize={15}
                        letterSpacing={0.5}
                      >
                        {reachedLimit ? "GET FULL ACCESS" : "START ANALYSIS"}
                      </Text>
                    </XStack>
                  </Button>
                </>
              )}
            </XStack>
          </MotiView>
        ) : (
          /* SHUTTER UI */
          <MotiView
            key="before-capture"
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <YStack alignItems="center" gap="$4">
              {/* Credit Badge */}

              <View
                width={90}
                height={90}
                alignItems="center"
                justifyContent="center"
              >
                <MotiView
                  from={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ loop: true, duration: 2000, type: "timing" }}
                  style={{
                    position: "absolute",
                    width: 75,
                    height: 75,
                    borderRadius: 40,
                    borderWidth: 1,
                    borderColor: "white",
                  }}
                />
                <Button
                  onPress={() =>
                    reachedLimit ? onUpsellTrigger?.() : onCapture()
                  }
                  width={75}
                  height={75}
                  borderRadius={40}
                  backgroundColor="white"
                  pressStyle={{ scale: 0.88 }}
                  elevation={15}
                  padding={0}
                >
                  <Circle
                    size={64}
                    borderWidth={1.5}
                    borderColor="rgba(0,0,0,0.05)"
                  >
                    <Camera size={30} color="black" />
                  </Circle>
                </Button>
              </View>
            </YStack>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}
