import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";


function ItemDetails() {

  // const user = useSelector((store) => store.user);
  const item = useSelector((store) => store.item);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  // const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    dispatch({ 
        type: 'FETCH_ITEM',
        payload: id
    });
  }, []);

  const faveIt = () => {
    dispatch({ 
      type: 'FAVE_IT',
      payload: {id, favorite: true}
    });
  //   dispatch({ 
  //     type: 'FETCH_ITEM',
  //     payload: id
  // });
  }

  const unfaveIt = () => {
    dispatch({ 
      type: 'UNFAVE_IT',
      payload: {id, favorite: false}
    });
  //   dispatch({ 
  //     type: 'FETCH_ITEM',
  //     payload: id
  // });
  }

  const deleteMe = (event) => {
    event.preventDefault();
    dispatch({ 
      type: 'DELETE_ITEM',
      payload: id
    });
    history.push("/");
  }

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

      <p>{item.brand}</p>
      <p>{item.size} {item.container}</p>
      {/* <p>FAMILY: {item.family}</p> */}
      <p>NOTES: {item.notes}</p>



      {/* START LIKE KERFUFFLE */}

      { item.favorite == true && <p>♥</p> }
      { item.favorite == false && <p>♡</p> }

      { item.favorite == true &&
        <button onClick={unfaveIt}>UNFAVORITE</button>
      }

      { item.favorite == false &&
        <button onClick={faveIt}>FAVORITE</button>
      }

      {/* END LIKE KERFUFFLE */}



      {/* <p>DATA TEST: {JSON.stringify(item)}</p> */}
      </>
}

      {/* <LogOutButton className="btn" /> */}
      {/* <Link to={`/`}>HOME</Link> */}
      <br />
      <button onClick={deleteMe}>DELETE THIS ITEM</button>
      <br />
      <button onClick={goBack}>HOME</button>
    </div>
  );
}

export default ItemDetails;