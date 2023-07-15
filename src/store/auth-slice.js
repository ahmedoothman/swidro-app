import { createSlice } from '@reduxjs/toolkit';
// cookies
import Cookies from 'js-cookie';
//
import { Howl } from 'howler';
// sound files
import soundFile from '../assets/audio/emergency.mp3';
const sound = new Howl({
  src: [soundFile],
});

const initialState = {
  api_url: 'http://localhost:5000',
  model_api_url: 'http://localhost:2023',
  role: Cookies.get('role'),
  userName: Cookies.get('userName'),
  resortName: Cookies.get('resortName'),
  resortLocation: Cookies.get('resortLocation'),
  resortOwner: Cookies.get('resortOwner'),
  resortId: Cookies.get('resortId'),
  email: 'example@example.com',
  swimmers: [],
  // email : Cookies.get('email'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateInfo(state, action) {
      state.role = Cookies.get('role');
      state.userName = Cookies.get('userName');
      state.resortName = Cookies.get('resortName');
      state.resortLocation = Cookies.get('resortLocation');
      state.resortOwner = Cookies.get('resortOwner');
      state.resortId = Cookies.get('resortId');
    },
    addtoSwimmers(state, action) {
      // append the data to customers
      state.swimmers.push(action.payload);
    },
    addArraytoSwimmers(state, action) {
      // append the data to customers
      state.swimmers = action.payload;
    },
    removeSwimmer(state, action) {
      // remove the data from customers
      state.swimmers = state.swimmers.filter(
        (swimmer) => swimmer._id !== action.payload
      );
    },
    updateSwimmer(state, action) {
      // update the data from customers
      state.swimmers = state.swimmers.map((swimmer) =>
        swimmer._id == action.payload._id ? action.payload : { swimmer }
      );
    },
    updateUser(state, action) {
      // update the data from customers
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
    test(state, action) {
      // console.log('test from services');
      // console.log(action.payload);
    },
    updateBatteryForSwimmer(state, action) {
      // the swimmer with the same deviceId
      const swimmer = state.swimmers.find(
        (swimmer) => swimmer.deviceId == action.payload.deviceId
      );
      // update the battery
      swimmer.battery = action.payload.battery;
    },
    updateHeartRateForSwimmer(state, action) {
      // the swimmer with the same deviceId
      const swimmer = state.swimmers.find(
        (swimmer) => swimmer.deviceId == action.payload.deviceId
      );
      // update the battery
      swimmer.heartRate = action.payload.hr;
    },
    updateStatusForSwimmer(state, action) {
      if (action.payload.status !== 'normal') {
        sound.play();
      } else {
        sound.stop();
      }
      // the swimmer with the same deviceId
      const swimmer = state.swimmers.find(
        (swimmer) => swimmer.deviceId == action.payload.deviceId
      );
      // update the battery
      swimmer.status = action.payload.status;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
