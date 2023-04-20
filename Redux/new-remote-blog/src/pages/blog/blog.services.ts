import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "types/post.type";

export const blogApi = createApi({
  reducerPath: "blogApi", //Tên field trong redux state
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    //Gerneric type thứ tự lần lượt là type giá trị trả về và type của argument
    getPostList: builder.query<Post[], void>({
      query: () => `posts?_sort=createdAt&_order=desc`
    })
  })
});

export const { useGetPostListQuery } = blogApi;
