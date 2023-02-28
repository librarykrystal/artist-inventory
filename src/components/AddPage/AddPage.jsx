import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';

function Add() {

  // get current user's ID to send into database?  If so, add to dispatch.

  // should initial states be set to top options in drop-downs?

  // const [userId, setUserId] = useState('');   // only if not done directly in router
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [hex, setHex] = useState('');
  // const [family, setFamily] = useState('');
  const [medium, setMedium] = useState('');
  const [brand, setBrand] = useState('');
  const [body, setBody] = useState('');
  const [container, setContainer] = useState('');
  const [size, setSize] = useState('');
  const [notes, setNotes] = useState('');
  const [favorite, setFavorite] = useState(false);

  // if any drop-down options are in database, get from store here

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // dispatch any fetches for drop-down options
  }, []);

  console.log('SELECTIONS...', [
    "type:", type,
    "name:", name,
    // "family:", family,
    "medium:", medium,
    "brand:", brand,
    "body:", body,
    "container:", container,
    "size:", size,
    "favorite", favorite,
    "notes:", notes]);

    const handleCheckboxFave = () => {
      setFavorite(!favorite);
    };

  const submitForm = (e) => {
    e.preventDefault();
    // dispatch({ 
    //     type: 'ADD_ITEM',
    //     payload: {type, name, hex, medium, brand, body, container, size, notes, favorite}
    // });
    history.push("/");   // should this go home or to newly added item's page?
  }

  const goBack = (event) => {
    event.preventDefault();
    history.push("/");
  }


  return(
    <>
      <h3>ADD ITEM</h3>

      <div className="addForm">
        <form onSubmit={submitForm}>
          <p>Type: 
            <select
              defaultValue="Choose"
              onChange={(e) => setType(e.target.value)}>
                  {/* <option disabled selected >Choose</option>    // First workaround */}
                  <option disabled >Choose</option>
                  {/* <option value="Additive">Additive</option> */}
                  <option value="Color">Color</option>
                  <option value="Gesso">Gesso</option>
                  <option value="Medium">Medium</option>
                  <option value="Varnish">Varnish</option>
            </select>
          </p>

          <p>Name: <input value={name} onChange={(e) => setName(e.target.value)} /></p>

          { type == 'Color' &&
            <>
              <p>Medium: 
                <select
                  defaultValue="Choose"
                  onChange={(e) => setMedium(e.target.value)}>
                    <option disabled >Choose</option>
                    <option value="Acrylic">Acrylic</option>
                    <option value="Gouache">Gouache</option>
                    <option value="Oil">Oil</option>
                    <option value="Pastel">Pastel</option>
                    <option value="Watercolor">Watercolor</option>
                </select>
              </p>

              <p>COLOR PICKER GOES HERE</p>

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

          <p>Body: 
            <select
              defaultValue="Choose"
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
              defaultValue="Choose"
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
          <p>Enter brand: <input onChange={(e) => setBrand(e.target.value)} /></p>
          }

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
                <option value="Spraycan">Spraycan</option>
                <option value="Tub">Tub</option>
                <option value="Tube">Tube</option>
            </select>
          </p>

          <p>Size: <input value={size} onChange={(e) => setSize(e.target.value)} /></p>

          <p>Favorite?
            <input
              type="checkbox"
              // checked={favorite}
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
      </div>
    
      <button onClick={goBack}>HOME</button>
    </>
  )
}

export default Add;