import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import Modal from '../EditModal/EditModal';
// import './EditPage.css';

function Edit() {

  // if any drop-down options are in database later, grab from store here
  // get current user's ID to send in dispatch:
  const user = useSelector((store) => store.user.id);
  const item = useSelector((store) => store.item);

  const [type, setType] = useState(item.type);
  const [name, setName] = useState(item.name);
  const [hex, setHex] = useState(item.hex);
  // const [family, setFamily] = useState('');
  const [medium, setMedium] = useState(item.medium);
  const [brand, setBrand] = useState(item.brand);
  const [body, setBody] = useState(item.body);
  const [container, setContainer] = useState(item.container);
  const [size, setSize] = useState(item.size);
  const [notes, setNotes] = useState(item.notes);
  const [favorite, setFavorite] = useState(item.favorite);  // HOW DO I IMPORT THIS BOOLEAN?

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
          type: 'EDIT_ITEM',
          payload: {type, name, hex, medium, brand, body, container, size, notes, favorite}
      });
      // history.push(`/`);
      setShowModal(true);
      // showModal set to true will trigger EditModal message with nav options
    }
  }

  // Going back home without submitting anything:
  const goBack = (event) => {
    event.preventDefault();
    history.push(`/details/${item.id}`);
  }


  return(
    <div className="container">

      <h3>EDIT<hr/></h3>
        
      <h3>{item.name}</h3>

      <div className="addForm">
        <form onSubmit={submitForm}>

          <p>Type: 
            <select
              defaultValue={item.color}
              onChange={(e) => setType(e.target.value)}>
                  <option disabled >Choose</option>
                  {/* <option value="Additive">Additive</option> */}
                  <option value="Color">Color</option>
                  <option value="Gesso">Gesso</option>
                  <option value="Medium">Medium</option>
                  <option value="Varnish">Varnish</option>
            </select>
          </p>
        
          {/* Conditional render shows only if type is "color" */}
          { type == 'Color' &&
            <>
              <p>Medium: 
                <select
                  defaultValue={item.medium}
                  onChange={(e) => setMedium(e.target.value)}>
                    <option disabled >Choose</option>
                    <option value="Acrylic">Acrylic</option>
                    <option value="Gouache">Gouache</option>
                    <option value="Oil">Oil</option>
                    <option value="Pastel">Pastel</option>
                    <option value="Watercolor">Watercolor</option>
                </select>
              </p>

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

          {/* Conditional render shows color picker only for types "color" and "gesso" */}
          { type != "" &&
            type != "Medium" &&
            type != "Varnish" &&
            <>
              <p>Color: 
              <input type="color" defaultValue={item.hex} onChange={(e) => setHex(e.target.value)}></input></p>
            </>
          }

          <p>Name: <input value={name} onChange={(e) => setName(e.target.value)} /></p>

          <p>Body: 
            <select
              defaultValue={item.body}
              onChange={(e) => setBody(e.target.value)}>
                <option disabled >Choose</option>
                <option value="Fluid">Fluid</option>
                <option value="Heavy Body">Heavy Body</option>
                <option value="High Flow">High Flow</option>
                <option value="Powder">Powder</option>
                <option value="Green">Soft Body</option>
                <option value="Solid">Solid</option>
                <option value="Spray">Spray</option>
                <option value="">N/A</option>
            </select>
          </p>

          <p>Brand: 
            <select
              defaultValue={item.brand}
              onChange={(e) => setBrand(e.target.value)}>
                <option disabled >Choose</option>
                <option value="Golden Artist Colors">Golden Artist Colors</option>
                <option value="Liquitex">Liquitex</option>
                <option value="Winsor & Newton">Winsor & Newton</option>
                <option value="Other">Other</option>
            </select>
          </p>

{/* Text box for entering a non-listed brand appears only if "Other" is chosen above. */}
{/* If conditional was based on brand == "Other", it would disappear as soon as user types. */}
          { brand != "" &&
            brand != "Golden Artist Colors" &&
            brand != "Liquitex" &&
            brand != "Winsor & Newton" &&
          <p>Enter brand: <input defaultValue={item.brand} onChange={(e) => setBrand(e.target.value)} /></p>
          }

          <p>Container: 
            <select
              defaultValue={item.comtainer}
              onChange={(e) => setContainer(e.target.value)}>
                <option disabled >Choose</option>
                <option value="Bottle">Bottle</option>
                <option value="Bucket">Bucket</option>
                <option value="Can">Can</option>
                <option value="Jar">Jar</option>
                <option value="Marker">Marker</option>
                <option value="Pouch">Pouch</option>
                <option value="Sample">Sample</option>
                <option value="Spraycan">Spraycan</option>
                <option value="Tub">Tub</option>
                <option value="Tube">Tube</option>
            </select>
          </p>

          <p>Size: <input value={size} onChange={(e) => setSize(e.target.value)} /></p>

          <p>Favorite?
            <input
              checked={ favorite ? 'checked' : ''}
              type="checkbox"
              onChange={handleCheckboxFave}
            ></input></p>

          <p>Notes:</p>
          <textarea
            value={notes}
            // defaultValue={item.notes}
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
    
      <button onClick={goBack}>BACK</button>

      {/* <button onClick={modalGo}>SHOW MODAL</button> */}
      <Modal  show={showModal}/>
    </div>
  )
}

export default Edit;