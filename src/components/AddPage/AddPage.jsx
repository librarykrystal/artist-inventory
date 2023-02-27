import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';

function Add() {

    // get current user's ID to send into database?

    const [userId, setUserId] = useState('');   // this might be done directly in router?
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [hex, setHex] = useState('');
    const [family, setFamily] = useState('');
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

    const submitForm = (e) => {
        e.preventDefault();
        // dispatch({ 
        //     type: 'ADD_ITEM',
        //     payload: {userId, type, name, hex, family, medium, brand, body, container, size, notes, favorite}
        // });
        history.push("/");   // should this go home or to newly added item's page?
    }

    const goBack = (event) => {
        event.preventDefault();
        history.push("/");
      }


    return(
        <>
            <h3>ADD ITEM PAGE</h3>
        
            <button onClick={goBack}>HOME</button>
        </>
    )
}

export default Add;