import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// WATCHER SAGA
function* inventorySaga() {
    yield takeEvery('FETCH_USER_INVENTORY', fetchEm);
    yield takeEvery('FETCH_ITEM', fetchIt);
    yield takeEvery('ADD_ITEM', addIt);
    yield takeEvery('EDIT_ITEM', editIt);
    yield takeEvery('DELETE_ITEM', deleteIt);
    yield takeEvery('FAVE_IT', faveHandler);
    yield takeEvery('UNFAVE_IT', faveHandler);
  }

// WORKER SAGA for GET ALL
function* fetchEm(action) {
    try {
      const inventory = yield axios.get('/api/inventory');
      console.log('get all result:', inventory.data);
      yield put({ type: 'SET_INVENTORY', payload: inventory.data });
    } catch (error) {
      console.log('ERROR GETTING INVENTORY:', error);
    //   yield put({ type: 'NO_INVENTORY' });
    }
  }

// WORKER SAGA for GET ITEM
function* fetchIt(action) {
  console.log('fetchIt action:', action);
  try {
      const item = yield axios.get(`/api/inventory/${action.payload}`);
      console.log('get item result:', item.data);
      yield put({ type: 'SET_ITEM', payload: item.data[0] });
  } catch (error) {
    console.log('ERROR GETTING ITEM:', error);
  }
}

// WORKER SAGA for ADD ITEM
function* addIt(action) {
  console.log('POST action:', action.payload);
  try {
    const newItem = yield axios.post('/api/inventory', action.payload);
    console.log('POST SAGA SUCCESS:', newItem.data.id);
    yield fetchIt({type: 'FETCH_ITEM', payload: newItem.data.id });
  } catch (error) {
  console.log('ERROR ADDING ITEM:', error);
}
}

// WORKER SAGA for DELETE ITEM
function* deleteIt(action) {
  try {
      const itemToDelete = yield axios.delete(`/api/inventory/${action.payload}`);
      console.log('DELETE item * payload:', itemToDelete.data);
  } catch (error) {
    console.log('ERROR DELETING ITEM:', error);
  }
}

// WORKER SAGA for PUT FAVE/UNFAVE
function* faveHandler(action) {
  try {
    if(action.type === 'FAVE_IT'){
      console.log('faveHandler SAGA: FAVE IT payload:', action.payload);
      yield axios.put(`/api/favorite`, action.payload);
    } else if (action.type === 'UNFAVE_IT'){
      console.log('faveHandler SAGA: UNFAVE IT payload:', action.payload);
      yield axios.put(`/api/favorite`, action.payload);
    }
    yield fetchIt({type: 'FETCH_ITEM', payload: `${action.payload.id}`});
  } catch (error) {
    console.log('ERROR FAVE/UNFAVE PUT:', error);
  }
}

// WORKER SAGA for PUT ITEM
function* editIt(action) {
  console.log('editIt SAGA: EDIT IT payload:', action.payload);
  try {
    yield axios.put(`/api/inventory`, action.payload);
    yield fetchIt({type: 'FETCH_ITEM', payload: `${action.payload.id}`});
  } catch (error) {
    console.log('ERROR EDITING ITEM:', error);
  }
}
  

export default inventorySaga;