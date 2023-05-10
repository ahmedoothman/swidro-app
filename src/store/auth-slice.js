import { createSlice } from '@reduxjs/toolkit';
// cookies
import Cookies from 'js-cookie';

const initialState = {
  api_url: 'http://localhost:5000',
  role: Cookies.get('role'),
  userName: Cookies.get('userName'),
  email: 'example@example.com',
  // email : Cookies.get('email'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateInfo(state, action) {
      role = Cookies.get('role');
      userName = Cookies.get('userName');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
