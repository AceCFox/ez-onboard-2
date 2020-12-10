import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getEmail(action) {
  try {
    const response = yield axios.post("/api/user/email", {email: action.payload});
    yield put ({ type: 'SET_EMAIL', payload: response.data})
  } catch (error) {
    console.log("problem getting emails", error);
  }
}

function* passwordSaga() {
    yield takeLatest('FETCH_EMAIL', getEmail);
  }
  
  export default passwordSaga;