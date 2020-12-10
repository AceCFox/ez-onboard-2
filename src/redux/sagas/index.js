import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import registrationSaga from "./registrationSaga";
import userSaga from "./userSaga";
import addOrganizationSaga from "./addOrganizationSaga";
import editOrganizationSaga from "./editOrganizationSaga";
import organizationSaga from './organizationSaga';
import siteSaga from './siteSaga';
import breakerSaga from "./breakerSaga";
import addUser from "./addUserSaga";
import deviceSaga from './deviceSaga';
import submitSaga from './finalSubmitSaga'
import passwordSaga from './passwordSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    addOrganizationSaga(),
    editOrganizationSaga(),
    organizationSaga(),
    siteSaga(),
    breakerSaga(),
    addUser(),
    deviceSaga(),
    submitSaga(),
    passwordSaga(),
  ]);
}
