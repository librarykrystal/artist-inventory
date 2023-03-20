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
          <Typography variant="h3" mt={3} mb={7} gutterBottom>Hello!</Typography>
          {/* <Typography variant="h4" mt={5} mb={-0.1} sx={{ fontSize: 22 }} gutterBottom>My name is</Typography>
          <Typography variant="h4" mt={0} sx={{ fontSize: 32 }} gutterBottom>Krystal Frost.</Typography>
          <Typography variant="body1" mt={3} mb={8} sx={{ fontSize: 21 }} gutterBottom>I am a software developer, designer, and painter.</Typography> */}
        </div>

        <div className="qrLinkBoxSingle">
          <img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fwww.krystalfrost.com%2F&chs=180x180&choe=UTF-8&chld=L|2" rel="nofollow" alt="qr code"/>
        </div>

        <div className="notesText">
          <Typography variant="h4" mt={3} mb={8} sx={{ fontSize: 32, letterSpacing: 4 }} gutterBottom>www.krystalfrost.com</Typography>
        </div>

      </div>
    </ThemeProvider>
  );
}

export default AboutPage;
