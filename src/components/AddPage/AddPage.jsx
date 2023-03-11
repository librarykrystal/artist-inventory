import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import Modal from '../AddModal/AddModal';
import './AddPage.css';
import { SketchPicker, HuePicker, PhotoshopPicker } from 'react-color';  // glitchy
import { HexColorPicker } from "react-colorful";
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
import CancelIcon from '@mui/icons-material/Cancel';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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

function Add() {

  // if any drop-down options are in database later, grab from store here
  // get current user's ID to send in dispatch:
  const user = useSelector((store) => store.user.id);
  const item = useSelector((store) => store.item);

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [hex, setHex] = useState('');
  // const [family, setFamily] = useState('');
  const [medium, setMedium] = useState('');
  const [brand, setBrand] = useState('');
  const [line, setLine] = useState('');
  const [body, setBody] = useState('');
  const [container, setContainer] = useState('');
  const [size, setSize] = useState('');
  const [notes, setNotes] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [toxic, setToxic] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [noTypeWarning, setNoTypeWarning] = useState(false);
  const [noNameWarning, setNoNameWarning] = useState(false);
  const [noTypeNoNameWarning, setNoTypeNoNameWarning] = useState(false);

  useEffect(() => {
    // dispatch any fetches for drop-down options held in database
  }, []);

  console.log('SELECTIONS...', ["type:", type, "name:", name, "medium:", medium, "hex:", hex, "brand:", brand, "line:", line, "body:", body, "container:", container, "size:", size, "favorite", favorite, "toxic:", toxic, "notes:", notes]);

  // Toggle for favoriting checkbox:
  const handleCheckboxFave = () => {
    setFavorite(!favorite);
  };

  // Toggle for toxicity checkbox:
  const handleCheckboxTox = () => {
    setToxic(!toxic);
  };

  const sneakyFormFiller = () => {
    // setType('Color');
    setName('C.P. Cadmium Orange');
    setMedium('Acrylic');
    setBody('Heavy Body');
    setBrand('Golden Artist Colors');
    setLine('');
    setSize('2 oz');
    setContainer('Tube');
    setNotes('Test notes, yay!');
  }

  // onSubmit
  const submitForm = (e) => {
    e.preventDefault();
    // Checking for type and name values & showing only the appropriate warning:
    if(!type && name){
      console.log('UH OH, TYPE IS EMPTY!')
      setNoTypeWarning(true);
      setNoTypeNoNameWarning(false);
      setNoNameWarning(false);
    } else if(!name && type){
      console.log('UH OH, NAME IS EMPTY!')
      setNoNameWarning(true);
      setNoTypeNoNameWarning(false);
      setNoTypeWarning(false);
    } else if(!name && !type){
      console.log('UH OH, TYPE AND NAME ARE EMPTY!')
      setNoTypeNoNameWarning(true);
      setNoTypeWarning(false);
      setNoNameWarning(false);
    } else {
      dispatch({ 
          type: 'ADD_ITEM',
          payload: {type, name, hex, medium, brand, body, container, size, notes, favorite, line, toxic}
      });
      // history.push(`/`);
      setShowModal(true);
      // showModal set to true will trigger AddModal message with nav options
    }
  }

  // Going back home without submitting anything:
  const goBack = (event) => {
    event.preventDefault();
    dispatch({ 
      type: 'CLEAR_ITEM'
     });
    history.push("/");
  }


  return(
    <ThemeProvider theme={theme}>
    <div className="addOrEditcontainer">
      
      <br/><h2 onClick={sneakyFormFiller}>ADD ITEM</h2><br/>

      <div className="addForm">
        <div className="sizer"></div>

        <FormControl fullWidth>
          <InputLabel id="type">Type *</InputLabel>
            <Select
              required
              labelId="type"
              id="type"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
            <MenuItem value="Additive">Additive</MenuItem>
            <MenuItem value="Color">Color</MenuItem>
            <MenuItem value="Gesso">Gesso</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Paste">Paste</MenuItem>
            <MenuItem value="Primer">Primer</MenuItem>
            <MenuItem value="Solvent">Solvent</MenuItem>
            <MenuItem value="Varnish">Varnish</MenuItem>
          </Select>
        </FormControl>

        {/* Conditional render shows color picker only for appropriate types */}
        { type != "" &&
        type != "Additive" &&
        type != "Gel" &&
        type != "Medium" &&
        type != "Paste" &&
        type != "Solvent" &&
        type != "Varnish" &&
          <>
          {/* <p>Color: 
          <input type="color" defaultValue="#ffffff" onChange={(e) => setHex(e.target.value)}></input></p> */}
            <div className="colorPickerContainer">
              <HexColorPicker className="colorPicker" color={hex} onChange={(e) => setHex(e)} />
              { hex &&
                <div className="colorSelection"
                  style={{ 
                    backgroundColor: `${hex}`,
                    border: `2px solid black`,
                    height: `60px`,
                    width: `196px`
                  }}>
                </div>
              }
            </div>
          </>
        }

        <br /><br />
        <FormControl fullWidth>
          <InputLabel id="medium">Medium</InputLabel>
            <Select
              labelId="medium"
              id="medium"
              value={medium}
              label="Medium"
              onChange={(e) => setMedium(e.target.value)}
            >
            <MenuItem value="Acrylic">Acrylic</MenuItem>
            <MenuItem value="Enamel">Enamel</MenuItem>
            <MenuItem value="Gouache">Gouache</MenuItem>
            <MenuItem value="Ink">Ink</MenuItem>
            <MenuItem value="Oil">Oil</MenuItem>
            <MenuItem value="Pastel">Pastel</MenuItem>
            <MenuItem value="Watercolor">Watercolor</MenuItem>
          </Select>
        </FormControl>

        <br /><br />
        <TextField id="name" required label="Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />

        <br /><br />      
        <FormControl fullWidth>
          <InputLabel id="body">Body</InputLabel>
            <Select
              labelId="body"
              id="body"
              value={body}
              label="Body"
              onChange={(e) => setBody(e.target.value)}
            >
            <MenuItem value="Aerosol">Aerosol</MenuItem>
            <MenuItem value="Fluid">Fluid</MenuItem>
            <MenuItem value="Heavy Body">Heavy Body</MenuItem>
            <MenuItem value="High Flow">High Flow</MenuItem>
            <MenuItem value="Powder">Powder</MenuItem>
            <MenuItem value="Soft Body">Soft Body</MenuItem>
            <MenuItem value="Solid">Solid</MenuItem>
            <MenuItem value="">N/A</MenuItem>
          </Select>
        </FormControl>

        <br /><br />
        <FormControl fullWidth>
          <InputLabel id="brand">Brand</InputLabel>
            <Select
              labelId="brand"
              id="brand"
              value={brand}
              label="Brand"
              onChange={(e) => setBrand(e.target.value)}
            >
            <MenuItem value="Blick">Blick</MenuItem>
            <MenuItem value="Gamblin">Gamblin</MenuItem>
            <MenuItem value="Golden Artist Colors">Golden Artist Colors</MenuItem>
            <MenuItem value="Grumbacher">Grumbacher</MenuItem>
            <MenuItem value="Holbein">Holbein</MenuItem>
            <MenuItem value="Liquitex">Liquitex</MenuItem>
            <MenuItem value="Pebeo">Pebeo</MenuItem>
            <MenuItem value="QoR">QoR</MenuItem>
            <MenuItem value="Rembrandt">Rembrandt</MenuItem>
            <MenuItem value="Sennelier">Sennelier</MenuItem>
            <MenuItem value="Speedball">Speedball</MenuItem>
            <MenuItem value="Stuart Semple">Stuart Semple</MenuItem>
            <MenuItem value="Utrecht">Utrecht</MenuItem>
            <MenuItem value="Willaimsburg">Willaimsburg</MenuItem>
            <MenuItem value="Winsor & Newton">Winsor & Newton</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

{/* Text box for entering a non-listed brand appears only if "Other" is chosen above. */}
{/* If conditional was based on brand == "Other", it would disappear as soon as user types. */}
        { brand != "" &&
          brand != "Blick" &&
          brand != "Gamblin" &&
          brand != "Golden Artist Colors" &&
          brand != "Grumbacher" &&
          brand != "Holbein" &&
          brand != "Liquitex" &&
          brand != "Pebeo" &&
          brand != "QoR" &&
          brand != "Rembrandt" &&
          brand != "Sennelier" &&
          brand != "Speedball" &&
          brand != "Stuart Semple" &&
          brand != "Utrecht" &&
          brand != "Willaimsburg" &&
          brand != "Winsor & Newton" &&
          <>
            <br /><br />
            <TextField id="brand" label="Brand" variant="standard" onChange={(e) => setBrand(e.target.value)} />
          </>
        }

        <br /><br />
        <TextField id="line" label="Product Line" variant="standard" value={line} onChange={(e) => setLine(e.target.value)} />

        <br /><br />
        <TextField id="size" label="Size" variant="standard" value={size} onChange={(e) => setSize(e.target.value)} />

          <br /><br />
          <FormControl fullWidth>
            <InputLabel id="container">Container</InputLabel>
              <Select
                labelId="container"
                id="container"
                value={container}
                label="Container"
                onChange={(e) => setContainer(e.target.value)}
              >
                <MenuItem value="Bottle">Bottle</MenuItem>
                <MenuItem value="Bucket">Bucket</MenuItem>
                <MenuItem value="Can">Can</MenuItem>
                <MenuItem value="Jar">Jar</MenuItem>
                <MenuItem value="Marker">Marker</MenuItem>
                <MenuItem value="Pan">Pan</MenuItem>
                <MenuItem value="Pouch">Pouch</MenuItem>
                <MenuItem value="Sample">Sample</MenuItem>
                <MenuItem value="Tub">Tub</MenuItem>
                <MenuItem value="Tube">Tube</MenuItem>
              </Select>
          </FormControl>

        <br /><br />
        <div className="faveAndToxContainer">
          {/* FAVORITE selection conditional/toggle */}
          <span className="addFaveAndTox">
            { favorite == true ?
              <IconButton aria-label="unfavorite" onClick={handleCheckboxFave}>
                <FavoriteIcon fontSize="large"/>
              </IconButton>
            :
              <IconButton aria-label="favorite" onClick={handleCheckboxFave}>
                <FavoriteBorderIcon fontSize="large"/>
              </IconButton>
            }
          </span>
          {/* TOXIC selection conditional/toggle */}
          <span className="addFaveAndTox">
            { toxic == true ?
              <IconButton aria-label="untoxic" onClick={handleCheckboxTox}>
                <WarningIcon fontSize="large"/>
              </IconButton>
            :
            <IconButton aria-label="toxic" onClick={handleCheckboxTox}>
              <WarningAmberIcon fontSize="large"/>
            </IconButton>
            }
          </span>
        </div>

        <br />
        <TextField id="notes" label="Notes" fullWidth multiline rows={4} variant="outlined" value={notes} onChange={(e) => setNotes(e.target.value)} />

          {/* <p>Notes:</p>
          <textarea
            value={notes}
            className="notesInput"
            type="text"
            rows="10" cols="40"
            onChange={(event) => setNotes(event.target.value)}
          /> */}

          
          {/* <input type="submit" /> */}
        {/* </form> */}

        {/* Conditionally render messages about blank type and name fields: */}
        { noTypeWarning && !noNameWarning && <p className="noEntry">Please choose a type to continue.</p>}
        { noNameWarning && !noTypeWarning && <p className="noEntry">Please enter a name to continue.</p>}
        { noTypeNoNameWarning && <p className="noEntry">Please enter type and name to continue.</p>}

      </div>

      <br /><br />
          <Button
           type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckBoxIcon />}
            onClick={submitForm}>SUBMIT
          </Button>
    
          <br /><br />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<DisabledByDefaultIcon />}
        onClick={goBack}>CANCEL
      </Button>

      {/* <button onClick={modalGo}>SHOW MODAL</button> */}
      <Modal  show={showModal}/>
    </div>
    </ThemeProvider>
  )
}

export default Add;