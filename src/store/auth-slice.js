import { createSlice } from '@reduxjs/toolkit';

const initialState = { api_url: 'http://localhost:5000' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // here the functions
  },
});

export const authActions = authSlice.actions;

export default authSlice;
