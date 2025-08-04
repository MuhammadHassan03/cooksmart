import { Card, Text, YStack } from "tamagui";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export default function WeeklyWasteTrendGraph() {
  const { colors } = useThemeColors();
  const screenWidth = Dimensions.get("window").width;

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [2, 1, 3, 1.5, 2, 1, 0.5],
        color: () => colors.primary,
        strokeWidth: 2,
      },
    ],
    legend: ["Items Wasted Per Day"],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 1,
    color: () => colors.primary,
    labelColor: () => colors.textSecondary,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: colors.surface,
    },
    propsForBackgroundLines: {
      stroke: colors.border,
      strokeDasharray: "4",
    },
  };

  return (
    <Card
      padding="$4"
      borderRadius="$6"
      backgroundColor={colors.surface}
      elevate
      accessibilityRole="summary"
    >
      <YStack gap="$4">
        <Text
          fontSize="$5"
          fontWeight="700"
          color={colors.text}
          textAlign="center"
        >
          Weekly Waste Trend
        </Text>

        <LineChart
          data={chartData}
          width={screenWidth - 64}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 12,
            alignSelf: "center",
          }}
        />
      </YStack>
    </Card>
  );
}
