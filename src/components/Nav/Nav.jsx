import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import logo from './logo.png';


function Nav() {
  const user = useSelector((store) => store.user);

  // console.log('logo:', logo);

  return (
    <div className="navOuterContainer">
    <div className="nav">
      <Link to="/home">
        {/* <h2 className="nav-title">THE RUNDOWN</h2> */}
        <img className="logoImage" src={logo} alt='logo'/>
      </Link>
      {/* <h4 className="subtitle">Artist's Paint Inventory</h4> */}
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Nav;
