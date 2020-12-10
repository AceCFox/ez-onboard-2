import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getEmail(action) {
  try {
    //check if the email entered exists in the db
    const response = yield axios.post("/api/user/email", {email: action.payload});
    const boolean = response.data[0].exists
    yield put ({ type: 'SET_EMAIL', payload: boolean})
    console.log('email search response: ', boolean);
    //call the send email saga if the email exists in the db
    if (boolean) {
        yield put ({ type: 'SEND_EMAIL', payload:action.payload })
    }
  } catch (error) {
    console.log("problem searching emails for match", error);
  }
}

function* sendEmail(action) {
    try{
        yield axios.post("/api/package/recovery", {email: action.payload} )
        console.log(action.payload);
    } catch (error){
        console.log('problem sending recovery email to user: ', error)
    }
}

function* passwordSaga() {
    yield takeLatest('FETCH_EMAIL', getEmail);
    yield takeLatest('SEND_EMAIL', sendEmail);
  }
  
  export default passwordSaga;