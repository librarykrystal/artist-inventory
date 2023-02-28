import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// watcher Saga
function* fetchInventorySaga() {
    yield takeEvery('FETCH_USER_INVENTORY', fetchEm);
    yield takeEvery('ADD_ITEM', addIt);
  }

// worker Saga: will be fired on "FETCH INVENTORY" actions
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

  function* addIt() {
    // code to kick off axios post for adding an item
  }
  
  export default fetchInventorySaga;