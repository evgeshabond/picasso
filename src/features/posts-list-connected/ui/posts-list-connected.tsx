import { useVirtualizer } from "@tanstack/react-virtual";
import { Post, postsApi } from "entities";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const PostsListConnected = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const { data, isLoading, isFetching } = postsApi.useGetPostsByPageQuery(page);
  const dispatch = useDispatch();

  //  reset cache when component unmounts
  useEffect(() => {
    return () => {
      dispatch(postsApi.util.resetApiState());
    };
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: data ? data.posts.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const increasePage = () => {
    setPage((p) => p + 1);
  };

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem || !data || !data.posts || !data.hasNextPage) {
      return;
    }

    if (lastItem.index >= data.posts.length - 1 && data.hasNextPage && !isFetching && !isLoading) {
      increasePage();
    }
  }, [data, isLoading, rowVirtualizer.getVirtualItems(), isFetching, isLoading]);

  const getPost = (index: number) => (data?.posts ? data.posts[index] : undefined);

  const renderLoading = <div>Идет загрузка</div>;

  return (
    <div>
      <div
        ref={parentRef}
        style={{
          height: `250px`,
          overflow: "auto",
          paddingRight: 10,
        }}
      >
        <div
          className="w-full relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {isLoading
            ? renderLoading
            : rowVirtualizer.getVirtualItems().map((virtualItem) => (
                <div
                  className="w-full left-0 top-0 absolute"
                  key={virtualItem.key}
                  style={{
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
      <div>{!isLoading && isFetching && renderLoading}</div>
    </div>
  );
};
