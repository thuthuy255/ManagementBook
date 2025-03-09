// slices/appSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  token: null,
  role_id: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state.role_id = action.payload.role_id;
      state.token = action.payload.token;
    },

    resetLogin: (state) => {
      state.token = null;
    },
    setToken: (state) => {
      state.token = state;
    }
  }
});

export const { setAppState, resetLogin, setToken } = appSlice.actions;
export const getTokenState = (state) => state.app.token;
export const getRole_Id = (state) => state.app.role_id;

export default appSlice.reducer;
