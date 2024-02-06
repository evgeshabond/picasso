import { PostDetailsConnected } from "features/post-details-connected/ui/post-details-connected";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PostDetailsPage = () => {
  //   const lel = useRout;
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) {
      console.warn('there is no postId, routing to the "/". Please check params definition');
      navigate("/");
    }
  }, [postId, navigate]);
  return (
    <div>
      <Link to={"/"}>На главную</Link>
      {postId ? <PostDetailsConnected postId={Number(postId)}></PostDetailsConnected> : <div>Error</div>}
    </div>
  );
};
