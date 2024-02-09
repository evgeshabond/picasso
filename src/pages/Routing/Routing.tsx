import { PostDetailsPage } from "pages/post-details-page/post-details-page";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PostsOverview = lazy(() => import("../posts-overview-page/posts-overview-page"));

export const Routing = () => {
  return (
    <div className="p-2">
      <Routes>
        <Route path="/" element={<PostsOverview />} />
        <Route path="/post/:postId" element={<PostDetailsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
