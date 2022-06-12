import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  colors: {
    black: "#1D1D1B",
    white: "#FFF",
    grey: "#D9D9D9",
    lightGrey: "#EFEFEF",
    darkGrey: "#999999", 
    primaryAccentColor: "#56B13D",
    secondaryAccentColor: "#AFD9A3",
  },
  fontSizes: {
    small: "0.8rem",
    normal: "1rem",
    smedium: "1.2rem",
    medium: "1.5rem",
    emedium: "2rem",
    large: "2.5rem",
    elarge: "3.5rem",
    slarge: "5rem",
    btn: "1.2rem",
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700,
  },
  borderRadius: {
    small: "0.1875rem",
    normal: "0.5rem",
    large: "1rem",
    circle: "50%",
  },
  width: {
    small: "576px",
    medium: "928px",
    large: "1280px",
    elarge: "1600px",
  },
  transition: {
    normal: "all 0.2s ease-in-out",
    medium: "all 0.5s ease-in-out",
  },
};

export default defaultTheme;
