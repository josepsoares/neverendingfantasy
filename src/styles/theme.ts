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
    heading: "'Karla', sans-serif",
    body: "'Karla', sans-serif"
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
  styles: {
    global: {
      body: {
        fontSize: '20px',
        padding: 0,
        margin: 0
      },
      h1: {
        fontFamily: 'FinalFantasyFont !important',
        fontSize: '8rem'
      },
      h2: {
        fontFamily: 'FinalFantasyFont !important'
      },
      'h1, h2, h3': {
        letterSpacing: '0.35rem',
        maxWidth: '100% !important'
      },
      '#nprogress .bar': {
        height: '10px !important'
      },
      '.overlay-img': {
        opacity: 0.1,
        zIndex: '-100'
      },
      '.overlay-img-round': {
        opacity: 0.4,
        zIndex: -100,
        borderRadius: '24px'
      },
      'nav ol li': {
        listStyleType: 'none'
      },
      'nav ol': {
        margin: 0,
        padding: 0,
        display: 'inline-flex'
      }
    }
  },

  ...config
});
