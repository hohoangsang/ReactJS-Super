import { createReducer } from '@reduxjs/toolkit';
import { Post } from 'types/post.type';

interface InitialState {
  postList: Post[];
}

const initialState: InitialState = {
  postList: []
};

const blogReducer = createReducer(initialState, (builder) => {});

export default blogReducer;
