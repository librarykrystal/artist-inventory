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

const goBack = (event) => {
  event.preventDefault();
  // clearing out item reducer:
  dispatch({ 
      type: 'CLEAR_ITEM'
  });
  history.push("/");
}


  return (
    <div className="container">
      { item &&
      <>
      {/* <p>Welcome, {user.username}!</p>
      <p>Item ID is: {id}</p> */}
      {/* <p>This is where the details live!</p> */}

      <h2>{item.name}</h2>
      <p>{item.body} {item.medium}</p>

      {/* <p style={{ backgroundColor:`${item.colorhex}` }}>COLOR</p> */}
      <div 
        style={{ 
          backgroundImage: `linear-gradient(to bottom right, ${item.colorhex}, black)`,
          border: `2px solid black`,
          height: `80px`,
          width: `80px`
        }}>
      </div>

      <p>{item.brand}</p>
      <p>{item.size} {item.container}</p>
      <p>FAMILY: {item.family}</p>
      <p>NOTES: {item.notes}</p>

      {item.favorite == true &&
        <p>♥</p>
      }

      <p>DATA TEST: {JSON.stringify(item)}</p>
      </>
}

      {/* <LogOutButton className="btn" /> */}
      {/* <Link to={`/`}>HOME</Link> */}
      <button onClick={goBack}>HOME</button>
    </div>
  );
}

export default ItemDetails;