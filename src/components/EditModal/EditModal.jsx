import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
// import './AddModal.css';


//
//
//
// LOGIC IS CURRENTLY A COPY OF THE ADD MODAL, NEEDS EVAL DUE TO ITEM REDUCER CONTENT
//
//
//


function Modal(props) {

  // This modal only shows if triggered by a true prop value from AddPage.jsx
  if(!props.show) {
    return null
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const item = useSelector((store) => store.item);

  const goHome = (event) => {
    event.preventDefault();
    dispatch({ 
      type: 'CLEAR_ITEM'
     });
    history.push("/");
  }

  const goToItem = (event) => {
    event.preventDefault();
    history.push(`/details/${item.id}`);
  }

  return (
    <>

    {/* CONDITIONAL RENDER:
    Show success if an item has been sent to reducer through post saga success,
    Show failture if item reducer is still empty */}

    { item.id &&
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Success!</h4>
        </div>
        <div className="modal-body">
          <p>The item has been updated.</p>
          {/* <p>ITEM ID TEST: {JSON.stringify(item.id)}</p> */}
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={goToItem}>VIEW ITEM</button>
          <button className="modal-button" onClick={goHome}>HOME</button>
        </div>
      </div>
    </div>
    }

    { !item.id &&
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Failure!</h4>
        </div>
        <div className="modal-body">
          <p>There was an error updating the item. Please try again.</p>
          {/* <p>ITEM ID TEST: {JSON.stringify(item.id)}</p> */}
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={goToItem}>VIEW ITEM</button>
          <button className="modal-button" onClick={goHome}>HOME</button>
        </div>
      </div>
    </div>
    }


    </>
  );
}

export default Modal;