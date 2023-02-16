import { configureStore } from '@reduxjs/toolkit';
import post from '../modules/postSlice';
import login from '../modules/loginSlice';

const store = configureStore({
  reducer: {
    post,
    login,
  },
});

export default store;
