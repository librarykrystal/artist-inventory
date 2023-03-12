import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './UserHome.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


  // this component will show MAIN INVENTORY LIST

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
  // const history = useHistory();

  const [typeFilter, setTypeFilter] = useState('');
  const [mediumFilter, setMediumFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [faveFilter, setFaveFilter] = useState(false);
  // favorite?  Non-toxic?  Discontinued?

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_INVENTORY' });
  }, []);


  // LIST FILTERING
  const typeFilterHandler = (item) => {
    if (!typeFilter) {
      return item;
    } else if (item.type == typeFilter) {
      return item;
    }
  }

  const mediumFilterHandler = (item) => {
    if (!mediumFilter) {
      return item;
    } else if (item.medium == mediumFilter) {
      return item;
    }
  }

  const brandFilterHandler = (item) => {
    if (!brandFilter) {
      return item;
    } else if (item.brand == brandFilter) {
      return item;
    // } else if (brandFilter == 'Other') {
    //      IDEA: make an array of brands to loop through, return item if no match?
    }
  }

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

  const resetFilters = () => {
    setTypeFilter('');
    setMediumFilter('');
    setBrandFilter('');
    setFaveFilter(false);
  }


  const goToDetails = (itemId) => {
    console.log('goToDetails CLICKED, ID:', itemId);
    dispatch({
        type: 'SET_ITEM_ID',
        payload: itemId
      });
    history.push(`/details/${itemId}`);
}

  // const goAdd = () => {
  //   console.log('goAdd CLICKED');
  //   history.push('/add');
  // }

  return (
    <ThemeProvider theme={theme}>

    <div className="container">
      <div className="homeHeader">
      {/* <h4>Welcome, {user.username}!</h4> */}
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<AddToPhotosIcon />}
        onClick={goAdd}>ADD NEW ITEM
      </Button> */}
      </div>
      <br />

{/* BEGIN FILTERS BAR */}

      <div className="filterBar">
       
        {/* <select
          className="filterDropDown"
          defaultValue=""
          onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="Additive">Additive</option>
            <option value="Color">Color</option>
            <option value="Gesso">Gesso</option>
            <option value="Ground">Ground</option>
            <option value="Medium">Medium</option>
            <option value="Paste">Paste</option>
            <option value="Primer">Primer</option>
            <option value="Solvent">Solvent</option>
            <option value="Varnish">Varnish</option>
        </select>

        <select
          className="filterDropDown"
          defaultValue=""
          onChange={(e) => setMediumFilter(e.target.value)}>
            <option value="">All Mediums</option>
            <option value="Acrylic">Acrylic</option>
            <option value="Enamel">Enamel</option>
            <option value="Gouache">Gouache</option>
            <option value="Ink">Ink</option>
            <option value="Oil">Oil</option>
            <option value="Pastel">Pastel</option>
            <option value="Watercolor">Watercolor</option>
        </select>

        <select
          className="filterDropDown"
          defaultValue=""
          onChange={(e) => setBrandFilter(e.target.value)}>
            <option value="">All Brands</option>
            <option value="Blick">Blick</option>
            <option value="Gamblin">Gamblin</option>
            <option value="Golden Artist Colors">Golden Artist Colors</option>
            <option value="Grumbacher">Grumbacher</option>
            <option value="Holbein">Holbein</option>
            <option value="Liquitex">Liquitex</option>
            <option value="Pebeo">Pebeo</option>
            <option value="QoR">QoR</option>
            <option value="Rembrandt">Rembrandt</option>
            <option value="Sennelier">Sennelier</option>
            <option value="Speedball">Speedball</option>
            <option value="Stuart Semple">Stuart Semple</option>
            <option value="Utrecht">Utrecht</option>
            <option value="Willaimsburg">Willaimsburg</option>
            <option value="Winsor & Newton">Winsor & Newton</option>
        </select>

        <input className="filterCheckbox" type="checkbox" onChange={handleCheckboxFave} ></input> Faves Only */}


{/* NEW ACCORDION: */}

