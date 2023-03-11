import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import logo from './logo.png';
import logoC from './logoCentered.png';
import logoV from './logoVert.png';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import Button from '@mui/material/Button';
import grey from '@mui/material/colors/grey';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AddBoxIcon from '@mui/icons-material/AddBox';
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
      main: "#fff",
      contrastText: "#fff",
    },
  },
});


function Nav() {
  const user = useSelector((store) => store.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const goBack = (event) => {
    event.preventDefault();
    history.push("/");
  }

  const goInfo = (event) => {
    event.preventDefault();
    history.push("/info");
  }

  const goAbout = (event) => {
    event.preventDefault();
    history.push("/about");
  }

  const goAdd = (event) => {
    event.preventDefault();
    history.push('/add');
  }

  const goLogin = (event) => {
    event.preventDefault();
    history.push('/login');
  }

  // console.log('logo:', logo);

  return (
    <ThemeProvider theme={theme}>
    <div className="navOuterContainer">
    <div className="navMobile">

      <div className="navMobileUpper">
        <Link to="/home">
          <img className="logoImage" src={logoV} alt='logo'/>
        </Link>
      </div>

      {user.id &&
      <div className="navMobileMid">
        {/* <p className="welcomeName">Welcome, {user.username}!</p> */}
        <Typography variant="body1" color="gray" mt={1.1} gutterBottom>Welcome, {user.username}!</Typography>
      </div>
      }

      <div className="navMobileLower">
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          // <Link className="navLink" to="/login">
          //   Login / Register
          // </Link>
          // <Link className="navLinkMobile" to="/login">
          //   Login / Register
          // </Link>

          <span className="navLinkMobile">
          <IconButton aria-label="login or register" className="navLinkMobile" color="secondary" onClick={goLogin}>
            <LoginIcon />
          </IconButton>
          </span>
        )}


        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <span className="navLinkMobile">
              <IconButton aria-label="home" className="navLinkMobile" color="secondary" onClick={goBack}>
                <HomeIcon />
              </IconButton>
            </span>

            <span className="navLinkMobile">
              <IconButton aria-label="add" className="navLinkMobile" color="secondary" onClick={goAdd}>
                <AddBoxIcon />
              </IconButton>
            </span>

            <span className="navLinkMobile">
              <IconButton aria-label="info" className="navLinkMobile" color="secondary" onClick={goInfo}>
                <HelpCenterIcon />
              </IconButton>
            </span>

            <span className="navLinkMobile">
              <IconButton aria-label="logout" className="navLinkMobile" color="secondary" onClick={() => dispatch({ type: 'LOGOUT' })}>
                <LogoutIcon />
              </IconButton>
            </span>

          </>
        )}

        <IconButton aria-label="about" color="secondary" onClick={goAbout}>
          <InfoIcon />
        </IconButton>

      </div>
      </div>
    </div>
    </div>
    </ThemeProvider>
  );
}

export default Nav;
