import { Text, View, YStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { TouchableOpacity } from "react-native";

interface SelectableCardProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function SelectableCard({
  label,
  selected,
  onPress,
}: SelectableCardProps) {
  const { colors, fonts } = useThemeColors();

  return (
    <TouchableOpacity onPress={onPress}>
      <YStack
        padding="$4"
        marginBottom="$3"
        borderRadius="$4"
        backgroundColor={selected ? colors.primary : colors.card}
        borderWidth={1}
        borderColor={selected ? colors.primary : colors.border}
        shadowColor={selected ? colors.shadow : "transparent"}
        shadowOpacity={selected ? 0.12 : 0}
        shadowRadius={6}
        shadowOffset={{ width: 0, height: 2 }}
      >
        <Text
          color={selected ? colors.background : colors.text}
          fontFamily={fonts.medium.fontFamily}
          fontWeight={fonts.medium.fontWeight}
          fontSize={15}
        >
          {label}
        </Text>
      </YStack>
    </TouchableOpacity>
  );
}
