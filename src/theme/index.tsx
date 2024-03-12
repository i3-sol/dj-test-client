import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      xs: true
      sm: true
      md: true
      lg: true
      xl: true
      xl2: true
    }
  
    interface CommonColors {
      primaryMain: string
      primaryLight: string
      primaryDark: string
      primaryBorder: string
      disabledColor: string
      activeColor: string
  
      baseBg: string
      mainBg: string
      mainShadow: string
    }
  
    // interface Palette {
    //   mainBg: PaletteColor;
    // }
  
    // interface PaletteOptions {
    //   mainBg: PaletteColorOptions;
    // }
  }
  
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      // mainBg: true;
    }
  }
  
  const MuiThemeProvider = ({ children }: any) => {
    const theme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 576,
          md: 640,
          lg: 768,
          xl: 1024,
          xl2: 1280,
        }
      },
  
      palette: {
        // mode: "dark",
        common: {
          black: '#000',
          white: '#fff',
  
          primaryMain: "#0376c9",
          primaryLight: "#0376c919",
          primaryDark: "#f2f4f6",
          primaryBorder: "#d6d9dc",
  
          disabledColor: "#d6d9dc",
          activeColor: "#28a745",
  
          baseBg: "#f2f4f6",
          mainBg: '#ffffff',
          mainShadow: "#0000001a",
        },
  
        // mainBg: { main: '#141416', light: '#24262f', contrastText: "#fff" },
        // primary: { main: '#fff', light: '#f55b00', dark: '#1e0500', contrastText: 'rgba(0,0,0,0.87)' },
      },
  
      typography: {
        allVariants: { color: "#24272a" },
        htmlFontSize: 16,
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 800,
  
        fontFamily: `"Euclid Circular B", "Roboto", sans-serif`
      },
    })
  
    theme.typography.h1 = {
      ...theme.typography.h1,
  
      fontSize: 35,
      fontWeight: 800,
    }
  
    theme.typography.h2 = {
      ...theme.typography.h2,
  
      fontSize: 25,
      fontWeight: 500,
    }
  
    theme.typography.h3 = {
      ...theme.typography.h3,
  
      fontSize: 22,
      fontWeight: 400,
    }
  
    theme.typography.h4 = {
      ...theme.typography.h4,
  
      fontSize: 18,
      fontWeight: 400,
    }
  
    theme.typography.h5 = {
      ...theme.typography.h5,
  
      fontSize: 16,
    }
  
    theme.typography.h6 = {
      ...theme.typography.h6,
  
      fontSize: 13,
    }
  
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    )
  }
  
  export { MuiThemeProvider };