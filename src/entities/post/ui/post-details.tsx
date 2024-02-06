import { PostDto } from "../model/postDto";

export const PostDetails = ({ post }: { post: PostDto | undefined }) => {
  return post ? (
    <div>
      <h1>
        {post.id} {post.title}
      </h1>
      <p>{post.body}</p>
    </div>
  ) : (
    <div>Loading ...</div>
  );
};
