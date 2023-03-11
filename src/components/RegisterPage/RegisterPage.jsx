import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';

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

  return (
    <ThemeProvider theme={theme}>
    <div className="regContainer">
      <RegisterForm />

      <center>
        {/* <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button> */}

            <Typography variant="h6" mt={3} mb={1} gutterBottom>Already registered?</Typography>

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
