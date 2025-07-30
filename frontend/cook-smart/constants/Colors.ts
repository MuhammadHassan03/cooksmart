/**
 * Complete color palette for FridgeChef mobile app.
 * Includes semantic and functional tokens for light and dark modes.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#ffffff';

export const Colors = {
  light: {
    // Branding
    primary: tintColorLight,
    primaryLight: '#5ac6dd',
    secondary: '#00A8E8',
    secondaryLight: '#69d3ff',
    accent: '#FFB400',
    accentLight: '#ffe199',

    // Neutral Scale
    neutral0: '#ffffff',
    neutral50: '#f9fafb',
    neutral100: '#f2f2f2',
    neutral200: '#e5e5e5',
    neutral300: '#d4d4d4',
    neutral400: '#a3a3a3',
    neutral500: '#737373',
    neutral600: '#525252',
    neutral700: '#404040',
    neutral800: '#262626',
    neutral900: '#171717',

    // Backgrounds & Surfaces
    background: '#ffffff',
    surface: '#f7f9fa',
    card: '#f2f2f2',
    overlay: 'rgba(0, 0, 0, 0.05)',

    // Text & Icons
    text: '#11181C',
    textSecondary: '#4B5563',
    icon: '#687076',
    placeholder: '#9e9e9e',

    // Borders & Dividers
    border: '#e0e0e0',
    divider: '#f3f4f6',

    // Semantic / States
    success: '#22C55E',
    successLight: '#bbf7d0',
    error: '#EF4444',
    errorLight: '#fecaca',
    warning: '#FACC15',
    warningLight: '#fef08a',
    info: '#0A84FF',
    infoLight: '#bfdbfe',

    // Status & Action UI
    focus: '#93c5fd',
    pressed: '#dbeafe',
    hover: '#e0f2fe',
    active: '#0a7ea4',

    // Miscellaneous
    disabled: '#c5c5c5',
    shadow: 'rgba(17, 24, 39, 0.1)',
    backdrop: 'rgba(0,0,0,0.2)',
  },

  dark: {
    // Branding
    primary: tintColorDark,
    primaryLight: '#cccccc',
    secondary: '#1fb6ff',
    secondaryLight: '#63d4ff',
    accent: '#FFA726',
    accentLight: '#ffc776',

    // Neutral Scale
    neutral0: '#151718',
    neutral50: '#1e1e1e',
    neutral100: '#2a2a2a',
    neutral200: '#3a3a3a',
    neutral300: '#4b4b4b',
    neutral400: '#6b6b6b',
    neutral500: '#9e9e9e',
    neutral600: '#b5b5b5',
    neutral700: '#d1d1d1',
    neutral800: '#e5e5e5',
    neutral900: '#f4f4f5',

    // Backgrounds & Surfaces
    background: '#151718',
    surface: '#1e1e1e',
    card: '#232323',
    overlay: 'rgba(255, 255, 255, 0.05)',

    // Text & Icons
    text: '#ECEDEE',
    textSecondary: '#A0A0A0',
    icon: '#9BA1A6',
    placeholder: '#a5a5a5',

    // Borders & Dividers
    border: '#303030',
    divider: '#1f1f1f',

    // Semantic / States
    success: '#4ADE80',
    successLight: '#166534',
    error: '#F87171',
    errorLight: '#991b1b',
    warning: '#FDE047',
    warningLight: '#a16207',
    info: '#60a5fa',
    infoLight: '#1d4ed8',

    // Status & Action UI
    focus: '#3b82f6',
    pressed: '#1e40af',
    hover: '#334155',
    active: '#ffffff',

    // Miscellaneous
    disabled: '#505050',
    shadow: 'rgba(0, 0, 0, 0.3)',
    backdrop: 'rgba(255,255,255,0.1)',
  },
};
