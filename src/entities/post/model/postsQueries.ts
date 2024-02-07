// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "shared";
import { PostDto } from "./postDto";

const POSTS_URL = BASE_URL + "/posts";

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: POSTS_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostDto[], void>({
      query: () => `/`,
    }),
    getPostById: builder.query<PostDto, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
