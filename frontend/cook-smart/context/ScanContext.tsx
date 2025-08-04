import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Camera, CameraType } from "expo-camera";

interface ScanContextType {
  scansLeft: number;
  hasPremium: boolean;
  showUpsell: boolean;
  cameraPermissionGranted: boolean | null;
  loadingPermission: boolean;

  setShowUpsell: (open: boolean) => void;
  setPremiumStatus: (value: boolean) => void;
  decrementScan: () => void;
  addBonusScans: (count: number) => void;
  resetScans: (to?: number) => void;
  requestCameraPermission: () => Promise<void>;
}

const ScanContext = createContext<ScanContextType | null>(null);

export const useScanContext = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error("useScanContext must be used within a ScanProvider");
  }
  return context;
};

export const ScanProvider = ({ children }: { children: ReactNode }) => {
  const [scansLeft, setScansLeft] = useState(3);
  const [hasPremium, setHasPremium] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState<boolean | null>(null);
  const [loadingPermission, setLoadingPermission] = useState(true);

  // Initial camera permission check
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      setLoadingPermission(true);
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermissionGranted(status === "granted");
    } catch (err) {
      console.error("Failed to get camera permission:", err);
      setCameraPermissionGranted(false);
    } finally {
      setLoadingPermission(false);
    }
  };

  const decrementScan = () => {
    setScansLeft(prev => {
      const next = Math.max(prev - 1, 0);
      if (next === 0 && !hasPremium) {
        setShowUpsell(true);
      }
      return next;
    });
  };

  const addBonusScans = (count: number) => {
    setScansLeft(prev => prev + count);
  };

  const resetScans = (to: number = 3) => {
    setScansLeft(to);
    setShowUpsell(false);
  };

  const setPremiumStatus = (value: boolean) => {
    setHasPremium(value);
    if (value) setShowUpsell(false);
  };

  return (
    <ScanContext.Provider
      value={{
        scansLeft,
        hasPremium,
        showUpsell,
        cameraPermissionGranted,
        loadingPermission,
        setShowUpsell,
        setPremiumStatus,
        decrementScan,
        addBonusScans,
        resetScans,
        requestCameraPermission,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};
