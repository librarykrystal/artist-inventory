import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './UserHome.css';

  // this component will show MAIN INVENTORY LIST

function UserHome() {

  const user = useSelector((store) => store.user);
  const inventory = useSelector(store => store.inventory);
  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_INVENTORY' });
  }, []);


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is your inventory!</p>

      {inventory.length > 0 &&
        <>
          {inventory.map(item => {
              return(
                <div className="listItemContainer" key={item.id}>
                  <h3 className="listItemName">{item.name}</h3>
                  <p className="listItemDetails">{item.brand}</p>
                  <p className="listItemDetails">{item.medium}</p>
                  {item.favorite == true &&
                    <p>♥</p>
                  }
                </div>
              );
          })}
        </>
      }


    <p>DATA TEST: {JSON.stringify(inventory)}</p>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default UserHome;