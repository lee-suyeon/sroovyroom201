import { DefaultTheme } from 'styled-components';

const pxToRem = (px: number) => `${px / 16}rem`;

const theme: DefaultTheme = {
  common: {
    flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    flexCenterColumn: `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
  },

  fontSizes: {
    xs: pxToRem(12),
    sm: pxToRem(14),
    md: pxToRem(16),
    lg: pxToRem(18),
    xl: pxToRem(20),
    xxl: pxToRem(24),
    titleSize: pxToRem(50),
  },

  colors: {
    mainColor: '#779482',
    baseColor: '#fafafa',
    textColor: '#333',
    lightGray: '#555',
    gray: '#999',
    lightGreen: '#CBD2CD',
    darkGreen: '#3d4c43',
    paleGray: '#eee',
    pink: '#DD8686',
    white: '#fff'
  },

  paddings: {
    sm: pxToRem(8),
    md: pxToRem(16),
  },
  
  margins: {
    xs: pxToRem(4),
    sm: pxToRem(8),
    md: pxToRem(12),
    lg: pxToRem(16),
    xl: pxToRem(20),
    xxl: pxToRem(24),
    interval: pxToRem(40)
  },
};

export { theme };

export default theme;