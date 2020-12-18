import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import organization from './organizationReducer';
import site from './siteReducer';
import device from './newDevice';
import breaker from './breakerReducer';
import allDevice from './allDeviceReducer';
import zefUser from './zefUserReducer';
import email from './emailReducer';
import timeout from './tokenReducer';
import allSerial from './allSerialReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  organization,//will have an id, name, address, email, and possible phone
  site,// will have an array of objects containing id, first_name, last_name, address, email, and possible phone
  device,//will have a site, breaker, name, serial number
  breaker,
  allDevice, //will have some giant heccin device objects ya
  zefUser,
  email,//has an array with all of the emails currently stored in the db
  timeout, //boolean that says if timeout has been reached
  allSerial, //array of strings of all serials stored in DB
});

export default rootReducer;
