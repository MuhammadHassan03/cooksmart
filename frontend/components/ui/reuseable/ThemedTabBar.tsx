import React, { useMemo, memo } from "react";
import { useWindowDimensions, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack, View, Circle } from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";

// --- 1. TabItem Component (Missing Component Fixed) ---
const TabItem = memo(({ item, isFocused, colors }: any) => {
  // Icon Bounce Animation
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: isFocused ? withSpring(-10) : withSpring(0) },
        { scale: isFocused ? withSpring(1.15) : withSpring(1) },
      ],
    };
  });

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      onPress={item.onPress}
      paddingVertical="$2"
      zIndex={10}
    >
      <Animated.View style={animatedIconStyle}>
        <YStack alignItems="center" gap="$1">
          <Circle
            size={42}
            backgroundColor={isFocused ? colors.primary : "transparent"}
            elevation={isFocused ? 8 : 0}
            shadowColor={colors.primary}
            shadowOpacity={0.2}
            shadowRadius={8}
          >
            {React.cloneElement(item.icon, {
              color: isFocused ? "white" : colors.textSecondary,
              size: 20,
            })}
          </Circle>

          {/* Subtle Indicator Dot */}
          {isFocused && (
            <View
              width={4}
              height={4}
              borderRadius={2}
              backgroundColor={colors.primary}
              marginTop={-2}
            />
          )}
        </YStack>
      </Animated.View>
    </YStack>
  );
});

// --- 2. Main Tabbar Component ---
export function ThemedTabbar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors, isLight } = useThemeColors();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const DOCK_WIDTH = width * 0.92;
  const TAB_WIDTH = DOCK_WIDTH / state.routes.length;

  // FIX: Dynamic spacing for Notch vs Non-Notch devices
  const BOTTOM_OFFSET =
    Platform.OS === "ios" ? (insets.bottom > 0 ? insets.bottom : 55) : 50;

  const tabItems = useMemo(() => {
    return state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const isFocused = state.index === index;
      const icon = options.tabBarIcon?.({
        focused: isFocused,
        color: "",
        size: 20,
      });

      return {
        key: route.key,
        name: route.name,
        icon,
        isFocused,
        onPress: () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name);
        },
      };
    });
  }, [state.index, colors, descriptors, navigation]);

  return (
    <View
      position="absolute"
      bottom={BOTTOM_OFFSET}
      left={0}
      right={0}
      alignItems="center"
      backgroundColor="transparent"
      pointerEvents="box-none"
    >
      <XStack
        width={DOCK_WIDTH}
        backgroundColor={
          isLight ? "rgba(255, 255, 255, 0.92)" : "rgba(22, 22, 24, 0.95)"
        }
        height={65}
        borderRadius={35}
        borderWidth={1}
        borderColor={
          isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)"
        }
        justifyContent="space-around"
        alignItems="center"
        elevation={12}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 10 }}
        shadowOpacity={0.12}
        shadowRadius={15}
      >
        {tabItems.map((item, index) => (
          <TabItem
            key={item.key}
            item={item}
            isFocused={state.index === index}
            colors={colors}
          />
        ))}
      </XStack>
    </View>
  );
}
