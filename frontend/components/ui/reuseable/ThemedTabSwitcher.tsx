import React from "react";
import { XStack, Button, Text } from "tamagui";
import { MotiView } from "moti";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

interface TabOption {
  key: string;
  label: string;
  Icon: any;
}

interface TabSwitcherProps {
  options: TabOption[];
  activeTab: string;
  onChange: (key: any) => void;
}

export const TabSwitcher = ({ options, activeTab, onChange }: TabSwitcherProps) => {
  const { colors, fonts, isLight } = useThemeColors();
  
  const activeIndex = options.findIndex(opt => opt.key === activeTab);
  const tabWidthPercent = 100 / options.length;

  return (
    <XStack px="$5" mt="$2">
      <XStack
        f={1}
        bg={isLight ? "$background" : "#1a1a1a"}
        p="$1.5"
        br={100}
        bw={1}
        boc="$border"
        pos="relative"
        h={52}
      >
        {/* Animated Indicator */}
        <MotiView
          animate={{
            left: `${activeIndex * tabWidthPercent}%`,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 180 }}
          style={{
            position: "absolute",
            top: 5,
            bottom: 5,
            width: `${tabWidthPercent - 2}%`, // thoda gap ke liye
            marginHorizontal: '1%',
            backgroundColor: colors.primary,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 5,
          }}
        />

        {options.map((option) => {
          const isActive = activeTab === option.key;
          return (
            <Button
              key={option.key}
              f={1}
              bg="transparent"
              br={100}
              h="100%"
              onPress={() => onChange(option.key)}
              pressStyle={{ opacity: 0.8 }}
              bw={0}
            >
              <XStack ai="center" gap="$2" zIndex={10}>
                <option.Icon size={18} color={isActive ? "white" : colors.textSecondary} />
                <Text
                  fontFamily={fonts.bold.fontFamily}
                  fontSize={13}
                  color={isActive ? "white" : colors.textSecondary}
                >
                  {option.label}
                </Text>
              </XStack>
            </Button>
          );
        })}
      </XStack>
    </XStack>
  );
};