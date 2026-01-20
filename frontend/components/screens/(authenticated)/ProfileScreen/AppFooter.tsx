import React, { memo } from "react";
import { Button, Text, YStack, XStack, View } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuthActions } from "@/context/AuthContext";
import { appName } from "@/constants";
import { LogOut } from "@tamagui/lucide-icons";

const AppFooter = () => {
  const { colors, fonts } = useThemeColors();
  const { logout } = useAuthActions();

  return (
    <YStack 
      alignItems="center" 
      marginTop="$8" 
      paddingBottom="$10" 
      gap="$5"
    >
      {/* 1. Log Out Button - Soft Style */}
      <Button
        size="$4"
        width="100%" // Puri width par outline style acha lagta hy
        backgroundColor="transparent"
        borderWidth={1.5}
        borderColor={colors.error + "40"} // Subtle red border
        pressStyle={{ 
          backgroundColor: colors.error + "10", 
          scale: 0.98,
          borderColor: colors.error 
        }}
        icon={<LogOut size={18} color={colors.error} />}
        onPress={logout}
      >
        <Text 
          color={colors.error} 
          fontWeight="700" 
          fontSize={15}
          fontFamily={fonts?.bold?.fontFamily}
        >
          Sign Out
        </Text>
      </Button>

      {/* 2. App Info - Clean Typography */}
      <YStack alignItems="center" gap="$1">
        <Text 
          fontSize={13} 
          fontWeight="600" 
          color={colors.text} 
          opacity={0.5}
          letterSpacing={1}
        >
          {appName.toUpperCase()}
        </Text>
        
        <XStack ai="center" gap="$2">
          <View height={1} width={10} backgroundColor={colors.border} />
          <Text 
            fontSize={11} 
            color={colors.textSecondary} 
            fontFamily="monospace"
            opacity={0.6}
          >
            VERSION 1.0.0
          </Text>
          <View height={1} width={10} backgroundColor={colors.border} />
        </XStack>
      </YStack>
    </YStack>
  );
};

export default memo(AppFooter);