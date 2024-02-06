import { Post, postsApi } from "entities";
import { Link } from "react-router-dom";

export const PostsList = () => {
  const { data } = postsApi.useGetPostsQuery(undefined);

  return (
    <div className="p-2 space-y-2 max-w-full overflow-hidden">
      {data?.map((post) => (
        <div key={post.id} className="flex justify-between max-w-full">
          <Post post={post} />
          <Link to={`/post/${post.id}`}>Просмотр</Link>
        </div>
      ))}
    </div>
  );
};
