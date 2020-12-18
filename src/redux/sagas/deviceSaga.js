import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

function* addDevice(action) {
  try {
    yield axios.post("/api/device", action.payload);
    yield put({ type: 'GET_ALL_DEVICE', payload: action.payload.org_id });
  } catch (error) {
    console.log("Trouble adding device", error);
  }
}

function* getDevice(action) {
    try {
      const response = yield axios.get("/api/device/all/" + action.payload);
      yield put({ type: 'SET_ALL_DEVICE', payload: response.data });
    } catch (error) {
      console.log("Trouble getting devices", error);
    }
  }

function* putDevice(action) {
    try {
      yield axios.put("/api/device/" + action.payload.id, action.payload);
      yield put({ type: 'GET_ALL_DEVICE', payload: action.payload.org_id });
    } catch (error) {
      console.log("Trouble updating device", error);
    }
  }

  function* deleteDevice(action) {
    try {
      yield axios.delete("/api/device/" + action.payload.id );
      yield put({ type: 'GET_ALL_DEVICE', payload: action.payload.org_id });
    } catch (error) {
      console.log("Trouble deleting device", error);
    }
  }

  function* getSerial() {
    try {
      const response = yield axios.get("/api/device/serial");
      //build an array of strings, not objects
      let serialArray = []
      for (let object of response.data){
        serialArray.push(object.serial_number)
      }
      yield put({ type: 'SET_ALL_SERIAL', payload: serialArray });
    } catch (error) {
      console.log("Trouble getting device serial numbers", error);
    }
  }

function* deviceSaga() {
  yield takeLatest("GET_SERIAL_NUMBERS", getSerial);
  yield takeLatest("ADD_DEVICE", addDevice);
  yield takeLatest("GET_ALL_DEVICE", getDevice);
  yield takeLatest("UPDATE_DEVICE", putDevice);
  yield takeLatest("DELETE_DEVICE", deleteDevice)
}

export default deviceSaga;
