import React from 'react';
import './Footer.css';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';

// Material UI Theming
const theme = createTheme({
  typography: {
    fontFamily: [
      'Cabin',
    ],
  },
  palette: {
    primary: {
      main: '#d9d9d9',
    },
    secondary: {
      main: grey[700],
      contrastText: "#fff",
    },
  },
});

function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <div className="footer">
        <Typography variant="body1" gutterBottom>&copy; Krystal Frost</Typography>
      </div>
    </ThemeProvider>
  );
}

export default Footer;
