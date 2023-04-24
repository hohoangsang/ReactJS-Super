import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from 'types/post.type';

interface InitialState {
  postId: string;
}

const initialState: InitialState = {
  postId: ''
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startUpdatePost: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.postId = payload;
    },

    cancelUpdatePost: (state) => {
      state.postId = '';
    }
  }
});

const blogReducer = blogSlice.reducer;

export const { startUpdatePost, cancelUpdatePost } = blogSlice.actions;

export default blogReducer;
