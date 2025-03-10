// store.js
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app.slice';
import userReducer from './slices/user.slice';
const store = configureStore({
  reducer: {
    app: appReducer, // Thêm appSlice vào store,,
    user: userReducer
  }
});

export default store;
