import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// watcher Saga
function* fetchItemSaga() {
    yield takeEvery('FETCH_ITEM', fetchIt);
  }

// worker Saga: will be fired on "FETCH INVENTORY" actions
function* fetchIt(action) {
    try {
        const item = yield axios.get(`/api/inventory/${action.payload}`);
        console.log('get item result:', item.data);
        yield put({ type: 'SET_ITEM', payload: item.data });
    } catch (error) {
      console.log('ERROR GETTING ITEM:', error);
    //   yield put({ type: 'NO_INVENTORY' });
    }
  }
  
  export default fetchItemSaga;