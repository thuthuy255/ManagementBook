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
      return { ...state, ...action.payload }; // ✅ Cập nhật đúng
    }
  }
});

export const { setUserState } = userSlice.actions;
export const InfoUserState = (state) => state.user;
export default userSlice.reducer;
