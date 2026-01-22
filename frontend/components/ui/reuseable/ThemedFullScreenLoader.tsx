import { View, Spinner, YStack, Text, Image } from "tamagui";
import { AnimatePresence } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const FullScreenLoader = () => {
  const insets = useSafeAreaInsets();
  const loadingQuotes = [
    "Prepping your kitchen...",
    "Finding the best recipes for you...",
    "Checking your fridge inventory...",
    "Sharpening the knives...",
  ];

  const randomQuote =
    loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];

  return (
    <View f={1} jc="center" ai="center" bg="$background">
      <YStack ai="center" gap="$5">
        {/* Logo or Icon with subtle scale animation */}
        <View
          animation="medium"
          enterStyle={{ opacity: 0, scale: 0.5 }}
          exitStyle={{ opacity: 0, scale: 0.5 }}
          p="$6"
          br="$10"
          bg="$primarySubtle" // Light green background
        >
          {/* Agar aapke paas logo image hai toh wo use karein, warna spinner */}
          <Spinner size="large" color="$primary" scale={1.5} />
        </View>

        {/* Branding & Quote */}
        <YStack ai="center" gap="$2">
          <Text
            fontSize="$7"
            fontWeight="900"
            letterSpacing={-0.5}
            color="$primary"
          >
            FridgeChef
          </Text>

          <AnimatePresence>
            <Text
              key={randomQuote}
              fontSize="$3"
              color="$textSecondary"
              textAlign="center"
              animation="fast"
              enterStyle={{ opacity: 0, y: 10 }}
            >
              {randomQuote}
            </Text>
          </AnimatePresence>
        </YStack>
      </YStack>

      {/* Optional: Version tag at bottom */}
      <View pos="absolute" b={insets.bottom + 20}>
        <Text fontSize="$1" color="$textQuaternary" o={0.5}>
          v1.0.0 Powered by AI
        </Text>
      </View>
    </View>
  );
};
