import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      grey: string;
      darkGrey: string;
      lightGrey: string;
      primaryAccentColor: string;
      secondaryAccentColor: string;
    };
    fontSizes: {
      small: string;
      normal: string;
      smedium: string;
      medium: string;
      emedium: string;
      large: string;
      elarge: string;
      slarge: string;
      btn: string;
    };
    fontWeights: {
      light: number;
      normal: number;
      bold: number;
    };
    borderRadius: {
      small: string;
      normal: string;
      large: string;
      circle: string;
    };
    width: {
      small: string;
      medium: string;
      large: string;
      elarge: string;
    };
    transition: {
      normal: string;
      medium: string;
    };
  }
}
