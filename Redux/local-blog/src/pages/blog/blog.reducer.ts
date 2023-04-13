import { createAction, createReducer, current, nanoid } from '@reduxjs/toolkit';
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

export const addPost = createAction('blog/addPost', (post: Post) => {
  return {
    payload: {
      ...post,
      id: nanoid() //function of redux toolkit that generate a unique id
    }
  };
});

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
      console.log('previous state: ', current(state));
      const { payload } = action;
      const newPostList = state.postList.filter((post) => post.id !== payload);
      state.postList = newPostList; //mutate state
      console.log('current state: ', current(state));
    })
    .addCase(startUpdatePost, (state, action) => {
      const { payload } = action;
      state.currentPost = payload; //mutate state
    })
    .addCase(updatePost, (state, action) => {
      const { payload } = action;

      //cách update 1
      // const newPostList = state.postList.map((post) => {
      //   if (post.id === payload.id) return payload;
      //   return post;
      // });
      // state.postList = newPostList; //mutate state

      //cách update 2
      state.postList.some((post, index) => {
        if (post.id === payload.id) {
          state.postList[index] = payload;
        }
        return false;
      }); //nếu tìm thấy post cần cập nhật thì cập nhật post đó và dừng vòng lặp luôn
      state.currentPost = null;
    })
    .addCase(endUpdatePost, (state, action) => {
      state.currentPost = null; //mutate state
    })
    .addMatcher(
      (action) => action.type.includes('endUpdatePost'),
      (state, action) => {
        //state là draff state

        console.log(current(state));
      }
    )
    .addDefaultCase((state, action) => {});
});

export default blogReducer;
