import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";

type UseCameraScannerOptions = {
  detectionDuration?: number; // default: 2500ms
  onError?: (error: Error) => void;
};

export function useCameraScanner(options?: UseCameraScannerOptions) {
  const {
    detectionDuration = 2500,
    onError = (err) => console.error("CameraScanner Error:", err),
  } = options || {};

  const cameraRef = useRef<Camera | null>(null);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const detectTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCapture = async (onSuccess?: (uri: string) => void) => {
    try {
      if (!cameraRef.current) throw new Error("Camera not available");
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedUri(photo.uri);
      onSuccess?.(photo.uri);
    } catch (error) {
      onError(error as Error);
    }
  };

  const handleRetake = () => {
    setCapturedUri(null);
    setIsDetecting(false);
    if (detectTimeout.current) {
      clearTimeout(detectTimeout.current);
    }
  };

  const handleDetect = () => {
    setIsDetecting(true);
    detectTimeout.current = setTimeout(() => {
      setIsDetecting(false);
    }, detectionDuration);
  };

  const reset = () => {
    setCapturedUri(null);
    setIsDetecting(false);
    setIsFullScreen(false);
    if (detectTimeout.current) {
      clearTimeout(detectTimeout.current);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (detectTimeout.current) {
        clearTimeout(detectTimeout.current);
      }
    };
  }, []);

  return {
    cameraRef,
    capturedUri,
    isDetecting,
    isFullScreen,
    setIsFullScreen,
    handleCapture,
    handleRetake,
    handleDetect,
    reset,
  };
}
