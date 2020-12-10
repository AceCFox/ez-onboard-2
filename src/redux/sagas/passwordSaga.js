import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getEmail() {
  try {
    console.log('in getEmail Sagao')
    const response = yield axios.get("/api/user/email");
    yield put ({ type: 'SET_EMAIL', payload: response.data})
  } catch (error) {
    console.log("problem getting emails", error);
  }
}

function* passwordSaga() {
    yield takeLatest('FETCH_EMAIL', getEmail);
  }
  
  export default passwordSaga;