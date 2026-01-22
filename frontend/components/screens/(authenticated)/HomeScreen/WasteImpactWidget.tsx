import { XStack, YStack, Text, Card, View } from "tamagui"
import { TrendingDown, Leaf } from "@tamagui/lucide-icons"
import { useRouter } from "expo-router"

export const WasteImpactWidget = () => {
  const router = useRouter();

  return (
    <Card 
      onPress={() => router.push("/waste")}
      backgroundColor="$surface" 
      padding="$4" 
      borderRadius="$6" 
      borderWidth={1} 
      borderColor="$border"
    >
      <XStack justifyContent="space-between" alignItems="center">
        <YStack gap="$1">
          <XStack alignItems="center" gap="$2">
            <Leaf size={16} color="$green10" />
            <Text fontSize={12} color="$textSecondary" fontWeight="600" textTransform="uppercase">
              Eco Impact
            </Text>
          </XStack>
          <Text fontSize={20} fontWeight="800" color="$text">
            $45.50 <Text fontSize={14} fontWeight="400" color="$textSecondary">saved</Text>
          </Text>
        </YStack>
        
        <View backgroundColor="$green5" padding="$2.5" borderRadius="$4">
          <TrendingDown size={20} color="$green10" />
        </View>
      </XStack>
    </Card>
  );
}