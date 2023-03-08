import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import Modal from '../AddModal/AddModal';
import './AddPage.css';
import { SketchPicker, HuePicker, PhotoshopPicker } from 'react-color';  // glitchy
import { HexColorPicker } from "react-colorful";

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

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [noTypeWarning, setNoTypeWarning] = useState(false);
  const [noNameWarning, setNoNameWarning] = useState(false);
  const [noTypeNoNameWarning, setNoTypeNoNameWarning] = useState(false);

  useEffect(() => {
    // dispatch any fetches for drop-down options held in database
  }, []);

  console.log('SELECTIONS...', ["type:", type, "name:", name, "medium:", medium, "hex:", hex, "brand:", brand, "body:", body, "container:", container, "size:", size, "favorite", favorite, "notes:", notes]);

  // Toggle for favoriting checkbox:
  const handleCheckboxFave = () => {
    setFavorite(!favorite);
  };

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
          payload: {type, name, hex, medium, brand, body, container, size, notes, favorite, line}
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
    <div className="container">

      <h3>ADD ITEM</h3>

      <div className="addForm">
        <form onSubmit={submitForm}>

          <p>Type: 
            <select
              defaultValue="Choose"
              onChange={(e) => setType(e.target.value)}>
                  <option disabled >Choose</option>
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
          </p>
        
          {/* Conditional render shows only if type is "color" */}
          { type == 'Color' &&
            <>
              {/* <p>Family: 
                <select
                  defaultValue="Choose"
                  onChange={(e) => setFamily(e.target.value)}>
                    <option disabled >Choose</option>
                    <option value="Red">Red</option>
                    <option value="Orange">Orange</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
                    <option value="Violet">Violet</option>
                    <option value="Brown">Brown</option>
                    <option value="Black">Black</option>
                    <option value="Grey">Grey</option>
                    <option value="White">White</option>
                    <option value="Clear">Clear</option>
                </select>
              </p> */}
            </>
          }

          <p>Medium: 
            <select
              defaultValue="Choose"
              onChange={(e) => setMedium(e.target.value)}>
                <option disabled >Choose</option>
                <option value="Acrylic">Acrylic</option>
                <option value="Enamel">Enamel</option>
                <option value="Gouache">Gouache</option>
                <option value="Oil">Oil</option>
                <option value="Pastel">Pastel</option>
                <option value="Watercolor">Watercolor</option>
            </select>
          </p>

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
                      height: `196px`,
                      width: `60px`
                    }}>
                  </div>
                }
              </div>
            </>
          }

          <p>Name: <input value={name} onChange={(e) => setName(e.target.value)} /></p>

          <p>Body: 
            <select
              defaultValue="Choose"
              onChange={(e) => setBody(e.target.value)}>
                <option disabled >Choose</option>
                <option value="Aerosol">Aerosol</option>
                <option value="Fluid">Fluid</option>
                <option value="Heavy Body">Heavy Body</option>
                <option value="High Flow">High Flow</option>
                <option value="Powder">Powder</option>
                <option value="Soft Body">Soft Body</option>
                <option value="Solid">Solid</option>
                <option value="">N/A</option>
            </select>
          </p>

          <p>Brand: 
            <select
              defaultValue="Choose"
              onChange={(e) => setBrand(e.target.value)}>
                <option disabled >Choose</option>
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
                <option value="Other">Other</option>
            </select>
          </p>

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
          <p>Enter brand: <input onChange={(e) => setBrand(e.target.value)} /></p>
          }

          <p>Product Line: <input value={line} onChange={(e) => setLine(e.target.value)} /></p>

          <p>Size: <input value={size} onChange={(e) => setSize(e.target.value)} /></p>

          <p>Container: 
            <select
              defaultValue="Choose"
              onChange={(e) => setContainer(e.target.value)}>
                <option disabled >Choose</option>
                <option value="Bottle">Bottle</option>
                <option value="Bucket">Bucket</option>
                <option value="Can">Can</option>
                <option value="Jar">Jar</option>
                <option value="Marker">Marker</option>
                <option value="Pouch">Pouch</option>
                <option value="Sample">Sample</option>
                <option value="Tub">Tub</option>
                <option value="Tube">Tube</option>
            </select>
          </p>

          <p>Favorite?
            <input
              type="checkbox"
              onChange={handleCheckboxFave}
            ></input></p>

          <p>Notes:</p>
          <textarea
            value={notes}
            className="notesInput"
            type="text"
            rows="10" cols="40"
            onChange={(event) => setNotes(event.target.value)}
          />

          <br />
          <input type="submit" />
        </form>

        {/* Conditionally render messages about blank type and name fields: */}
        { noTypeWarning && !noNameWarning && <p className="noEntry">Please choose a type to continue.</p>}
        { noNameWarning && !noTypeWarning && <p className="noEntry">Please enter a name to continue.</p>}
        { noTypeNoNameWarning && <p className="noEntry">Please enter type and name to continue.</p>}

      </div>
    
      <button onClick={goBack}>HOME</button>

      {/* <button onClick={modalGo}>SHOW MODAL</button> */}
      <Modal  show={showModal}/>
    </div>
  )
}

export default Add;