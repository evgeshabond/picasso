import { PostDetailsConnected } from "features";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PostDetailsPage = () => {
  const { postId } = useParams();
  const postIdNumber = Number(postId);
  const navigate = useNavigate();

  //  check if given postId is actual number => redirect to root page if not
  useEffect(() => {
    isFinite(postIdNumber) ? null : navigate("/");
  }, [navigate, postIdNumber]);

  return (
    <div>
      <Link to={"-1"}>На главную</Link>
      {postIdNumber ? <PostDetailsConnected postId={postIdNumber}></PostDetailsConnected> : <div>Error</div>}
    </div>
  );
};