<br/>

        <Accordion sx={{backgroundColor: "black", color: "white", width: "250px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "white"}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>FILTERS</Typography>
        </AccordionSummary>
        <AccordionDetails
        // sx={{backgroundColor: "dimgrey", color: "white"}}
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


          {/* <input className="filterCheckbox" type="checkbox" onChange={handleCheckboxFave} ></input> Faves Only */}
         <br/>

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

        <br /><br /><br/>
        <center>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<RestartAltIcon />}
        onClick={resetFilters}>RESET ALL
      </Button>
      </center>


          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
        </AccordionDetails>
      </Accordion>




      </div>

{/* END FILTERS BAR */}


      <div className="invList">

      {inventory.length >0 &&
          <div>
            {inventory
              .filter(typeFilterHandler)
              .filter(mediumFilterHandler)
              .filter(brandFilterHandler)
              .filter(faveFilterHandler)
              .map(item => {
              return(
                <div className="listItemContainer" key={item.id} onClick={() => goToDetails(item.id)}>
                  <div className="listingInfoContainer">
                    {/* <h3 className="listItemName">{item.name}</h3> */}
                    <Typography variant="h5" sx={{ fontWeight: 700 }} margin={0}  gutterBottom>{item.name}</Typography>
                    {/* <p className="listItemBrand">{item.brand}</p> */}
                    <Typography variant="body1" color="gray" margin={0} gutterBottom>{item.brand}</Typography>

                    {/* <p className="listItemDetails"> */}
                    <Typography variant="body1" margin={0} gutterBottom>
                      {item.line}{' '}
                      {item.medium}{' '}
                      {item.container == 'Marker' && `${item.container}`}{' '}
                      {item.type == 'Additive'
                        || item.type == 'Ground'
                        || item.type == 'Medium'
                        || item.type == 'Paste'
                        || item.type == 'Primer'
                        || item.type == 'Varnish' ? `${item.type}` : null}
                    </Typography>

                    <p className="listHeart">
                    {item.favorite == true && <FavoriteIcon />}
                    {item.toxic == true && <WarningIcon />}
                    </p>
                  </div>
                  <div className="listingColorContainer">
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



      {/* BELOW IS FILTERING FOR TYPE ONLY — WORKS */}
      {/* //  {inventory.length >0 && */}
      {/* //   <div>
      //     {typeFilter != "" ?  */}
      {/* //       <div> */}
      {/* //         {inventory.filter(item => item.type==`${typeFilter}`).map(item => { */}
      {/* //           return(
      //             <div className="listItemContainer" key={item.id} onClick={() => goToDetails(item.id)}>
      //               <div className="listingInfoContainer">
      //                 <h3 className="listItemName">{item.name}</h3>
      //                 <p className="listItemBrand">{item.brand}</p>
      //                 <p className="listItemDetails">{item.line} {item.medium}</p>
      //                 {item.favorite == true && <p className="listHeart">♥</p>}
      //               </div>
      //               <div className="listingColorContainer">
      //                 {item.hex && */}
      {/* //                   <div style={{  */}
      {/* //                       backgroundColor: `${item.hex}`,
      //                       border: `2px solid black`,
      //                       height: `82px`,
      //                       width: `82px` }}>
      //                   </div>
      //                 }
      //               </div> */}
      {/* //             </div>
      //           );
      //         })}
      //       </div> */}
      {/* //     :
      //       <div>
      //         {inventory.map(item => { */}
      {/* //         return(
      //           <div className="listItemContainer" key={item.id} onClick={() => goToDetails(item.id)}>
      //             <div className="listingInfoContainer">
      //               <h3 className="listItemName">{item.name}</h3>
      //               <p className="listItemBrand">{item.brand}</p>
      //               <p className="listItemDetails">{item.line} {item.medium}</p>
      //               {item.favorite == true && */}
      {/* //                 <p className="listHeart">♥</p>
      //               }
      //             </div>
      //             <div className="listingColorContainer">
      //               {item.hex && */}
      {/* //                 <div  */}
      {/* //                   style={{  */}
      {/* //                     backgroundColor: `${item.hex}`,
      //                     border: `2px solid black`,
      //                     height: `82px`,
      //                     width: `82px`
      //                   }}>
      //                 </div>
      //               }
      //             </div> */}
      {/* //           </div>
      //         );
      //     })}
      //       </div> */}
      {/* //     }
      //   </div>
      // } */}




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
    </ThemeProvider>
  );
}

export default UserHome;