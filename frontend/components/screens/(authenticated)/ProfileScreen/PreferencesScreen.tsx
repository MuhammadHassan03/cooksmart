import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Text, ListItem, Separator, Card, ScrollView, XStack } from "tamagui";
import { 
  ChevronRight, 
  Leaf, 
  Languages, 
  Palette, 
  Moon, 
  Info 
} from "@tamagui/lucide-icons";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

// --- Internal Helper: Preferences Row ---
const PrefItem = ({ icon, title, value, onPress }: { icon: any, title: string, value: string, onPress: () => void }) => {
  const { colors } = useThemeColors();
  return (
    <ListItem
      hoverTheme
      pressTheme
      onPress={onPress}
      backgroundColor="transparent"
      paddingVertical="$4"
      icon={icon}
      iconAfter={
        <XStack ai="center" gap="$2">
          <Text fontSize={13} color={colors.textSecondary} opacity={0.6}>
            {value}
          </Text>
          <ChevronRight size={18} color={colors.textSecondary} opacity={0.4} />
        </XStack>
      }
    >
      <Text fontSize={16} fontWeight="600" color={colors.text}>
        {title}
      </Text>
    </ListItem>
  );
};

export default function PreferencesScreen() {
  const { colors, fonts } = useThemeColors();

  // Handlers
  const handleDietAllergies = () => console.log("Diet screen");
  const handleLanguageChange = () => console.log("Language screen");
  const handleThemeChange = () => console.log("Theme screen");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ReusableHeader title="Preferences" showAvatar={false} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$4" gap="$6">
          
          {/* Header Section */}
          <YStack gap="$1">
            <Text 
              fontSize={24} 
              fontWeight="800" 
              color={colors.text} 
              fontFamily={fonts?.bold?.fontFamily}
            >
              Experience
            </Text>
            <Text fontSize={14} color={colors.textSecondary} opacity={0.8}>
              Tailor the app to match your lifestyle and taste.
            </Text>
          </YStack>

          {/* Group 1: Culinary Preferences */}
          <YStack gap="$3">
            <Text fontSize={12} fontWeight="900" color={colors.textSecondary} textTransform="uppercase" letterSpacing={1} marginLeft="$1">
              Cooking & Diet
            </Text>
            <Card bordered backgroundColor={colors.surface} borderRadius="$6" borderColor={colors.border} overflow="hidden">
              <PrefItem 
                icon={<Leaf size={20} color={colors.primary} />}
                title="Diet & Allergies"
                value="None Set"
                onPress={handleDietAllergies}
              />
            </Card>
          </YStack>

          {/* Group 2: Regional & Visual */}
          <YStack gap="$3">
            <Text fontSize={12} fontWeight="900" color={colors.textSecondary} textTransform="uppercase" letterSpacing={1} marginLeft="$1">
              App Settings
            </Text>
            <Card bordered backgroundColor={colors.surface} borderRadius="$6" borderColor={colors.border} overflow="hidden">
              <PrefItem 
                icon={<Languages size={20} color="$blue10" />}
                title="Language"
                value="English"
                onPress={handleLanguageChange}
              />
              <Separator borderColor={colors.border} marginHorizontal="$4" />
              <PrefItem 
                icon={<Palette size={20} color="$pink10" />}
                title="Appearance"
                value="System"
                onPress={handleThemeChange}
              />
            </Card>
          </YStack>

          {/* Info Banner: Quick Hint */}
          <XStack 
            backgroundColor={colors.primary + "10"} 
            padding="$4" 
            borderRadius="$6" 
            borderWidth={1} 
            borderColor={colors.primary + "20"}
            gap="$3"
            ai="center"
          >
            <Info size={18} color={colors.primary} />
            <Text flex={1} fontSize={12} color={colors.textSecondary} lineHeight={16}>
              These settings help our AI suggest recipes that are safe and relevant for you.
            </Text>
          </XStack>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}