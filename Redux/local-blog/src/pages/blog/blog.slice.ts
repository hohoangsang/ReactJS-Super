import { createSlice, current, nanoid, PayloadAction } from '@reduxjs/toolkit';
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

const blogSlice = createSlice({
  name: 'blog', //prefix cho action type
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const newPostList = state.postList.filter((post) => post.id !== payload);
      state.postList = newPostList;
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const { payload } = action;
      state.postList.some((post, index) => {
        if (post.id === payload.id) {
          state.postList[index] = payload;
        }
        return false;
      }); //nếu tìm thấy post cần cập nhật thì cập nhật post đó và dừng vòng lặp luôn
      state.currentPost = null;
    },
    startUpdatePost: (state, action: PayloadAction<Post>) => {
      const { payload } = action;
      state.currentPost = payload; //mutate state
    },
    endUpdatePost: (state) => {
      state.currentPost = null;
    },
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const { payload } = action;
        state.postList.unshift(payload);
      },
      prepare(post: Post) {
        return {
          payload: {
            ...post,
            id: nanoid() //function of redux toolkit that generate a unique id
          }
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.includes('end'),
        (state, action) => {
          console.log('Matcher other case ', current(state));
        }
      )
      .addMatcher(
        (action) => action.type.includes('click'),
        (state, action) => {
          console.log('Matcher click case ');
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`default case action type: ${action.type}`, current(state));
      });
  }
});

export const { deletePost, endUpdatePost, startUpdatePost, updatePost, addPost } = blogSlice.actions;

const blogReducer = blogSlice.reducer;

export default blogReducer;
