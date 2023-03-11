import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import WarningIcon from '@mui/icons-material/Warning';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';



const theme = createTheme({
  typography: {
    fontFamily: [
      'Cabin',
    ],
  },
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

    <br/>
    <div className="addOrEditContainer">
      { item &&
        <>
          <Typography variant="h5" sx={{ fontWeight: 700 }} mt={4} mb={2}  gutterBottom>{item.name}</Typography>

          { item.toxic == true && <WarningIcon /> }

          <Typography variant="body1" margin={1.5} gutterBottom>{item.body} {item.medium}</Typography>

          {item.hex &&
            <div 
              style={{ 
                backgroundColor: `${item.hex}`,
                border: `2px solid black`,
                height: `80px`,
                width: `80px`
              }}>
            </div>
          }

          <Typography variant="body1" margin={1.5} gutterBottom>{item.brand}</Typography>

          {item.line &&
            <Typography variant="body1" margin={1} gutterBottom>{item.line}</Typography>
          }

          <Typography variant="body1" margin={0} gutterBottom>{item.size} {item.container}</Typography>
          {/* <p>FAMILY: {item.family}</p> */}

          <Typography variant="body1" mt={4} fontWeight="bold" gutterBottom>NOTES:</Typography>

          { item.notes ? 
            <Typography variant="body1" mb={1} gutterBottom>{item.notes}</Typography>
          :
            <Typography variant="body1" mb={1} fontStyle="italic" color="gray" gutterBottom> none</Typography>
            // <p className="notesText" style={{fontStyle: `italic`, color: 'grey'}}> none</p>
          }

          <br/>

          { item.favorite == true ?
            <IconButton aria-label="unfavorite" onClick={unfaveIt}>
              <FavoriteIcon fontSize="large" />
            </IconButton>
          :
            <IconButton aria-label="favorite" onClick={faveIt}>
              <FavoriteBorderIcon fontSize="large" />
            </IconButton>
          }
        </>
      }

      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<EditIcon />}
        onClick={goEdit}>EDIT
      </Button>

      <br /><br />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<DeleteForeverIcon />}
        onClick={deleteMe}>DELETE
      </Button>

    </div>
    </ThemeProvider>
  );
}

export default ItemDetails;