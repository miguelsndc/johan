import { createStitches } from '@stitches/react';

export const {
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  styled,
  config,
  theme,
  css,
} = createStitches({
  theme: {
    fonts: {
      roboto: 'Roboto, sans-serif',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semi: 600,
      bold: 700,
      black: 900,
    },
    colors: {
      purple50: '#f5f3ff',
      purple100: '#ede9fe',
      purple200: '#ddd6fe',
      purple300: '#c4b5fd',
      purple400: '#a78bfa',
      purple500: '#8b5cf6',
      purple600: '#7c3aed',
      purple700: '#6d28d9',
      purple800: '#5b21b6',
      purple900: '#4c1d95',
      gray50: '#fafafa',
      gray100: '#f4f4f5',
      gray200: '#e4e4e7',
      gray300: '#d4d4d8',
      gray400: '#a1a1aa',
      gray500: '#71717a',
      gray600: '#52525b',
      gray700: '#3f3f46',
      gray800: '#27272a',
      gray900: '#18181b',
      red200: '#fecaca',
      red500: '#ef4444',
      green200: '#bbf7d0',
      green500: '#22c55e',
    },
  },
  media: {
    xs: '(max-width: 320px)',
    sm: '(min-width: 480px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1200px)',
  },
});
