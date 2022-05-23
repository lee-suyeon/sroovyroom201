import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    common: {
      flexCenter: string;
      flexCenterColumn: string;
    };

    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      titleSize: string;
    };

    colors: {
      mainColor: string,
      baseColor: string,
      textColor: string,
      lightGray: string,
      gray: string,
      lightGreen: string,
      darkGreen: string,
      paleGray: string,
      pink: string,
      white: string
    };

    paddings: {
      sm: string;
      md: string;
    }

    margins: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      interval: string;
    }
  }
}