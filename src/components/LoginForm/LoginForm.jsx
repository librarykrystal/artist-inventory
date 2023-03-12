import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import TextField from '@mui/material/TextField';
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

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    // Do dispatch only if both username and password have been entered:
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="registerForm">
      <Typography variant="h4" mt={0} mb={1} gutterBottom>Log In</Typography>
      
        {/* CONDITIONAL RENDER — shows error if there is one: */}
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}

        {/* TEXT input for USERNAME */}
        <div>
        <TextField id="username" required label="Username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <br/>

        {/* TEXT input for PASSWORD */}
        <div>
          <TextField id="password" required type="password" label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />

        {/* SUBMIT login button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<LoginIcon />}
          onClick={login}>SUBMIT
        </Button>

      </div>
    </ThemeProvider>
  );
}

export default LoginForm;
