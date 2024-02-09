// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "shared";
import { PostDto } from "./postDto";

const POSTS_URL = BASE_URL + "/posts";

//  constants required to mock
const POSTS_COUNT = 100;
const POSTS_ON_PAGE = 10;

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: POSTS_URL }),
  endpoints: (builder) => ({
    getPostsByPage: builder.query<{ posts: PostDto[]; hasNextPage: boolean }, number>({
      query: () => "",
      transformResponse: async (posts: PostDto[], meta, page) => {
        const firstPostIndex = page ? page * POSTS_ON_PAGE : 0;
        const lastPostIndex = firstPostIndex + 10;
        const hasNextPage = POSTS_COUNT > POSTS_ON_PAGE * page;

        const postsOnPage = posts.slice(firstPostIndex, lastPostIndex);
        //  delay to increase service latency
        await new Promise((res) => setTimeout(res, 500));
        return { posts: postsOnPage, hasNextPage };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.hasNextPage = newItems.hasNextPage;
        currentCache.posts.push(...newItems.posts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getPostById: builder.query<PostDto, number>({
      query: (id) => `/${id}`,
    }),
  }),
});
