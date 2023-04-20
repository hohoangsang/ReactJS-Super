import { createSlice } from '@reduxjs/toolkit';
import { Post } from 'types/post.type';

interface InitialState {
  postList: Post[];
  currentPost: Post | null;
}

const initialState: InitialState = {
  postList: [],
  currentPost: null
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {}
});

const blogReducer = blogSlice.reducer;

export default blogReducer;
