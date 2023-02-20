import { configureStore } from '@reduxjs/toolkit';
import login from '../modules/loginSlice';

const store = configureStore({
  reducer: { login },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
