import React, { useEffect, useState, useLayoutEffect } from 'react';

import { useHistory } from 'react-router-dom';
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

function RegisterPage() {

  const history = useHistory();

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <div className="regContainer">
      <RegisterForm />
      <center>
        <Typography variant="h6" mt={3} mb={1} gutterBottom>Already registered?</Typography>

          {/* BUTTON to go to LOGIN instead */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<LoginIcon />}
            onClick={() => {
              history.push('/login');
            }}>LOGIN
          </Button>

      </center>
    </div>
    </ThemeProvider>
  );
}

export default RegisterPage;
