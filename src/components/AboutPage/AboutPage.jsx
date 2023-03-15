import React, { useLayoutEffect } from "react";

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WebIcon from '@mui/icons-material/Web';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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

function AboutPage() {

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="noFilterBarContainer">
        {/* ICON HEADER at top of page: */}
        <InfoIcon sx={{ fontSize: 42 }} />
        <br />

        {/* "ME" INTRO */}
        <div className="notesText">
          <Typography variant="h4" mt={1} mb={0} gutterBottom>Hello!</Typography>
          <Typography variant="h5" mt={3} gutterBottom>My name is Krystal Frost.</Typography>
          <Typography variant="body1" mt={2} gutterBottom>I am a full stack developer, designer, and painter</Typography>
          <Typography variant="body1" mt={-1} gutterBottom>(and a rescue human adopted by a super great cat).</Typography>
          </div>

      </div>
    </ThemeProvider>
  );
}

export default AboutPage;
