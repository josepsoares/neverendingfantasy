import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'FinalFantasyFont';
        src: url('../../public/assets/font/Highwind.ttf') format('truetype');
      }
      `}
  />
);

export default Fonts;
