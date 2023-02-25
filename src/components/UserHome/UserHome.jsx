import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

  // this component will show MAIN INVENTORY LIST

function UserHome() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is where your inventory list will be!</p>
      <LogOutButton className="btn" />
    </div>
  );
}

export default UserHome;