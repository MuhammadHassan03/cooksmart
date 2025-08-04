import React, { useMemo } from "react"
import { useWindowDimensions } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { XStack, YStack, Text, Theme, getTokenValue } from "tamagui"
import { MotiView } from "moti"

import { useThemeColors } from "@/hooks/theme/useThemeColors"

export function ThemedTabbar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions()
  const { colors, fonts } = useThemeColors()
  const insets = useSafeAreaInsets()
  const tabCount = state.routes.length
  const tabWidth = width / tabCount

  const indicatorTranslateX = useSharedValue(state.index * tabWidth)

  React.useEffect(() => {
    indicatorTranslateX.value = withTiming(state.index * tabWidth, { duration: 200 })
  }, [state.index])

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorTranslateX.value }],
  }))

  const tabItems = useMemo(() => {
    return state.routes.map((route, index) => {
      const { options } = descriptors[route.key]
      const label = options.tabBarLabel ?? options.title ?? route.name
      const isFocused = state.index === index

      const icon = options.tabBarIcon?.({
        focused: isFocused,
        color: isFocused ? colors.primary : colors.icon,
        size: 22,
      })

      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        })

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name)
        }
      }

      return {
        key: route.key,
        label,
        icon,
        isFocused,
        onPress,
      }
    })
  }, [state.index, state.routes, descriptors, navigation, colors])

  return (
    <XStack
      position="absolute"
      bottom={0}
      width="100%"
      backgroundColor={colors.background}
      borderTopWidth={1}
      borderTopColor={colors.border}
      paddingBottom={insets.bottom}
      paddingTop="$2"
      paddingHorizontal="$4"
      justifyContent="space-around"
      alignItems="center"
      elevation={20}
      zIndex={100}
      shadowColor={colors.shadow}
      shadowOffset={{ width: 0, height: -3 }}
      shadowOpacity={0.1}
      shadowRadius={8}
    >
      {/* Active Tab Indicator */}
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: insets.bottom + 32,
            left: 0,
            width: tabWidth,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: colors.primary,
          },
          animatedIndicatorStyle,
        ]}
      />

      {tabItems.map((item, index) => (
        <YStack
          key={item.key}
          flex={1}
          alignItems="center"
          justifyContent="center"
          pressStyle={{ opacity: 0.6 }}
          onPress={item.onPress}
          gap="$1"
        >
          <MotiView
            animate={{
              scale: item.isFocused ? 1.2 : 1,
              backgroundColor: item.isFocused ? colors.hover : "transparent",
            }}
            transition={{ type: "timing", duration: 200 }}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </MotiView>
          <Text
            fontSize={10}
            color={item.isFocused ? colors.primary : colors.textSecondary}
            fontFamily={
              item.isFocused ? fonts.bold.fontFamily : fonts.medium.fontFamily
            }
            fontWeight={
              item.isFocused ? fonts.bold.fontWeight : fonts.medium.fontWeight
            }
          >
            {typeof item.label === "string" ? item.label : ""}
          </Text>
        </YStack>
      ))}
    </XStack>
  )
}
