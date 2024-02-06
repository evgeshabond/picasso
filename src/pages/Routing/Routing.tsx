import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PostsOverview = lazy(() => import("../PostsOverview/posts-overview"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsOverview />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
