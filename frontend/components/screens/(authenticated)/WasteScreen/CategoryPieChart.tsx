import { Card, Text, YStack, XStack, View } from "tamagui";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

const screenWidth = Dimensions.get("window").width;

// Utility for generating pastel HSL-based colors
const generateColor = (index: number) => {
  const hue = (index * 137.5) % 360;
  return `hsl(${hue}, 70%, 65%)`;
};

export default function CategoryPieChart() {
  const { colors } = useThemeColors();

  // Mocked dynamic data (replace with backend later)
  const labels = ["Fruits", "Veggies", "Dairy", "Grains", "Meat"];
  const values = [20, 40, 15, 10, 15];

  const pieData = labels.map((label, index) => ({
    name: label,
    population: values[index],
    color: generateColor(index),
    legendFontColor: colors.text,
    legendFontSize: 13,
  }));

  const chartWidth = screenWidth - 64; // Matches card horizontal padding

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.surface}
      borderColor={colors.border}
      elevate
      accessibilityRole="summary"
    >
      <YStack gap="$4" width="100%" alignItems="center">
        <Text
          fontSize="$5"
          fontWeight="700"
          color={colors.text}
          textAlign="center"
        >
          Waste by Category
        </Text>

        <YStack width="100%" alignItems="center">
          <PieChart
            data={pieData}
            width={chartWidth}
            height={190}
            accessor="population"
            backgroundColor="transparent"
            chartConfig={{
              color: () => colors.text,
              labelColor: () => colors.text,
              backgroundGradientFrom: colors.surface,
              backgroundGradientTo: colors.surface,
              decimalPlaces: 0,
            }}
            paddingLeft="0"
            absolute
            hasLegend={false}
          />
        </YStack>

        {/* Custom Legend */}
        <YStack gap="$2" width="100%">
          {pieData.map((item, index) => (
            <XStack
              key={index}
              alignItems="center"
              justifyContent="space-between"
              paddingHorizontal="$2"
            >
              <XStack alignItems="center" gap="$2">
                <View
                  width={12}
                  height={12}
                  borderRadius={6}
                  backgroundColor={item.color}
                />
                <Text fontSize="$3" color={colors.textSecondary}>
                  {item.name}
                </Text>
              </XStack>
              <Text fontSize="$3" color={colors.textSecondary}>
                {item.population}%
              </Text>
            </XStack>
          ))}
        </YStack>

        <Text
          fontSize="$2"
          color={colors.textSecondary}
          textAlign="center"
          paddingHorizontal="$4"
          mt="$2"
        >
          Visualize your food waste by type. A great step toward smarter grocery
          planning.
        </Text>
      </YStack>
    </Card>
  );
}
