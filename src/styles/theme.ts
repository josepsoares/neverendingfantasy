import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
  '2xl': '1920px',
  '3xl': '2560px'
};

export const nfTheme = extendTheme({
  breakpoints,
  fonts: {
    heading: 'var(--ff-font), sans-serif',
    body: "'var(--karla-font)', sans-serif"
  },
  colors: {
    brand: {
      100: '#7792ca',
      200: '#6180c1',
      300: '#4a6db9',
      400: '#345bb0',
      500: '#1d49a7',
      600: '#1a4296',
      700: '#173a86',
      800: '#143375',
      900: '#112c64'
    }
  },
  ...config
});
