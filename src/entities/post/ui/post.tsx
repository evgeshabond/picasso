import { Link } from "react-router-dom";
import { PostDto } from "../model/postDto";

export const Post = ({ post }: { post: PostDto }) => {
  return (
    <div className="flex w-full space-x-3" key={post.id}>
      <div>{post.id}</div>
      <div className="flex-shrink-0 font-bold">{post.title}</div>
      <div className="text-ellipsis overflow-hidden text-nowrap flex-grow">{post.body}</div>
      <Link to={`/post/${post.id}`}>Просмотр</Link>
    </div>
  );
};
