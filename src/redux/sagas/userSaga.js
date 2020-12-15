import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
   //if there is an organization associated with this user, get the organization data
    if(response.data.organization_id){
      yield put({type: 'FETCH_ORGANIZATION', payload: response.data.organization_id});
    }
    if (response.data){
      yield put({ type: 'UNSET_TOKEN' });
    }
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "UNSET_TOKEN" actions
function* unsetToken() {
  try {
   yield axios.put('/api/user/reset');
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UNSET_TOKEN', unsetToken);
}

export default userSaga;
