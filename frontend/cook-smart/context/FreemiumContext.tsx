import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import {
  features,
  planDisplayNames,
  planDescriptions,
  type PlanType,
} from "@/constants";

interface FreemiumContextProps {
  currentPlan: PlanType;
  setPlan: (plan: PlanType) => void;
  isFeatureAvailable: (featureLabel: string) => boolean;
  planDisplayName: string;
  planDescription: string;
}

const FreemiumContext = createContext<FreemiumContextProps | null>(null);

export function FreemiumProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free");

  useEffect(() => {
    const loadPlan = async () => {
      try {
        const stored = await SecureStore.getItemAsync("user-plan");
        if (stored) setCurrentPlan(stored as PlanType);
      } catch (err) {
        console.error("Failed to load user plan", err);
      }
    };

    loadPlan();
  }, []);

  const setPlan = async (plan: PlanType) => {
    try {
      setCurrentPlan(plan);
      await SecureStore.setItemAsync("user-plan", plan);
    } catch (err) {
      console.error("Failed to save user plan", err);
    }
  };

  const isFeatureAvailable = (label: string) => {
    const feature = features.find((f) => f.label === label);
    return feature?.availableIn.includes(currentPlan) ?? false;
  };

  return (
    <FreemiumContext.Provider
      value={{
        currentPlan,
        setPlan,
        isFeatureAvailable,
        planDisplayName: planDisplayNames[currentPlan],
        planDescription: planDescriptions[currentPlan],
      }}
    >
      {children}
    </FreemiumContext.Provider>
  );
}

export const useFreemium = () => {
  const context = useContext(FreemiumContext);
  if (!context) throw new Error("useFreemium must be used inside FreemiumProvider");
  return context;
};
