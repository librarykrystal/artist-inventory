import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import WarningIcon from '@mui/icons-material/Warning';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

// Material UI Theming
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

  const user = useSelector((store) => store.user);
  const item = useSelector((store) => store.item);
  let ope = item.opacity * 2; 
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // Fetches item details on page load
    dispatch({ 
        type: 'FETCH_ITEM',
        payload: id
    });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const faveIt = () => {
    dispatch({ 
      type: 'FAVE_IT',
      payload: {id, favorite: true}
    });
    // Updated item details are then immediately fetched within the saga that catches this
  }

  const unfaveIt = () => {
    dispatch({ 
      type: 'UNFAVE_IT',
      payload: {id, favorite: false}
    });
    // Updated item details are then immediately fetched within the saga that catches this
  }

  // (triggered by EDIT BUTTON) - goes to edit page for this item:
  const goEdit = () => {
    console.log('goEdit CLICKED');
    history.push('/edit');
  }

  // (triggered by MOVE TO INVENTORY BUTTON) — moves item from wishlist to main inventory:
  const inventoryMe = () => {
    dispatch({ 
      type: 'UNWISH_IT',
      payload: {id, wishlist: false}
    });
    // Updated item details are then immediately fetched within the saga that catches this
  }

    // (triggered by MOVE TO WISHLIST BUTTON) — moves item from main inventory to wishlist:
    const wishlistMe = () => {
      dispatch({ 
        type: 'WISH_IT',
        payload: {id, wishlist: true}
      });
      // Updated item details are then immediately fetched within the saga that catches this
    }

  // (triggered by DELETE BUTTON) deletes this item by its ID and goes back HOME:
  const deleteMe = (event) => {
    event.preventDefault();
    dispatch({ 
      type: 'DELETE_ITEM',
      payload: id
    });
    history.push("/");
  }

  return (
    <ThemeProvider theme={theme}>

    <div className="noFilterBarContainer">
      {/* ALL housed in CONDITIONAL RENDER
          to avoid error if page loads before useEffect Redux chain finishes */}
      { item &&
        <>
          {/* CONDITIONAL RENDER — shows appropriate icon header (inventory or wishlist) */}
          { item.wishlist ?
          <LoyaltyIcon sx={{ fontSize: 42 }} />
          :
          <CheckBoxIcon sx={{ fontSize: 42 }} />
          }
          <br /><br />

          {/* ITEM NAME */}
          <Typography variant="h5" sx={{ fontWeight: 700 }} mt={-2} mb={2} gutterBottom>{item.name}</Typography>

          {/* IF TOXIC, show ICON */}
          { item.toxic == true && <WarningIcon sx={{ marginBottom: '10px'}} /> }

          {/* ITEM BODY and MEDIUM */}
          <Typography variant="body1" sx={{ fontSize: 18 }} gutterBottom>{item.body} {item.medium}</Typography>

          {/* BRAND */}
          <Typography variant="body1" color="secondary" sx={{ fontSize: 18 }} mt={-0.5} gutterBottom>{item.brand}</Typography>

          {/* PRODUCT LINE */}
          <Typography variant="body1" color="secondary" sx={{ fontSize: 18 }} mt={-0.5} mb={3} gutterBottom>{item.line}</Typography>

          {/* CONDITIONAL RENDER — shows block of hex color if there is a hex value entered */}
          {item.hex &&
          <>
            <div 
              style={{ 
                backgroundColor: `${item.hex}`,
                border: `2px solid black`,
                height: `80px`,
                width: `80px`
              }}>
            </div>
            <br/>
            </>
          }

          {/* CONDITIONAL RENDER — shows opacity bar only if there is an integer value in the database */}
          {item.opacity !== null &&
            <>
            {/* OPACITY */}
              <div style={{ width: '300px', height: '20px', display: 'flex', margin: '20px 0px 15px 0px'}}>
                <Typography variant="body1" sx={{ fontSize: 18 }} mr={1} mt={-0.5} gutterBottom>Opacity</Typography>
                {/* Opacity Bar */}
                <div
                  style={{
                    width: '200px',
                    height: '15px',
                    backgroundColor: 'white',
                    border: '2px solid black'
                  }}>
                {/* Fill of Opacity Bar */}
                  <div
                    style={{
                      width: `${ope}px`,
                      height: '15px',
                      backgroundColor: 'dimGray'
                    }}>
                  </div>
                </div>
              </div>
            </>
          }

          {/* SIZE and CONTAINER */}
          <Typography variant="body1" sx={{ fontSize: 18 }} margin={0} gutterBottom>{item.size} {item.container}</Typography>

          {/* notes label */}
          <Typography variant="body1" sx={{ fontSize: 18 }} mt={4} fontWeight="bold" gutterBottom>NOTES:</Typography>

          {/* CONDITIONAL RENDER — shows note if there are any, shows italic "none" otherwise */}
          <div className="notesText">
          { item.notes ? 
            <Typography variant="body1" sx={{ fontSize: 18 }} mb={1} gutterBottom>{item.notes}</Typography>
          :
            <Typography variant="body1" mb={1} sx={{ fontSize: 18 }} fontStyle="italic" color="gray" gutterBottom> none</Typography>
          }
          </div>
          <br/>

          {/* CONDITIONAL RENDER — clickable heart icon to FAVORITE/UNFAVORITE */}
          { item.favorite == true ?
            <IconButton aria-label="unfavorite" onClick={unfaveIt}>
              <FavoriteIcon sx={{ marginBottom: '10px'}} fontSize="large" />
            </IconButton>
          :
            <IconButton aria-label="favorite" onClick={faveIt}>
              <FavoriteBorderIcon sx={{ marginBottom: '10px'}} fontSize="large" />
            </IconButton>
          }
        </>
      }
      <br />

      {/* EDIT button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<EditIcon />}
        onClick={goEdit}>EDIT
      </Button>
      <br /><br />

      {/* MOVE TO INVENTORY button */}
      {/* CONDITIONAL RENDER — only shows if item is currently on wishlist */}
      {item.wishlist &&
      <>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<CheckBoxIcon />}
          onClick={inventoryMe}>MOVE TO INVENTORY
        </Button>
        <br /><br />
      </>
      }

      {/* MOVE TO WISHLIST button */}
      {/* CONDITIONAL RENDER — only shows if item is currently in inventory */}
      {!item.wishlist &&
      <>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<LoyaltyIcon />}
          onClick={wishlistMe}>MOVE TO WISHLIST
        </Button>
        <br /><br />
      </>
      }

      {/* DELETE button */}
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