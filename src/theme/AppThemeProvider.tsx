// src/theme/AppThemeProvider.ts

import type { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";

interface Props {
  children: ReactNode;
}

export function AppThemeProvider({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}