import React from 'react';
import { YStack, Text, Button, Card, H4, XStack } from 'tamagui';
import { MotiView } from 'moti';
import { MailCheck } from '@tamagui/lucide-icons';

// Types define karte hain taake reuse karna asaan ho
interface ThemedModalProps {
  title: string;
  description: string | React.ReactNode;
  buttonText?: string;
  onButtonPress: () => void;
  Icon?: any;
  themeColor?: any; // e.g. "$green10" or "$red10"
}

export const ThemedModal = ({
  title,
  description,
  buttonText = "Theek Hai",
  onButtonPress,
  Icon = MailCheck, // Default icon
  themeColor = "$green10"
}: ThemedModalProps) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 15 }}
      style={{ width: '100%', padding: 20 }}
    >
      <Card 
        elevate 
        bordered 
        padding="$5" 
        animation="medium" 
        size="$4"
        backgroundColor="$background"
        shadowColor="$shadowColor"
      >
        <YStack alignItems="center" space="$4">
          {/* Icon Section */}
          <YStack 
            padding="$3" 
            borderRadius="$10" 
            backgroundColor={themeColor} 
            opacity={0.1} 
            position="absolute" 
            top={-10}
          />
          <Icon size={48} color={themeColor} />

          {/* Text Section */}
          <YStack space="$2">
            <H4 textAlign="center" fontWeight="bold">{title}</H4>
            <Text textAlign="center" color="$gray11" fontSize="$4" lineHeight={20}>
              {description}
            </Text>
          </YStack>

          {/* Action Button */}
          <Button 
            themeInverse 
            onPress={onButtonPress} 
            width="100%" 
            borderRadius="$4"
            fontWeight="bold"
            pressStyle={{ scale: 0.97 }}
          >
            {buttonText}
          </Button>
        </YStack>
      </Card>
    </MotiView>
  );
};