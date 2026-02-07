// Presentation Layer - Theme System
// Boulevard's distinctive dark-cinematic aesthetic

export const colors = {
  // Primary palette - Deep cinematic blacks with electric accents
  background: {
    primary: '#0A0A0F',      // Deep space black
    secondary: '#12121A',    // Elevated surface
    tertiary: '#1A1A25',     // Card backgrounds
    overlay: 'rgba(10, 10, 15, 0.95)',
  },
  
  // Accent colors - Electric cyan and warm gold
  accent: {
    primary: '#00F5FF',      // Electric cyan (main brand)
    secondary: '#FFB800',    // Warm gold
    tertiary: '#FF006E',     // Hot pink (for favorites/special)
    success: '#00FF94',      // Mint green
    error: '#FF3366',        // Coral red
    warning: '#FFB800',      // Gold
  },
  
  // Text hierarchy
  text: {
    primary: '#FFFFFF',
    secondary: '#B8B8C8',    // Slightly desaturated
    tertiary: '#6E6E7E',     // Muted
    disabled: '#404050',
    inverse: '#0A0A0F',
  },
  
  // Interactive states
  interactive: {
    hover: 'rgba(0, 245, 255, 0.1)',
    active: 'rgba(0, 245, 255, 0.2)',
    focus: '#00F5FF',
    disabled: '#2A2A35',
  },
  
  // Media player specific
  player: {
    controlBg: 'rgba(18, 18, 26, 0.8)',
    progressTrack: '#2A2A35',
    progressFill: '#00F5FF',
    volumeTrack: '#2A2A35',
    volumeFill: '#FFB800',
  },
  
  // Glassmorphism effects
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    heavy: 'rgba(255, 255, 255, 0.12)',
    border: 'rgba(255, 255, 255, 0.1)',
  },
};

export const typography = {
  // Font families - Distinctive choices
  fonts: {
    display: 'SpaceGrotesk_700Bold',     // For headings, bold statements
    heading: 'SpaceGrotesk_600SemiBold',  // For section titles
    body: 'SpaceGrotesk_400Regular',             // For body text
    mono: 'SpaceGrotesk_400Bold',     // For time codes, technical info
  },
  
  // Type scale
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
  '5xl': 128,
};

export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
};

export const shadows = {
  // Dramatic shadows for depth
  sm: {
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  
  // Glow effects
  glow: {
    cyan: {
      shadowColor: '#00F5FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 16,
      elevation: 0,
    },
    gold: {
      shadowColor: '#FFB800',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 16,
      elevation: 0,
    },
  },
};

export const animations = {
  // Durations in milliseconds
  durations: {
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },
  
  // Easing curves
  easing: {
    linear: [0, 0, 1, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    spring: [0.5, 0.75, 0.75, 1.5], // Bouncy
  },
};

export const layout = {
  // Screen padding
  screenPadding: spacing.base,
  
  // Container max widths
  containerWidth: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  
  // Common dimensions
  header: {
    height: 56,
    heightLarge: 72,
  },
  
  bottomNav: {
    height: 64,
    heightWithInsets: 84, // With safe area
  },
  
  player: {
    miniHeight: 64,
    fullHeight: '100%',
    controlsHeight: 120,
  },
  
  card: {
    height: 180,
    aspectRatio: 16 / 9,
  },
  
  thumbnail: {
    small: 48,
    medium: 64,
    large: 96,
    xlarge: 128,
  },
};

// Z-index hierarchy
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
};

// Gradient presets
export const gradients = {
  primary: {
    colors: ['#00F5FF', '#0080FF'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  secondary: {
    colors: ['#FFB800', '#FF8800'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  dark: {
    colors: ['#12121A', '#0A0A0F'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  accent: {
    colors: ['#00F5FF', '#FF006E', '#FFB800'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};

// Theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  layout,
  zIndex,
  gradients,
};

export type Theme = typeof theme;
