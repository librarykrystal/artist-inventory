import React, { useState, useEffect, useLayoutEffect } from "react";
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
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

function LoginPage() {
  
  const history = useHistory();

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="regContainer">
        <LoginForm />
        <center>
          <Typography variant="h6" mt={3} mb={1} gutterBottom>Not registered?</Typography>

          {/* button to go to REGISTER FORM instead */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              history.push('/registration');
            }}>REGISTER
          </Button>
          
        </center>
      </div>
    </ThemeProvider>
  );
}

export default LoginPage;
