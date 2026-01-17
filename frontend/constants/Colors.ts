/**
 * Modern Culinary Palette for FridgeChef.
 * Replaces generic blues with appetizing, fresh tones.
 */

const primaryGreen = '#10B981'; // Fresh Basil Green
const primaryDark = '#064E3B';
const accentOrange = '#F59E0B'; // Warm Honey/Amber

export const Colors = {
  light: {
    // Branding - High Energy & Fresh
    primary: primaryGreen,
    primaryLight: '#D1FAE5',
    secondary: '#3B82F6', // Keep a small touch of soft blue for "Tech/AI"
    secondaryLight: '#DBEAFE',
    accent: accentOrange,
    accentLight: '#FEF3C7',

    // Neutral Scale - Warm Greys (Feel more premium than cold greys)
    neutral0: '#ffffff',
    neutral50: '#FDFCFB',
    neutral100: '#F5F5F4',
    neutral200: '#E7E5E4',
    neutral300: '#D6D3D1',
    neutral400: '#A8A29E',
    neutral500: '#78716C',
    neutral600: '#57534E',
    neutral700: '#44403C',
    neutral800: '#292524',
    neutral900: '#1C1917',

    // Backgrounds & Surfaces
    background: '#FFFFFF',
    surface: '#F9FAF9', // Very subtle hint of mint
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.04)',

    // Text & Icons
    text: '#1C1917', // Stone-900 (Darker, warmer than charcoal)
    textSecondary: '#57534E',
    icon: '#78716C',
    placeholder: '#A8A29E',

    // Borders & Dividers
    border: '#E7E5E4',
    divider: '#F5F5F4',

    // Semantic
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#0EA5E9',

    // Action UI
    focus: '#6EE7B7',
    pressed: '#A7F3D0',
    active: primaryGreen,
    disabled: '#E7E5E4',
    shadow: 'rgba(28, 25, 23, 0.08)',
  },

  dark: {
    // Branding
    primary: '#34D399', // Brighter green for dark mode
    primaryLight: '#064E3B',
    secondary: '#60A5FA',
    accent: '#FBBF24',

    // Neutral Scale - Deep Slate/Stone
    background: '#0C0A09', // Warm Black
    surface: '#1C1917',
    card: '#292524',
    
    // Text
    text: '#FAFAF9',
    textSecondary: '#A8A29E',
    icon: '#78716C',
    
    border: '#44403C',
    divider: '#292524',

    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    
    pressed: '#064E3B',
    active: '#34D399',
    disabled: '#44403C',
  },
};