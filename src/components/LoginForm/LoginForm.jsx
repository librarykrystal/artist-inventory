import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

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

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

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
  }; // end login

  return (
    <ThemeProvider theme={theme}>
    {/* <form className="formPanel" onSubmit={login}> */}
    <div className="registerForm">
    <Typography variant="h4" mt={0} mb={1} gutterBottom>Log In</Typography>
      {/* <h2>Login</h2> */}
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      <div>
        {/* <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label> */}
      

      <TextField id="username" required label="Username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        {/* <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label> */}

        <TextField id="password" required label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {/* <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div> */}

      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<LoginIcon />}
        onClick={login}>SUBMIT
      </Button>

    {/* </form> */}
    </div>
    </ThemeProvider>
  );
}

export default LoginForm;
