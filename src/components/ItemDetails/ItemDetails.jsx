import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

  // this component will show INDIVIDUAL LIST ITEM DETAILS

function ItemDetails() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is where the details will be!</p>
      <LogOutButton className="btn" />
    </div>
  );
}

export default ItemDetails;