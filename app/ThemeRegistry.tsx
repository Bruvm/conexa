'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import darkTheme from './theme';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
