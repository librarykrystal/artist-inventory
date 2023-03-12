import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

import logoV from './logoVert.png';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AddBoxIcon from '@mui/icons-material/AddBox';
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
    // clearing out item details reducer anytime we go back HOME:
    dispatch({ 
      type: 'CLEAR_ITEM'
    });
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

  return (
    <ThemeProvider theme={theme}>
    <div className="navOuterContainer">
      <div className="navMobile">
        <div className="navMobileUpper">
          <Link to="/home">
            {/* LOGO IMAGE */}
            <img className="logoImage" src={logoV} alt='logo'/>
          </Link>
        </div>

        {/* CONDITIONAL RENDER — show welcome message when there is a logged-in user */}
        {user.id &&
        <div className="navMobileMid">
          <Typography variant="body1" color="gray" mt={1.1} gutterBottom>Welcome, {user.username}!</Typography>
        </div>
        }

        <div className="navMobileLower">
          <div>
            {/* If no user is logged in, show these links */}
            {!user.id && (
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

            {/* Show this link regardless of login status */}
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
