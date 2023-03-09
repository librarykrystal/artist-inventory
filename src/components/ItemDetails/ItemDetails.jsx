import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import WarningIcon from '@mui/icons-material/Warning';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d9d9d9',
    },
    secondary: {
      main: grey[700],
      contrastText: "#fff",
    },
  },
});

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

  const goEdit = () => {
    console.log('goEdit CLICKED');
    history.push('/edit');
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
    <ThemeProvider theme={theme}>

    <div className="container">
      { item &&
      <>
      {/* <p>Welcome, {user.username}!</p>
      <p>Item ID is: {id}</p> */}
      {/* <p>This is where the details live!</p> */}
      
      <h2>{item.name}</h2>
      { item.toxic == true && <WarningIcon /> }
      <p>{item.body} {item.medium}</p>

      {item.type == 'Color' &&
      <div 
        style={{ 
          backgroundColor: `${item.hex}`,
          border: `2px solid black`,
          height: `80px`,
          width: `80px`
        }}>
      </div>
      }

{ item.type == 'Gesso' &&
      <div 
        style={{ 
          backgroundColor: `${item.hex}`,
          border: `2px solid black`,
          height: `80px`,
          width: `80px`
        }}>
      </div>
      }

      

      <p>{item.brand}</p>
      {item.line && <p>{item.line}</p> }
      <p>{item.size} {item.container}</p>
      {/* <p>FAMILY: {item.family}</p> */}

      <p className="notesLabel">NOTES: </p>
      <div className="notesText" >
        { item.notes ? ` ${item.notes}` :
          <p className="notesText" style={{fontStyle: `italic`, color: 'grey'}}> none</p>
        }
      </div>

      {/* { item.toxic == true && <p>☠️</p> } */}

      {/* { item.favorite == true && <p>♥</p> }
      { item.favorite == false && <p>♡</p> } */}

      { item.favorite == true &&
        <IconButton aria-label="unfavorite" onClick={unfaveIt}>
          <FavoriteIcon />
        </IconButton>
        // <button onClick={unfaveIt}>UNFAVORITE</button>
      }

      { item.favorite == false &&
      <IconButton aria-label="favorite" onClick={faveIt}>
        <FavoriteBorderIcon />
      </IconButton>
        // <button onClick={faveIt}>FAVORITE</button>
      }

      {/* <p>DATA TEST: {JSON.stringify(item)}</p> */}
      </>
      }

      {/* <LogOutButton className="btn" /> */}
      {/* <Link to={`/`}>HOME</Link> */}
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<EditIcon />}
        onClick={goEdit}>EDIT
      </Button>
      {/* <button onClick={goEdit}>EDIT</button> */}
      <br />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteForeverIcon />}
        onClick={deleteMe}>DELETE
      </Button>
      {/* <button onClick={deleteMe}>DELETE</button> */}
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<HomeIcon />}
        onClick={goBack}>HOME
      </Button>
      {/* <button onClick={goBack}>HOME</button> */}
    </div>
    </ThemeProvider>
  );
}

export default ItemDetails;