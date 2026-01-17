import { Colors } from '@/constants/Colors';
import { fonts, AppFontTheme } from '@/constants/Fonts';
import type { Theme as NavigationTheme } from '@react-navigation/native';

export type AppColors = typeof Colors.light;


export interface AppTheme extends NavigationTheme {
  fonts: AppFontTheme;
  colors: AppColors;
}

export const LightTheme: AppTheme = {
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

export const DarkTheme: AppTheme = {
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
