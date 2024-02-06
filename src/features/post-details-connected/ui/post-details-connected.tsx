import { PostDetails, PostDto, postsApi } from "entities/";

export const PostDetailsConnected = ({ postId }: { postId: PostDto["id"] }) => {
  const { data } = postsApi.useGetPostByIdQuery(postId);
  return <PostDetails post={data} />;
};
