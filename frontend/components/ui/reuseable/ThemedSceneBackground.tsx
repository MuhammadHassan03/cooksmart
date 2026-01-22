import React from "react";
import { View, Circle } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

export const SceneBackground = () => {
  const { colors } = useThemeColors();

  return (
    <View pos="absolute" t={-70} l={-70} opacity={0.12} zIndex={-1}>
      <Circle 
        size={250} 
        bg={colors.primary} 
        // Note: filter blur native pe kabhi kabhi issues deta hai
        // Isliye soft opacity use ki hai.
      />
    </View>
  );
};