import { createSlice } from '@reduxjs/toolkit';
// cookies
import Cookies from 'js-cookie';

const initialState = {
  api_url: 'http://localhost:5000',
  role: Cookies.get('role'),
  userName: Cookies.get('userName'),
  resortName: Cookies.get('resortName'),
  resortLocation: Cookies.get('resortLocation'),
  resortOwner: Cookies.get('resortOwner'),
  resortId: Cookies.get('resortId'),
  email: 'example@example.com',
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
  },
});

export const authActions = authSlice.actions;

export default authSlice;
