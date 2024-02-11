import { PostDetails, PostDto, postsApi } from "entities/";
import { lastVisitedPostDetailsIdAtom } from "features/posts-list-connected/model/posts-virtial-scroll-atoms-store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export const PostDetailsConnected = ({ postId }: { postId: PostDto["id"] }) => {
  const { data } = postsApi.useGetPostByIdQuery(postId);
  const setLastVisitedPostDetailsIndex = useSetAtom(lastVisitedPostDetailsIdAtom);

  //  set postId in atom to scroll into that item, when we go back to the posts overview page
  useEffect(() => {
    setLastVisitedPostDetailsIndex(postId);
  }, [postId, setLastVisitedPostDetailsIndex]);

  return <PostDetails post={data} />;
};
