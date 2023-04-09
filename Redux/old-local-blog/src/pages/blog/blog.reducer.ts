import { createAction, createReducer } from '@reduxjs/toolkit';
import { initPostList } from 'constants/blog';
import { Post } from 'types/post.type';

interface InitialState {
  postList: Post[];
  currentPost: Post | null;
}

const initialState: InitialState = {
  postList: initPostList,
  currentPost: null
};

export const addPost = createAction<Post>('blog/addPost');

export const deletePost = createAction<string>('blog/deletePost');

export const updatePost = createAction<Post>('blog/updatePost');

export const startUpdatePost = createAction<Post>('blog/startUpdatePost');
export const endUpdatePost = createAction('blog/endUpdatePost');

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      const { payload } = action;
      //immerjs
      //immerjs cho phép chúng ta mutate 1 state an toàn
      state.postList.unshift(payload);
    })
    .addCase(deletePost, (state, action) => {
      const { payload } = action;
      const newPostList = state.postList.filter((post) => post.id !== payload);
      state.postList = newPostList; //mutate state
    })
    .addCase(startUpdatePost, (state, action) => {
      const { payload } = action;
      state.currentPost = payload; //mutate state
    })
    .addCase(updatePost, (state, action) => {
      const { payload } = action;
      const newPostList = state.postList.map((post) => {
        if (post.id === payload.id) return payload;
        return post;
      });
      state.postList = newPostList; //mutate state
    })
    .addCase(endUpdatePost, (state, action) => {
      state.currentPost = null; //mutate state
    });
});

export default blogReducer;
