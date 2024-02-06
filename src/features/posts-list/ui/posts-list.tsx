import { Post, postsApi } from "entities";

export const PostsList = () => {
  const { data } = postsApi.useGetPostsQuery(undefined);

  return (
    <div className="p-2 space-y-2">
      {data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
