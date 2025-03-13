import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app.slice';
import userReducer from './slices/user.slice';
import loadingReducer from './slices/loading.slice'; // Đảm bảo đúng đường dẫn

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    loading: loadingReducer // ✅ Kiểm tra có cái này chưa?
  }
});

export default store;
