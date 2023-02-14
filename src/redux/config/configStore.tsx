import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../modules/postSlice';

const store = configureStore({
  reducer: {
    postSlice,
  },
});

export default store;
