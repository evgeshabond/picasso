import { useVirtualizer } from "@tanstack/react-virtual";
import { Post, postsApi } from "entities";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const PostsListConnected = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const { data } = postsApi.useGetPostsQuery(page);

  useEffect(() => console.log({ posts: data?.posts }), [data?.posts]);

  // const count = data?.posts ? (data.hasNextPage ? data.posts.length + 1 : data.posts.length) : 0;

  const rowVirtualizer = useVirtualizer({
    count: data ? (data.hasNextPage ? data.posts.length + 1 : data.posts.length) : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const increasePageDebounced = debounce(() => {
    console.log("increasing page");
    setPage((p) => p + 1);
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem || !data || !data.posts || !data.hasNextPage) {
      return;
    }

    if (lastItem.index >= data.posts.length - 1 && data.hasNextPage) {
      increasePageDebounced();
    }
  }, [data, rowVirtualizer.getVirtualItems()]);

  const getPost = (index: number) => (data?.posts ? data.posts[index] : undefined);
  console.log({ posts: data?.posts });

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `250px`,
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
