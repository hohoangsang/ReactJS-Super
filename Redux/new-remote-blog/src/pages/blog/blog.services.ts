import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from 'types/post.type';

export const blogApi = createApi({
  reducerPath: 'blogApi', //Tên field trong redux state
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Posts'], //những kiểu tag cho phép dùng trong blogApi
  endpoints: (builder) => ({
    //Gerneric type thứ tự lần lượt là type giá trị trả về và type của argument
    getPostList: builder.query<Post[], void>({
      query: () => `posts?_sort=createdAt&_order=desc`,

      providesTags: (result) => {
        /**
         * callback này sẽ chạy mỗi khi getPostList chạy
         * mong muốn sẽ return về mảng có kiểu dữ liệu
         * ts
         * interface Tag {
         *  type: "Posts", //giống với dữ liệu được định nghĩa trong tagType
         *  id: string
         * }
         * ```
         * vì thế phải thêm as const vào để báo hiệu type là Read only và không thể mutate
         */
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

      /**
       * invalidatesTag cung cấp các tag để báo hiệu cho những medthod nào có providesTag
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này getPost sẽ chạy lại
       */
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    }),

    updatePost: builder.mutation<Post, { postId: string; post: Post }>({
      query: (data) => ({
        url: `posts/${data.postId}`,
        method: 'PUT',
        body: data.post
      }),

      invalidatesTags: (result, error, data) => [{ type: 'Posts', id: data.postId }]
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

export const {
  useGetPostListQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation
} = blogApi;
