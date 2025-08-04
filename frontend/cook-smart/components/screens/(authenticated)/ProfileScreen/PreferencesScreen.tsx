import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  YStack,
  Text,
  H4,
  ListItem,
  Separator,
  Card,
} from "tamagui";
import { ReusableHeader } from "@/components/ui/reuseable/ThemedHeader";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export default function PreferencesScreen() {
  const { colors, fonts } = useThemeColors();

  // Handlers (stubbed for now)
  const handleDietAllergies = () => {};
  const handleLanguageChange = () => {};
  const handleThemeChange = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack flex={1}>
        <ReusableHeader title="Preferences" showAvatar={false} />

        <YStack padding="$4" space="$4" flex={1}>
          {/* Section Header */}
          <YStack>
            <H4 color={colors.text} fontFamily={fonts.bold.fontFamily}>
              Customize your experience
            </H4>
            <Text fontSize={14} color={colors.textSecondary}>
              Set your dietary needs, language, and visual theme
            </Text>
          </YStack>

          {/* Preferences Card */}
          <Card
            elevate
            bordered
            backgroundColor={colors.surface}
            borderColor={colors.border}
            padding="$3"
          >
            <YStack>
              <ListItem backgroundColor={colors.surface} onPress={handleDietAllergies}>
                <YStack>
                  <Text fontSize={15} fontWeight="600" color={colors.text}>
                    Diet & Allergies
                  </Text>
                  <Text fontSize={13} color={colors.textSecondary}>
                    Vegan, gluten-free, etc.
                  </Text>
                </YStack>
              </ListItem>

              <Separator borderColor={colors.divider} />

              <ListItem backgroundColor={colors.surface} onPress={handleLanguageChange}>
                <YStack>
                  <Text fontSize={15} fontWeight="600" color={colors.text}>
                    Language
                  </Text>
                  <Text fontSize={13} color={colors.textSecondary}>
                    English (default)
                  </Text>
                </YStack>
              </ListItem>

              <Separator borderColor={colors.divider} />

              <ListItem backgroundColor={colors.surface} onPress={handleThemeChange}>
                <YStack>
                  <Text fontSize={15} fontWeight="600" color={colors.text}>
                    Theme
                  </Text>
                  <Text fontSize={13} color={colors.textSecondary}>
                    Light / Dark / System
                  </Text>
                </YStack>
              </ListItem>
            </YStack>
          </Card>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
