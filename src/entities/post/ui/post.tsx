import { PostDto } from "../model/postDto";

export const Post = ({ post }: { post: PostDto | undefined }) => {
  return post ? (
    <div className="flex w-full space-x-3" key={post.id}>
      <div>{post.id}</div>
      <div className="flex-shrink-0 font-bold">{post.title}</div>
      <div className="line-clamp-1">{post.body}</div>
    </div>
  ) : (
    <div>Loading ...</div>
  );
};
