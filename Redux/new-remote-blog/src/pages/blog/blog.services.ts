import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from 'types/post.type';

export const blogApi = createApi({
  reducerPath: 'blogApi', //Tên field trong redux state
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    //Gerneric type thứ tự lần lượt là type giá trị trả về và type của argument
    getPostList: builder.query<Post[], void>({
      query: () => `posts?_sort=createdAt&_order=desc`,

      providesTags: (result) => {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
            // giá trị của type phải giống với giá trị của tagTypes
            { type: 'Posts' as const, id: 'LIST' }
          ];

          return final;
        }

        // giá trị của type phải giống với giá trị của tagTypes
        return [{ type: 'Posts', id: 'LIST' }];
      }
    }),

    getPost: builder.query<Post, string>({
      query: (postId) => `posts/${postId}`
    }),

    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post
      }),

      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    }),

    updatePost: builder.mutation<Post, { postId: string, post: Post }>({
      query: (data) => ({
        url: `posts/${data.postId}`,
        method: "PUT",
        body: data.post
      }),

      invalidatesTags: (result) => [{ type: "Posts", id: result?.id }]
    }),

    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: 'DELETE'
      }),

      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    })
  })
});

export const { useGetPostListQuery, useAddPostMutation, useDeletePostMutation, useGetPostQuery } = blogApi;
