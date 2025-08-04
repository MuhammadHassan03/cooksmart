import { createContext, useContext, useEffect, useState, ReactNode } from "react"
// import * as RNIap from "react-native-iap"  // Temporarily skipped

const premiumProductId = "your.premium.subscription.id"

interface PremiumContextValue {
  isPremium: boolean
  showUpsell: boolean
  setShowUpsell: (val: boolean) => void
  requirePremium: (onSuccess: () => void) => void
  purchasePremium: () => void
}

const PremiumContext = createContext<PremiumContextValue | null>(null)

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false)
  const [showUpsell, setShowUpsell] = useState(false)

  // Simulate IAP connection (for UI development only)
  useEffect(() => {
    // In production, this would initialize IAP and check subscription
    const timeout = setTimeout(() => {
      // Simulated state, change this for dev testing
      setIsPremium(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  const purchasePremium = () => {
    console.log("Premium purchase simulated (frontend-only)")
    setIsPremium(true)
    setShowUpsell(false)
    // In real app: Call RNIap.requestSubscription
  }

  const requirePremium = (onSuccess: () => void) => {
    if (isPremium) {
      onSuccess()
    } else {
      setShowUpsell(true)
    }
  }

  return (
    <PremiumContext.Provider
      value={{ isPremium, showUpsell, setShowUpsell, requirePremium, purchasePremium }}
    >
      {children}
    </PremiumContext.Provider>
  )
}

export const usePremium = () => {
  const ctx = useContext(PremiumContext)
  if (!ctx) throw new Error("usePremium must be used within PremiumProvider")
  return ctx
}
