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
       // console.log(action.payload);
    } catch (error){
        console.log('problem sending recovery email to user: ', error)
    }
}

function* checkTimeout(action){
    try{
        const response = yield axios.get("/api/user/timeout/" + action.payload );
        //check if expiration time has passed
        console.log('back from server with', response.data, `date now is:`, Date.now() )
        if (response.data > Date.now()){
            console.log('NOT EXPIRED WOO!')
            yield put ({ type: 'TOKEN_UNEXPIRED'})
        } else{
            console.log ("LINK EXPIRED!!!")
            //set up a reducer with some indication of this to render a link and a message on the DOM
            yield put ({ type: 'TOKEN_EXPIRED'})
        }
    } catch (error){
        console.log('problem getting timeout: ', error)
    }
}

function* updatePassword(action) {
    try{
        yield axios.put("/api/user/password", action.payload )
        console.log(action.payload);
    } catch (error){
        console.log('problem updating password: ', error)
    }
}

function* passwordSaga() {
    yield takeLatest('FETCH_EMAIL', getEmail);
    yield takeLatest('SEND_EMAIL', sendEmail);
    yield takeLatest('CHECK_TIMEOUT', checkTimeout);
    yield takeLatest ('UPDATE_PASSWORD', updatePassword);
  }
  
  export default passwordSaga;