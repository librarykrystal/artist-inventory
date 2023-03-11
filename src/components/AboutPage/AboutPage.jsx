import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import InfoIcon from '@mui/icons-material/Info';

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

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

return (
  <ThemeProvider theme={theme}>
  <div className="noFilterBarContainer">

  <InfoIcon sx={{ fontSize: 42 }} />

  <Typography variant="body1" mt={5} gutterBottom>This is the public about page.</Typography>

  </div>
  </ThemeProvider>
);
}

export default AboutPage;
