import { createSlice } from '@reduxjs/toolkit';

// Define the state types
interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

interface LoginState {
  isLogin: boolean;
  user: User;
}

// Define the initial state
const initialState: LoginState = {
  isLogin: false,
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
};

// Define the login slice
const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLogin: (state, action) => {
      return {
        ...state,
        isLogin: true,
        user: {
          displayName: action.payload.displayName,
          email: action.payload.email,
          photoURL: action.payload.photoURL,
          uid: action.payload.uid,
        },
      };
    },
    notLogin: (state) => {
      return {
        ...state,
        isLogin: false,
        user: {
          displayName: '',
          email: '',
          photoURL: '',
          uid: '',
        },
      };
    },
  },
});

// Export the actions and reducer
export const { isLogin, notLogin } = login.actions;
export default login.reducer;
