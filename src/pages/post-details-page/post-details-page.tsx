import { PostDetailsConnected, lastVisitedPostDetailsIdAtom } from "features";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PostDetailsPage = () => {
  const { postId } = useParams();
  const postIdNumber = Number(postId);
  const setLastVisitedPostDetailsIndex = useSetAtom(lastVisitedPostDetailsIdAtom);
  const navigate = useNavigate();

  //  set postId in atom to scroll into that item, when we go back to the posts overview page
  useEffect(() => {
    if (isFinite(postIdNumber)) {
      setLastVisitedPostDetailsIndex(postIdNumber);
    }
  }, [postId, postIdNumber, setLastVisitedPostDetailsIndex]);

  useEffect(() => {
    if (!postId || !isFinite(postIdNumber)) {
      console.warn('there is no postId, routing to the "/". Please check params definition');
      navigate("/");
    }
  }, [postId, navigate, postIdNumber]);

  return (
    <div>
      <Link to={"-1"}>На главную</Link>
      {postId ? <PostDetailsConnected postId={postIdNumber}></PostDetailsConnected> : <div>Error</div>}
    </div>
  );
};
