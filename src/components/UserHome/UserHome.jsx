import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
    alert: {
      main: grey[700],
      contrastText: "#fff",
    },
  },
});

function UserHome() {

  const user = useSelector((store) => store.user);
  const inventory = useSelector(store => store.inventory);
  const history = useHistory();
  const dispatch = useDispatch();

  const [typeFilter, setTypeFilter] = useState('');
  const [mediumFilter, setMediumFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [faveFilter, setFaveFilter] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_INVENTORY' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  // LIST FILTERING — by TYPE
  const typeFilterHandler = (item) => {
    if (!typeFilter) {
      return item;
    } else if (item.type == typeFilter) {
      return item;
    }
  }

  // LIST FILTERING — by MEDIUM
  const mediumFilterHandler = (item) => {
    if (!mediumFilter) {
      return item;
    } else if (item.medium == mediumFilter) {
      return item;
    }
  }

  // LIST FILTERING — by BRAND
  const brandFilterHandler = (item) => {
    if (!brandFilter) {
      return item;
    } else if (item.brand == brandFilter) {
      return item;
    // } else if (brandFilter == 'Other') {
    //      IDEA: make an array of brands to loop through, return item if no match?
    }
  }

  // LIST FILTERING — by FAVORITES
  const faveFilterHandler = (item) => {
    if (!faveFilter) {
      return item;
    } else if (faveFilter && item.favorite == true) {
      return item;
    }
  }

  const handleCheckboxFave = () => {
    setFaveFilter(!faveFilter);
  };

  // RESET for ALL FILTERS
  const resetFilters = () => {
    setTypeFilter('');
    setMediumFilter('');
    setBrandFilter('');
    setFaveFilter(false);
  }

  // Route to details of clicked item
  const goToDetails = (itemId) => {
    console.log('goToDetails CLICKED, ID:', itemId);
    dispatch({
        type: 'SET_ITEM_ID',
        payload: itemId
      });
    history.push(`/details/${itemId}`);
}

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <br />

      {/* BEGIN FILTERS BAR housed in MUI ACCORDION*/}

      <div className="filterBar">
        <br/>
        <Accordion sx={{backgroundColor: "black", color: "white", width: "250px"}}>
        
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "white"}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>FILTERS</Typography>
        </AccordionSummary>
        <ClickAwayListener>
        <AccordionDetails
          sx={{
            color: "white",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            }
          }}
        >

          <center>
            <span className="addFaveAndTox">
              {/* CONDITIONAL RENDER — clickable heart toggles filter and heart appearance */}
              { faveFilter == true ?
                <IconButton aria-label="unfavorite" onClick={handleCheckboxFave}>
                  <FavoriteIcon fontSize="large"/>
                </IconButton>
              :
                <IconButton aria-label="favorite" onClick={handleCheckboxFave}>
                  <FavoriteBorderIcon fontSize="large"/>
                </IconButton>
              }
            </span>
          </center>
          <br/>

          {/* DROPDOWN input for FILTERING by TYPE */}
          <FormControl fullWidth>
            <InputLabel  sx={{color: "white"}} id="type">Type</InputLabel>
            <Select
              sx={{width: "220px", color: "white"}}
              labelId="type"
              id="type"
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Additive">Additive</MenuItem>
              <MenuItem value="Color">Color</MenuItem>
              <MenuItem value="Gesso">Gesso</MenuItem>
              <MenuItem value="Ground">Ground</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Paste">Paste</MenuItem>
              <MenuItem value="Primer">Primer</MenuItem>
              <MenuItem value="Solvent">Solvent</MenuItem>
              <MenuItem value="Varnish">Varnish</MenuItem>
            </Select>
          </FormControl>
          <br/><br/>

          {/* DROPDOWN input for FILTERING by MEDIUM */}
          <FormControl fullWidth>
            <InputLabel sx={{color: "white"}} id="medium">Medium</InputLabel>
            <Select
              sx={{width: "220px", color: "white"}}
              labelId="medium"
              id="medium"
              value={mediumFilter}
              label="Medium"
              onChange={(e) => setMediumFilter(e.target.value)}
            >
              <MenuItem value="">All Mediums</MenuItem>
              <MenuItem value="Acrylic">Acrylic</MenuItem>
              <MenuItem value="Enamel">Enamel</MenuItem>
              <MenuItem value="Gouache">Gouache</MenuItem>
              <MenuItem value="Ink">Ink</MenuItem>
              <MenuItem value="Oil">Oil</MenuItem>
              <MenuItem value="Pastel">Pastel</MenuItem>
              <MenuItem value="Watercolor">Watercolor</MenuItem>
            </Select>
          </FormControl>
          <br/><br/>

          {/* DROPDOWN input for FILTERING by BRAND */}
          <FormControl fullWidth>
            <InputLabel sx={{color: "white"}} id="brand">Brand</InputLabel>
            <Select
              sx={{width: "220px", color: "white"}}
              labelId="brand"
              id="brand"
              value={brandFilter}
              label="Brand"
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <MenuItem value="">All Brands</MenuItem>
              <MenuItem value="Blick">Blick</MenuItem>
              <MenuItem value="Gamblin">Gamblin</MenuItem>
              <MenuItem value="Golden Artist Colors">Golden Artist Colors</MenuItem>
              <MenuItem value="Grumbacher">Grumbacher</MenuItem>
              <MenuItem value="Holbein">Holbein</MenuItem>
              <MenuItem value="Liquitex">Liquitex</MenuItem>
              <MenuItem value="Rembrandt">Rembrandt</MenuItem>
              <MenuItem value="Sennelier">Sennelier</MenuItem>
              <MenuItem value="Stuart Semple">Stuart Semple</MenuItem>
              <MenuItem value="Utrecht">Utrecht</MenuItem>
              <MenuItem value="Willaimsburg">Willaimsburg</MenuItem>
              <MenuItem value="Winsor & Newton">Winsor & Newton</MenuItem>
            </Select>
          </FormControl>
          <br /><br /><br />

          {/* RESET FILTERS button */}
          <center>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<RestartAltIcon />}
              onClick={resetFilters}>RESET ALL
            </Button>
          </center>
        </AccordionDetails>
        </ClickAwayListener>
      </Accordion>
      </div>
      {/* END of FILTERS BAR housed in MUI ACCORDION*/}


      {/* BEGIN INVENTORY LIST */}
      <div className="invList">
      {/* CONDITIONAL RENDER — prevents list trying to render before reducer is populated */}
      {inventory.length >0 &&
          <div>
            {/* Applying filters before rendering list items */}
            {inventory
              .filter(typeFilterHandler)
              .filter(mediumFilterHandler)
              .filter(brandFilterHandler)
              .filter(faveFilterHandler)
              .map(item => {
              return(
                // each item is rendered in a clickable div that routes to item's details page
                <div className="listItemContainer" key={item.id} onClick={() => goToDetails(item.id)}>
                  <div className="listingInfoContainer">
                    {/* ITEM DETAILS: */}
                    <Typography variant="h5" sx={{ fontWeight: 700 }} margin={0}  gutterBottom>{item.name}</Typography>
                    <Typography variant="body1" color="gray" margin={0} gutterBottom>{item.brand}</Typography>
                    <Typography variant="body1" margin={0} gutterBottom>
                      {item.line}{' '}
                      {item.medium}{' '}
                      {/* CONDITIONAL RENDER — show "Marker" container info on main listings */}
                      {item.container == 'Marker' && `${item.container}`}{' '}
                      {/* CONDITIONAL RENDER — only show type when one of these */}
                      {item.type == 'Additive'
                        || item.type == 'Ground'
                        || item.type == 'Medium'
                        || item.type == 'Paste'
                        || item.type == 'Primer'
                        || item.type == 'Varnish' ? `${item.type}` : null}
                    </Typography>
                    <p className="listHeart">
                      {/* CONDITIONAL RENDER — favorite and toxicity icons */}
                      {item.favorite == true && <FavoriteIcon />}
                      {item.toxic == true && <WarningIcon />}
                    </p>
                  </div>
                  <div className="listingColorContainer">
                    {/* CONDITIONAL RENDER — show hex color block if there is hex data */}
                    {item.hex &&
                      <div className="listColorBlock" style={{ 
                        backgroundColor: `${item.hex}` }}>
                      </div>
                    }  
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
    </ThemeProvider>
  );
}

export default UserHome;