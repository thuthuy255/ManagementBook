// store.js
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app.slice';
const store = configureStore({
  reducer: {
    app: appReducer // Thêm appSlice vào store
  }
});

export default store;
