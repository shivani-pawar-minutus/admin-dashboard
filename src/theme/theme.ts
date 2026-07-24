// src/theme/theme.ts

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5a19d2",
    },

    secondary: {
      main: "#9c27b0",
    },

    background: {
      default: "#f4f6f8",
    },
  },

  typography: {
    fontFamily: "Roboto, sans-serif",

    h4: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },
});

export default theme;