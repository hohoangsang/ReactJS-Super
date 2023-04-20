import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { blogApi } from 'pages/blog/blog.services';
import blogReducer from 'pages/blog/blog.slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer
  },
  //thêm api middleware để sử dụng những tính năng của RTK query ví dụ như caching, invalidation, polling
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
});

//optional, nhưng bắt buộc sử dụng nếu muốn dùng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
