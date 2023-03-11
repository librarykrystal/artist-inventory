import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './UserHome.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import white from '@mui/material/colors/grey';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WarningIcon from '@mui/icons-material/Warning';

  // this component will show MAIN INVENTORY LIST

const theme = createTheme({
  palette: {
    primary: {
      main: '#d9d9d9',
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
        {/* <p className="filterText">(This is where sort/filter options will go.)</p> */}
       
        <select
          className="filterDropDown"
          defaultValue=""
          onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
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
            {/* <option value="Other">Other</option> */}
        </select>

        <input className="filterCheckbox" type="checkbox" onChange={handleCheckboxFave} ></input> Faves Only

      </div>

{/* END FILTERS BAR */}


      <div className="invList">


{/* FILTER EXPERIMENT FOR ALL FILTERS IN ONE USING FUNCTIONS */}


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
                    <h3 className="listItemName">{item.name}</h3>
                    <p className="listItemBrand">{item.brand}</p>
                    <p className="listItemDetails">
                      {item.line}{' '}
                      {item.medium}{' '}
                      {item.container == 'Marker' && `${item.container}`}{' '}
                      {item.type == 'Additive'
                        || item.type == 'Ground'
                        || item.type == 'Medium'
                        || item.type == 'Paste'
                        || item.type == 'Primer'
                        || item.type == 'Varnish' ? `${item.type}` : null}
                    </p>
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