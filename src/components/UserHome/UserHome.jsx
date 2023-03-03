import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './UserHome.css';

  // this component will show MAIN INVENTORY LIST

function UserHome() {

  const user = useSelector((store) => store.user);
  const inventory = useSelector(store => store.inventory);
  const history = useHistory();
  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_INVENTORY' });
  }, []);

  const goToDetails = (itemId) => {
    console.log('goToDetails CLICKED, ID:', itemId);
    // set reducer to this movie's ID (dispatch)
    dispatch({
        type: 'SET_ITEM_ID',
        payload: itemId
      });
    history.push(`/details/${itemId}`);
}

  const goAdd = () => {
    console.log('goAdd CLICKED');
    history.push('/add');
  }

  return (
    <div className="container">
      <div className="homeHeader">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <button onClick={goAdd}>ADD NEW ITEM</button>

      </div>

      <div className="invList">
      {inventory.length > 0 &&
        <>
          {inventory.map(item => {
              return(
                <div className="listItemContainer" key={item.id} onClick={() => goToDetails(item.id)}>
                  <div className="listingInfoContainer">
                    <h3 className="listItemName">{item.name}</h3>
                    <p className="listItemDetails">{item.brand}</p>
                    <p className="listItemDetails">{item.medium}</p>
                    {item.favorite == true &&
                      <p>♥</p>
                    }
                  </div>
                  <div className="listingColorContainer">

                  {item.type == 'Color' &&
                    <div 
                      style={{ 
                        // backgroundImage: `linear-gradient(to bottom right, ${item.hex}, black)`,
                        backgroundColor: `${item.hex}`,
                        // backgroundImage: `linear-gradient(to bottom right, ${item.glazehex}, ${item.masstonehex})`,
                        border: `2px solid black`,
                        height: `80px`,
                        width: `80px`
                      }}>
                    </div>
                  }

                  {item.type == 'Gesso' &&
                    <div 
                      style={{ 
                        // backgroundImage: `linear-gradient(to bottom right, ${item.hex}, black)`,
                        backgroundColor: `${item.hex}`,
                        // backgroundImage: `linear-gradient(to bottom right, ${item.glazehex}, ${item.masstonehex})`,
                        border: `2px solid black`,
                        height: `80px`,
                        width: `80px`
                      }}>
                    </div>
                  }

                  </div>

                </div>
                
              );
          })}
        </>
      }
      </div>


    {/* <p>DATA TEST: {JSON.stringify(inventory)}</p> */}
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default UserHome;