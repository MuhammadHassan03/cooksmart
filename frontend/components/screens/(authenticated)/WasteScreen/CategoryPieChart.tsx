import { Card, Text, YStack, XStack, View } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { Info } from "@tamagui/lucide-icons";

// Helper function for colors only
const getCategoryColor = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes("veg")) return "#4ADE80"; // Green
  if (lower.includes("fruit")) return "#FB7185"; // Red/Pink
  if (lower.includes("dairy")) return "#FBBF24"; // Yellow/Orange
  if (lower.includes("meat")) return "#A78BFA"; // Purple
  if (lower.includes("bakery")) return "#F97316"; // Orange
  
  return "#94A3B8"; // Default Gray
};

const API_DATA = [
  { category: "Vegetables", percentage: 45, loss: 40.50 },
  { category: "Bakery", percentage: 25, loss: 12.00 },
  { category: "Meat", percentage: 20, loss: 35.00 },
  { category: "Others", percentage: 10, loss: 5.00 },
];

export default function CategoryWasteList() {
  const { colors } = useThemeColors();

  const topWaste = API_DATA.reduce((prev, current) => 
    (prev.percentage > current.percentage) ? prev : current
  );

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.card}
      borderWidth={1}
      borderColor={colors.border}
      elevate
    >
      <YStack gap="$4">
        {/* Header */}
        <XStack jc="space-between" ai="center">
          <YStack>
            <Text fontSize="$5" fontWeight="800" color={colors.text}>Major Waste</Text>
            <Text fontSize="$2" color={colors.textSecondary}>Where you are losing money</Text>
          </YStack>
          <Info size={18} color={colors.textSecondary} />
        </XStack>

        {/* List without Icons */}
        <YStack gap="$5" mt="$2">
          {API_DATA.map((item, index) => {
            const barColor = getCategoryColor(item.category);
            return (
              <YStack key={index} gap="$2">
                <XStack jc="space-between" ai="center">
                  <Text fontSize="$4" fontWeight="700" color={colors.text}>
                    {item.category}
                  </Text>
                  <XStack ai="center" gap="$2">
                     <Text fontSize="$3" fontWeight="800" color={colors.text}>
                        {item.percentage}%
                     </Text>
                  </XStack>
                </XStack>

                {/* Progress Bar */}
                <View height={6} width="100%" backgroundColor={colors.surface} borderRadius="$10">
                  <View 
                    height="100%" 
                    width={`${item.percentage}%`} 
                    backgroundColor={barColor} 
                    borderRadius="$10"
                  />
                </View>
                
                <XStack jc="flex-end">
                   <Text fontSize={10} color={colors.textSecondary}>
                      Loss: ${item.loss.toFixed(2)}
                   </Text>
                </XStack>
              </YStack>
            );
          })}
        </YStack>

        {/* Simple Text Insight */}
        <YStack 
          mt="$2" 
          p="$3" 
          backgroundColor={colors.surface} 
          borderRadius="$4" 
          gap="$1"
        >
          <Text fontSize="$2" fontWeight="700" color={colors.text}>Smart Insight:</Text>
          <Text fontSize="$2" color={colors.textSecondary}>
            Your <Text color={getCategoryColor(topWaste.category)} fontWeight="bold">{topWaste.category}</Text> waste is the highest. Reducing this could save you up to <Text fontWeight="bold" color={colors.text}>${topWaste.loss}</Text> per month.
          </Text>
        </YStack>
      </YStack>
    </Card>
  );
}