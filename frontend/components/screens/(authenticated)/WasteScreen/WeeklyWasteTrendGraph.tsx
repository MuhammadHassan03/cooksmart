import { Card, Text, YStack, XStack, View } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { BarChart2, Lock } from "@tamagui/lucide-icons";

const WEEKLY_DATA = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 25 },
  { day: "Wed", value: 85 }, // Max
  { day: "Thu", value: 35 },
  { day: "Fri", value: 55 },
  { day: "Sat", value: 20 },
  { day: "Sun", value: 15 },
];

export default function WeeklyWasteTrendGraph() {
  const { colors } = useThemeColors();
  const maxValue = Math.max(...WEEKLY_DATA.map((d) => d.value));

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
          <XStack ai="center" gap="$2">
            <View backgroundColor={colors.primary + "15"} p="$1.5" borderRadius="$3">
               <BarChart2 size={16} color={colors.primary} />
            </View>
            <Text fontSize="$4" fontWeight="800">Daily Trend</Text>
          </XStack>
          <Text fontSize={10} fontWeight="700" color={colors.textSecondary} letterSpacing={1}>
            THIS WEEK
          </Text>
        </XStack>

        {/* Improved Bar Chart */}
        <XStack jc="space-between" ai="flex-end" height={140} mt="$2" px="$1">
          {WEEKLY_DATA.map((item, index) => {
            const isHighest = item.value === maxValue;
            const barHeight = (item.value / maxValue) * 100;
            
            return (
              <YStack key={index} ai="center" gap="$2" f={1}>
                {/* Bar Container */}
                <View jc="flex-end" ai="center" width="100%" height="100%">
                  <View
                    width={24} // Moti bars for better UI
                    height={`${barHeight}%`}
                    backgroundColor={isHighest ? colors.primary : colors.primary + "20"}
                    borderRadius={6}
                    hoverStyle={{ backgroundColor: colors.primary + "60" }}
                  >
                    {isHighest && (
                       <View 
                         position="absolute" 
                         top={-2} 
                         width={24} 
                         height={4} 
                         backgroundColor={colors.text} 
                         borderRadius={10} 
                       />
                    )}
                  </View>
                </View>
                
                {/* Day Label */}
                <Text 
                  fontSize={10} 
                  fontWeight={isHighest ? "800" : "600"} 
                  color={isHighest ? colors.text : colors.textSecondary}
                >
                  {item.day}
                </Text>
              </YStack>
            );
          })}
        </XStack>

        {/* Footer Insight */}
        <YStack borderTopWidth={1} borderColor={colors.border} pt="$3" mt="$1" gap="$2">
          <XStack jc="space-between" ai="center">
             <Text fontSize={11} color={colors.textSecondary}>
                Peak waste on <Text fontWeight="bold" color={colors.text}>Wednesday</Text>
             </Text>
             <XStack ai="center" gap="$1" onPress={() => {}}>
                <Lock size={10} color={colors.primary} />
                <Text fontSize={10} fontWeight="700" color={colors.primary}>HISTORY</Text>
             </XStack>
          </XStack>
        </YStack>
      </YStack>
    </Card>
  );
}