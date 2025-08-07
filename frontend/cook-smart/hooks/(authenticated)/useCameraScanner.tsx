import { useEffect, useRef, useState } from "react";
import { Camera, useCameraPermissions } from "expo-camera";
import { apiQueue } from "@/utils/apiQueue";
import api from "@/services/api";

type UseCameraScannerOptions = {
  detectionDuration?: number;
  onError?: (error: Error) => void;
};

export function useCameraScanner(options?: UseCameraScannerOptions) {
  const {
    detectionDuration = 2500,
    onError = (err: Error) => console.error("CameraScanner Error:", err),
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
      return photo.uri;
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
    // detectTimeout.current = setTimeout(() => {
    //   setIsDetecting(false);
    // }, detectionDuration);
    processImage()
  };

  const reset = () => {
    setCapturedUri(null);
    setIsDetecting(false);
    setIsFullScreen(false);
    if (detectTimeout.current) {
      clearTimeout(detectTimeout.current);
    }
  };

  const processImage = async () => {
    if (!capturedUri) {

      onError(new Error("No image captured"));
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: capturedUri,
        name: "scan.jpg",
        type: "image/jpeg",
      } as any);

      console.log('formData', formData)

      const result = await apiQueue.enqueue(() =>
        api
          .post("/scanner/process", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => res.data)
      );
      console.log('result', result)
      // return result;
    } catch (error) {
      onError(error as Error);
      return null;
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
    processImage,
  };
}
