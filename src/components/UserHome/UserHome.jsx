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

  const [typeFilter, setTypeFilter] = useState('All Types');

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
      <h4>Welcome, {user.username}!</h4>
      {/* <p>Your ID is: {user.id}</p> */}
      <button onClick={goAdd}>ADD NEW ITEM</button>
      </div>
      <br />

{/* BEGIN FILTERS BAR */}

      <div className="filterBar">
        {/* <p className="filterText">(This is where sort/filter options will go.)</p> */}
       
        <select
          className="filterDropDown"
          defaultValue="All Types"
          onChange={(e) => setTypeFilter(e.target.value)}>
              {/* <option disabled >Choose</option> */}
              <option value="All Types">All Types</option>
              <option value="Additive">Additive</option>
              <option value="Color">Color</option>
              {/* <option value="Gel">Gel</option> */}
              <option value="Gesso">Gesso</option>
              <option value="Ground">Ground</option>
              <option value="Medium">Medium</option>
              <option value="Paste">Paste</option>
              <option value="Primer">Primer</option>
              <option value="Solvent">Solvent</option>
              <option value="Varnish">Varnish</option>
        </select>
      </div>

{/* END FILTERS BAR */}


      <div className="invList">


{/* FILTER EXPERIMENTING STARTS HERE */}

      {/* FILTERING FOR TYPE */}
      {inventory.length >0 &&
        <div>
          {typeFilter != 'All Types' ? 
            <div>
              {inventory.filter(item => item.type==`${typeFilter}`).map(item => {
                return(
                  <div className="listItemContainer" key={item.id} onClick={() => goToDetails(item.id)}>
                    <div className="listingInfoContainer">
                      <h3 className="listItemName">{item.name}</h3>
                      <p className="listItemBrand">{item.brand}</p>
                      <p className="listItemDetails">{item.line} {item.medium}</p>
                      {item.favorite == true && <p className="listHeart">♥</p>}
                    </div>
                    <div className="listingColorContainer">
                      {item.hex &&
                        <div style={{ 
                            backgroundColor: `${item.hex}`,
                            border: `2px solid black`,
                            height: `82px`,
                            width: `82px` }}>
                        </div>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          :
            <div>
              {inventory.map(item => {
              return(
                <div className="listItemContainer" key={item.id} onClick={() => goToDetails(item.id)}>
                  <div className="listingInfoContainer">
                    <h3 className="listItemName">{item.name}</h3>
                    <p className="listItemBrand">{item.brand}</p>
                    <p className="listItemDetails">{item.line} {item.medium}</p>
                    {item.favorite == true &&
                      <p className="listHeart">♥</p>
                    }
                  </div>
                  <div className="listingColorContainer">
                    {item.hex &&
                      <div 
                        style={{ 
                          // backgroundImage: `linear-gradient(to bottom right, ${item.hex}, black)`,
                          backgroundColor: `${item.hex}`,
                          // backgroundImage: `linear-gradient(to bottom right, ${item.glazehex}, ${item.masstonehex})`,
                          border: `2px solid black`,
                          height: `82px`,
                          width: `82px`
                        }}>
                      </div>
                    }
                  </div>
                </div>
              );
          })}
            </div>
          }
        </div>
      }


{/* BELOW IS ORIGINAL WORKING LIST WITH NO FILTERING */}

      {/* {inventory.length > 0 &&
        <>
          {inventory.map(item => {
              return(
                <div className="listItemContainer" key={item.id} onClick={() => goToDetails(item.id)}>
                  <div className="listingInfoContainer">
                    <h3 className="listItemName">{item.name}</h3>
                    <p className="listItemBrand">{item.brand}</p>
                    <p className="listItemDetails">{item.line} {item.medium}</p>
                    {item.favorite == true &&
                      <p className="listHeart">♥</p>
                    }
                  </div>
                  <div className="listingColorContainer">
                    {item.hex &&
                      <div 
                        style={{ 
                          // backgroundImage: `linear-gradient(to bottom right, ${item.hex}, black)`,
                          backgroundColor: `${item.hex}`,
                          // backgroundImage: `linear-gradient(to bottom right, ${item.glazehex}, ${item.masstonehex})`,
                          border: `2px solid black`,
                          height: `82px`,
                          width: `82px`
                        }}>
                      </div>
                    }
                  </div>
                </div>
              );
          })}
        </>
      } */}
      </div>


    {/* <p>DATA TEST: {JSON.stringify(inventory)}</p> */}
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default UserHome;