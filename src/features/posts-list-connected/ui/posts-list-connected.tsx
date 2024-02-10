import { Post } from "entities";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { lastVisitedPostDetailsIdAtom } from "../model/posts-virtial-scroll-atoms-store";
import { usePostsVirtualScroll } from "../model/use-posts-virtual-scroll";

export const PostsListConnected = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { posts, isLoading, isFetching, rowVirtualizer } = usePostsVirtualScroll({
    parentRef: parentRef,
  });

  //  try to scroll into last visited postItem if it still in the list
  const lastVisitedPostDetailsId = useAtomValue(lastVisitedPostDetailsIdAtom);
  const postToVisitIndex = posts.findIndex((p) => p.id === lastVisitedPostDetailsId);
  useEffect(() => {
    if (postToVisitIndex > -1) {
      rowVirtualizer.scrollToIndex(postToVisitIndex);
    }
  }, [postToVisitIndex, rowVirtualizer]);

  const getPost = (index: number) => (posts ? posts[index] : undefined);

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
          {isLoading || posts.length < 1
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
