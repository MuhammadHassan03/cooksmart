import { ActionCard } from "@/components/ui/reuseable/ThemedActionCard"
import { Camera, ChefHat, PlusCircle } from "@tamagui/lucide-icons"
import { useRouter } from "expo-router"
import { XStack, YStack } from "tamagui"
import { WasteImpactWidget } from "./WasteImpactWidget"

export const QuickActionsSection = () => {
  const router = useRouter()

  return (
    <YStack marginBottom="$4" gap="$4">
      {/* 1. Main AI Scanner Action (Premium Feature) */}
      <ActionCard 
        variant="primary"
        label="Scan My Fridge"
        icon={<Camera size={28} color="white" />}
        onPress={() => router.push("/(scanner)/ai")}
      />

      {/* 2. Secondary Row */}
      <XStack gap="$3.5">
        <ActionCard 
          label="Add Item" 
          icon={<PlusCircle size={24} color="$primary" />} 
          onPress={() => router.push("/inventory/add")} 
          flex={1}
        />
        <ActionCard 
          label="What to Cook?" 
          icon={<ChefHat size={24} color="$primary" />} 
          onPress={() => router.push("/(tabs)/recipes")} 
          flex={1.2}
        />
      </XStack>

      {/* 3. New Waste Analytics Widget (Replaces Tab) */}
      <WasteImpactWidget />
    </YStack>
  )
}