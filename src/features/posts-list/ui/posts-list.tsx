import { useVirtualizer } from "@tanstack/react-virtual";
import { Post, postsApi } from "entities";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const PostsList = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { data } = postsApi.useGetPostsQuery();

  const rowVirtualizer = useVirtualizer({
    count: 100,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const getPost = (index: number) => (data ? data[index] : null);

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `400px`,
          overflow: "auto",
          paddingRight: 10,
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div key={virtualItem.key} className="flex justify-between max-w-full">
                <Post post={getPost(virtualItem.index)} />
                {getPost(virtualItem.index) && <Link to={`/post/${getPost(virtualItem.index)!.id}`}>Просмотр</Link>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
