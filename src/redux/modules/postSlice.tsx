import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  title: '',
  contents: '',
  id: uuidv4(),
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // addPostText: (state: any, action) => {
    //   return [...state, action.payload];
    // },
    // deletePostText: (state, action) => {
    //   return state.filter((item: any) => {
    //     return item.id !== action.payload;
    //   });
    // },
  },
});

// export const { postText } = postSlice.actions;
export default postSlice.reducer;
