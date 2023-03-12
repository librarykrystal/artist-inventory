import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import LoginIcon from '@mui/icons-material/Login';

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

function LandingPage() {

  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="noFilterBarContainer">
        <Typography variant="h4" mt={1} mb={0} gutterBottom>Hello!</Typography>
          <div className="landingTextContainer">
            <Typography variant="body1" mt={2} gutterBottom>
              Welcome to THE RUNDOWN — your place to inventory painting supplies.
            </Typography>
            <br/>
          </div>
          <div className="landingRegFormContainer">
            <RegisterForm />
            <center>
            <Typography variant="h6" mt={3} mb={1} gutterBottom>Already registered?</Typography>

              {/* LOG IN button */}
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<LoginIcon />}
                onClick={onLogin}>LOGIN
              </Button>

            </center>
          </div>
        </div>
    </ThemeProvider>
  );
}

export default LandingPage;
