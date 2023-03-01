import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// WATCHER SAGA
function* inventorySaga() {
    yield takeEvery('FETCH_USER_INVENTORY', fetchEm);
    yield takeEvery('FETCH_ITEM', fetchIt);
    yield takeEvery('ADD_ITEM', addIt);
    yield takeEvery('DELETE_ITEM', deleteIt);
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
    console.log('POST SAGA SUCCESS:', newItem.data);
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

// TO DO - put saga for favorite updating
  
export default inventorySaga;