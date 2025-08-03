import { createSlice } from '@reduxjs/toolkit';
const tokenFromStorage = localStorage.getItem('token-wellness');
const initialState = {
  isAuthenticated: !!tokenFromStorage,
  token: tokenFromStorage || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token-wellness', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token-wellness');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;