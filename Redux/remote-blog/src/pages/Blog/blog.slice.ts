import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from 'api/api';
import { Post } from 'types/post.type';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface InitialState {
  postList: Post[];
  currentPost: Post | null;
  loading: boolean;
  currentRequestId: string | undefined;
}

const initialState: InitialState = {
  postList: [],
  currentPost: null,
  loading: false,
  currentRequestId: undefined
};

export const getPostList = createAsyncThunk(
  'blog/getPostList', //type prefix
  async (_, thunkAPI) => {
    const res = await api.get<Post[]>('/posts?_sort=createdAt&_order=desc', {
      signal: thunkAPI.signal
    });
    return res.data;
  }
);

export const addPostRequest = createAsyncThunk('blog/addPostRequest', async (body: Omit<Post, 'id'>, thunkAPI) => {
  const res = await api.post<Post>('/posts', body, {
    signal: thunkAPI.signal
  });

  return res.data;
});

export const deletePostRequest = createAsyncThunk(
  'blog/deletePostRequest', //prefix action
  async (postId: string, thunkAPI) => {
    const res = await api.delete(`/posts/${postId}`, {
      signal: thunkAPI.signal
    });

    return postId;
  }
);

export const getPostByIdRequest = createAsyncThunk('blog/getPostById', async (postId: string, thunkAPI) => {
  const res = await api.get<Post>(`/posts/${postId}`, {
    signal: thunkAPI.signal
  });
  return res.data;
});

export const updatePostRequest = createAsyncThunk('blog/updatePostRequest', async (post: Post, thunkAPI) => {
  const res = await api.put<Post>(`/posts/${post.id}`, post, {
    signal: thunkAPI.signal
  });

  return res.data;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startUpdatePost: (state, action: PayloadAction<Post>) => {
      const { payload } = action;
      state.currentPost = payload;
    },
    endUpdatePost: (state) => {
      state.currentPost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload;
      })
      .addCase(addPostRequest.fulfilled, (state, action) => {
        state.postList.unshift(action.payload);
      })
      .addCase(deletePostRequest.fulfilled, (state, action) => {
        const { payload } = action;
        const newPostList = state.postList.filter((post) => post.id !== payload);
        state.postList = newPostList;
      })
      .addCase(getPostByIdRequest.fulfilled, (state, action) => {
        const { payload } = action;
        state.currentPost = payload;
      })
      .addCase(updatePostRequest.fulfilled, (state, action) => {
        const { payload } = action;
        state.postList.some((post, index) => {
          let check = false;

          if (post.id !== payload.id) check = false;

          if (post.id === payload.id) {
            state.postList[index] = payload;
            check = true;
          }

          return check;
        });
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state, action) => {
          if (state.currentRequestId === action.meta.requestId) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      )
      .addMatcher(
        (action) => action.type.includes('click'),
        (state, action) => {
          console.log('Match action click');
        }
      )
      .addDefaultCase((state, action) => {
        // console.log('action: ', action.type);
        // console.log(current(state));
      });
  }
});

export const { endUpdatePost, startUpdatePost } = blogSlice.actions;

const blogReducer = blogSlice.reducer;
export default blogReducer;
