import React, { useMemo, memo } from "react"
import { useWindowDimensions, Platform } from "react-native"
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withTiming,
  useDerivedValue
} from "react-native-reanimated"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { XStack, YStack, View, Circle } from "tamagui"
import { useThemeColors } from "@/hooks/theme/useThemeColors"

const TabItem = memo(({ item, isFocused, colors, fonts }: any) => {
  // Icon Bounce Animation
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: isFocused ? withSpring(-12) : withSpring(0) },
        { scale: isFocused ? withSpring(1.2) : withSpring(1) }
      ],
    }
  })

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
            size={45} 
            backgroundColor={isFocused ? colors.primary : "transparent"}
            elevation={isFocused ? 10 : 0}
            shadowColor={colors.primary}
            shadowOpacity={0.3}
            shadowRadius={10}
          >
            {React.cloneElement(item.icon, {
              color: isFocused ? "white" : colors.textSecondary,
              size: 20
            })}
          </Circle>
          
          {/* Subtle Indicator Dot */}
          {isFocused && (
            <View 
              width={4} 
              height={4} 
              borderRadius={2} 
              backgroundColor={colors.primary} 
              marginTop={-4}
            />
          )}
        </YStack>
      </Animated.View>
    </YStack>
  )
})

export function ThemedTabbar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, isLight } = useThemeColors()
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  const DOCK_WIDTH = width * 0.92
  const TAB_WIDTH = DOCK_WIDTH / state.routes.length

  // Animated background "Blob" that follows the selection
  const animatedBlobStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(state.index * TAB_WIDTH, { damping: 15, stiffness: 100 }) }
      ],
    }
  })

  const tabItems = useMemo(() => {
    return state.routes.map((route, index) => {
      const { options } = descriptors[route.key]
      const isFocused = state.index === index
      const icon = options.tabBarIcon?.({ focused: isFocused, color: '', size: 20 })

      return {
        key: route.key,
        icon,
        isFocused,
        onPress: () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true })
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name)
        }
      }
    })
  }, [state.index, colors, descriptors, navigation])

  return (
    <View
      position="absolute"
      bottom={insets.bottom + 10}
      left={0}
      right={0}
      alignItems="center"
      backgroundColor="transparent"
    >
      {/* Outer Container with Organic Border Radius */}
      <XStack
        width={DOCK_WIDTH}
        backgroundColor={isLight ? "rgba(255, 255, 255, 0.85)" : "rgba(28, 28, 30, 0.9)"}
        paddingHorizontal="$1"
        height={70}
        borderRadius={35} // High radius for capsule look
        borderWidth={1.5}
        borderColor={isLight ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)"}
        justifyContent="space-around"
        alignItems="center"
        // Neumorphic Soft Shadow
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 15 }}
        shadowOpacity={0.1}
        shadowRadius={25}
      >
        {/* Invisible Tracker for the Blob */}
        <Animated.View style={[{ position: 'absolute', left: 0, width: TAB_WIDTH, height: '100%', alignItems: 'center', justifyContent: 'center' }, animatedBlobStyle]}>
           {/* Yahan hum koi background indicator nahi dal rhy, 
               kyunki humne TabItem ke circle ko hi active state banaya hy. 
               Lekin transition smoother lagay gi transitions ki wajah se */}
        </Animated.View>

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
  )
}