// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "shared";
import { PostDto } from "./postDto";

const POSTS_URL = BASE_URL + "/posts";

//  constants required to mock
const POSTS_COUNT = 100;
const POSTS_ON_PAGE = 10;

// const getHasNextPage = (page: number) => {
//   return ;
// };

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: POSTS_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: PostDto[]; hasNextPage: boolean }, number>({
      query: () => "",
      transformResponse: (posts: PostDto[], meta, page) => {
        const firstPostIndex = page ? page * POSTS_ON_PAGE : 0;
        const lastPostIndex = firstPostIndex + 10;
        const hasNextPage = POSTS_COUNT > POSTS_ON_PAGE * page;

        const postsOnPage = posts.slice(firstPostIndex, lastPostIndex);
        console.log("transforming response", { posts, postsOnPage, hasNextPage, firstPostIndex, lastPostIndex });
        return { posts: postsOnPage, hasNextPage };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // queryFn: async (page) => {
      //   try {
      //     console.log("doing call");
      //     const posts: PostDto[] = await (await fetch(POSTS_URL)).json();
      //     console.log(posts);
      //     const firstPostIndex = page * POSTS_ON_PAGE - 1;
      //     const lastPostIndex = firstPostIndex + 10;
      //     const hasNextPage = POSTS_COUNT > POSTS_ON_PAGE * page;

      //     const postsOnPage = posts.slice(firstPostIndex, lastPostIndex);

      //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //     return { posts: postsOnPage, hasNextPage } as any;
      //   } catch (e) {
      //     console.log("error in fetching");
      //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //     return { error: e as unknown as any };
      //   }
      // },
      merge: (currentCache, newItems) => {
        console.log("merge", { currentCache, newItems });
        currentCache.hasNextPage = newItems.hasNextPage;
        currentCache.posts.push(...newItems.posts);
      },
      forceRefetch({ currentArg, previousArg }) {
        console.log("force refetch", { currentArg, previousArg });
        return currentArg !== previousArg;
      },
    }),
    getPostById: builder.query<PostDto, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

//  mock BE call, allowing to pass page param and get 'hasNextPage' from BE
//  need mock since JSONPlaceholder do not have this functionality
// export const getPosts =  async  (page: number) {
//   const posts = await fetchBaseQuery()
// }

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
