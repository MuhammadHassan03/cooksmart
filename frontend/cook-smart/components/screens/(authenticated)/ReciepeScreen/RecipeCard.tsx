import { Card, Image, Text, YStack } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

interface RecipeCardProps {
  title: string;
  imageUrl: string;
  duration: string;
  isPremium?: boolean;
  onPress?: () => void;
}

export default function RecipeCard({
  title,
  imageUrl,
  duration,
  isPremium,
  onPress,
}: RecipeCardProps) {
  const { colors } = useThemeColors();

  return (
    <Card
      elevate
      bordered
      backgroundColor={colors.surface}
      padding="$3"
      borderRadius="$6"
      onPress={onPress}
    >
      <YStack space="$2">
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: 140, borderRadius: 12 }}
          resizeMode="cover"
        />
        <Text fontWeight="700" color={colors.text}>
          {title}
        </Text>
        <Text fontSize={12} color={colors.textSecondary}>
          {duration} {isPremium && "· 🔒 Premium"}
        </Text>
      </YStack>
    </Card>
  );
}
