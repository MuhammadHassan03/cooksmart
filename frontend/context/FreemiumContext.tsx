// @/hooks/useFreemium.ts

import { useFreemiumStore } from "@/utils/store/useFreemiumStore";

export const useFreemium = () => {
  const { currentPlan, setPlan, canUseFeature, incrementUsage } = useFreemiumStore();

  return {
    isPremium: currentPlan === 'premium',
    currentPlan,
    upgrade: () => setPlan('premium'),
    checkAccess: canUseFeature,
    trackAction: incrementUsage,
    // Project Meta Data [cite: 142]
    planLabel: currentPlan === 'premium' ? "Pro Member" : "Free Trial",
  };
};