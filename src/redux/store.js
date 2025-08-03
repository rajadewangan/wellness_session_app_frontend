import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sessionReducer from './slices/sessionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sessions: sessionReducer,
  },
});

export default store;