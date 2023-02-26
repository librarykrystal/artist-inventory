import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";


  // this component will show INDIVIDUAL LIST ITEM DETAILS

function ItemDetails() {

  const user = useSelector((store) => store.user);
  const item = useSelector((store) => store.item);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ 
        type: 'FETCH_ITEM',
        payload: id
    });
}, []);


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Item ID is: {id}</p>
      <p>This is where the details will be!</p>

      <p>DATA TEST: {JSON.stringify(item)}</p>

      {/* <LogOutButton className="btn" /> */}
      <Link to={`/`}>HOME</Link>
    </div>
  );
}

export default ItemDetails;