import { configureStore } from '@reduxjs/toolkit';
import login from '../modules/loginSlice';
import post from '../modules/postSlice';

const store = configureStore({
  reducer: { post, login },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
