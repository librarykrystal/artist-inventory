import React, { useState, useEffect, useLayoutEffect } from "react";

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Button from '@mui/material/Button';
import WebIcon from '@mui/icons-material/Web';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

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

function InfoPage() {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="noFilterBarContainer">
        {/* ICON HEADER at top of page: */}
        <HelpCenterIcon sx={{ fontSize: 42 }} />
        {/* <Typography variant="body1" mt={5} gutterBottom>This is the info page.</Typography> */}
        <br />

        {/* TEXT HEADER */}
        <div className="notesText">
          <Typography variant="h5" mt={1} mb={2.5} gutterBottom>Thanks for checking out my app!</Typography>

          {/* Technologies */}
          <Typography variant="body1" sx={{ fontSize: 18 }} mt={4} fontWeight="bold" gutterBottom>This app was made with:</Typography>
          <div className="notesText">
            <Typography variant="body1" mt={-0.5} gutterBottom>React, Redux, Node, Express, Material-UI,</Typography>
            <Typography variant="body1" mt={-1} gutterBottom>and react-colorful color picker.</Typography>
          </div>
        </div>
        <br/>

        {/* QR codes and links */}
        <div className="qrCodesContainer">
          <div className="qrLinkBoxWebsite">
            <img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fwww.krystalfrost.com%2F&chs=150x150&choe=UTF-8&chld=L|2" rel="nofollow" alt="qr code"/>
            <br/>
            {/* <a href='https://www.krystalfrost.com/'>WEBSITE</a> */}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<WebIcon />}
              href="https://www.krystalfrost.com/"
              >MY WEBSITE
            </Button>
          </div>
          <div className="qrLinkBoxLinkedIn">
            <img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fkrystal-frost&chs=150x150&choe=UTF-8&chld=L|2" alt="qr code"/>
            <br/>
            {/* <a href='https://www.linkedin.com/in/krystal-frost'>LINKEDIN</a> */}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<LinkedInIcon />}
              href="https://www.linkedin.com/in/krystal-frost"
              >LINKEDIN
            </Button>
          </div>
        </div>

        {/* THANKS */}
        <Typography variant="body1" sx={{ fontSize: 18 }} mt={8} fontWeight="bold" gutterBottom>Special Thanks to:</Typography>
          <div className="notesText">
            <Typography variant="body1" mt={-0.5} gutterBottom>All at Prime (including my classmates!)</Typography>
            <Typography variant="body1" mt={-0.5} gutterBottom>who have supported my development into a developer.</Typography>
          </div>

      </div>
    </ThemeProvider>
  );
}

export default InfoPage;
