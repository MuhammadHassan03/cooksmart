import type { Theme } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { fonts } from '@/constants/Fonts';

export const LightTheme: Theme = {
  dark: false,
  colors: {
    ...Colors.light,
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.card,
    text: Colors.light.text,
    border: Colors.light.border,
    notification: Colors.light.accent,
  },
  fonts,
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    ...Colors.dark,
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    card: Colors.dark.card,
    text: Colors.dark.text,
    border: Colors.dark.border,
    notification: Colors.dark.accent,
  },
  fonts,
};