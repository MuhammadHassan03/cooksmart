import { useEffect, useRef, useState } from "react";
import { Camera, useCameraPermissions } from "expo-camera";
import { apiQueue } from "@/utils/apiQueue";
import api from "@/services/api";
import { compressImage } from "@/services/compressImage";
import { router } from "expo-router";

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

  const handleDetect = async () => {
    setIsDetecting(true);
    // detectTimeout.current = setTimeout(() => {
    //   setIsDetecting(false);
    // }, detectionDuration);
    const result = await processImage();
    if (result) {
      router.push({
        pathname: "/(scanner)/manual",
        params: { detectedItems: JSON.stringify(result.items) },
      });
    }
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
      const compressedUri = await compressImage(capturedUri);
      const formData = new FormData();
      formData.append("image", {
        uri: compressedUri,
        name: "scan.jpg",
        type: "image/jpeg",
      } as any);

      const result = await apiQueue.enqueue(() =>
        api
          .post("/scanner/process", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 60000,
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total ?? 1),
              );
              console.log(`Upload progress: ${percentCompleted}%`);
            },
          })
          .then((res) => res.data),
          {
            url: "/scanner/process",
            method: "POST",
            data: formData,
          }
      );
      return result;
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
