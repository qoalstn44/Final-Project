import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginSlice from '../modules/loginSlice';

const reducers = combineReducers({
  login: loginSlice,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
