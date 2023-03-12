import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import TextField from '@mui/material/TextField';

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

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="registerForm">
      <Typography variant="h4" mt={0} mb={1} gutterBottom>Register</Typography>

      {/* CONDITIONAL RENDER — shows error if there is one */}
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div>
        {/* TEXT input for USERNAME */}
        <TextField id="username" required label="Username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        {/* TEXT input for PASSWORD */}   
        <TextField id="password" required label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <br />

      {/* SUBMIT button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        onClick={registerUser}>SUBMIT
      </Button>

    </div>
    </ThemeProvider>
  );
}

export default RegisterForm;
