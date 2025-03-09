// slices/appSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  id: '',
  name: '',
  email: '',
  phoneNumber: '',
  address: null,
  avatar: '',
  role: '',
  isVerified: true,
  createdAt: '',
  updatedAt: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state = action.payload;
    }
  }
});

export const { setUserState } = userSlice.actions;
