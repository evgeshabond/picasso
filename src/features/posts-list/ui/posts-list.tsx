import { postsApi } from "entities";

export const PostsList = () => {
  const { data } = postsApi.useGetPostsQuery(undefined);
  return data?.map((post) => (
    <div>
      <div>{post.id}</div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  ));
};
