import { PostDto } from "../model/post";

export const Post = ({ post }: { post: PostDto }) => {
  return (
    <div>
      <div>{post.id}</div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  );
};
