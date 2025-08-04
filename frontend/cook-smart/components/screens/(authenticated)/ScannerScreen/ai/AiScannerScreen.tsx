import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Spinner, Text, Image } from "tamagui";

import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useCameraScanner } from "@/hooks/(authenticated)/useCameraScanner";
import { useScanContext } from "@/context/ScanContext";

import { CustomCameraView } from "@/components/screens/(authenticated)/ScannerScreen/ai/CameraView";
import { ScanHeader } from "@/components/screens/(authenticated)/ScannerScreen/ai/ScanHeader";
import { DetectionControls } from "@/components/screens/(authenticated)/ScannerScreen/ai/DetectionControls";
import { UpsellModal } from "@/components/screens/(authenticated)/ScannerScreen/ai/UpsellSheet";

export default function AIScannerScreen() {
  const { colors, fonts } = useThemeColors();

  const {
    cameraRef,
    capturedUri,
    isDetecting,
    isFullScreen,
    setIsFullScreen,
    handleCapture,
    handleRetake,
    handleDetect,
  } = useCameraScanner();

  const {
    scansLeft,
    showUpsell,
    setShowUpsell,
    decrementScan,
    cameraPermissionGranted,
    loadingPermission,
  } = useScanContext();

  const onCapture = async () => {
    if (scansLeft <= 0) return;
    await handleCapture(() => {
      decrementScan();
    });
  };

  if (loadingPermission) return <Spinner />;
  if (cameraPermissionGranted === false) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color={colors.text}>Camera permission not granted</Text>
      </YStack>
    );
  }

  const reachedLimit = scansLeft <= 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack flex={1}>
        {capturedUri ? (
          <YStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            padding="$4"
          >
            <Image
              source={{ uri: capturedUri }}
              width="100%"
              height="100%"
              borderRadius="$4"
              resizeMode="cover"
            />
          </YStack>
        ) : (
          <>
            <CustomCameraView
              isFullScreen={isFullScreen}
              onToggle={() => setIsFullScreen(!isFullScreen)}
              cameraRef={cameraRef}
            />
            {!isFullScreen && (
              <ScanHeader scansLeft={scansLeft} fonts={fonts} />
            )}
          </>
        )}

        <YStack
          position="absolute"
          bottom="$6"
          alignSelf="center"
          alignItems="center"
          space="$3"
        >
          <DetectionControls
            capturedUri={capturedUri}
            isDetecting={isDetecting}
            onRetake={handleRetake}
            onCapture={onCapture}
            onDetect={handleDetect}
            onUpsellTrigger={() => setShowUpsell(true)}
          />
        </YStack>
      </YStack>
      <UpsellModal open={showUpsell} onClose={() => setShowUpsell(false)} />
    </SafeAreaView>
  );
}
