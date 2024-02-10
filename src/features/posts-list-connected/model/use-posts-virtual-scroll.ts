import { Virtualizer, useVirtualizer } from "@tanstack/react-virtual";
import { PostDto, postsApi } from "entities";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { virtualScrollPageAtom } from "./posts-virtial-scroll-atoms-store";

export const usePostsVirtualScroll = <THtmlEl extends HTMLElement>({
  parentRef,
}: {
  parentRef: React.RefObject<THtmlEl>;
}): {
  posts: PostDto[];
  isLoading: boolean;
  isFetching: boolean;
  rowVirtualizer: Virtualizer<THtmlEl, Element>;
} => {
  const [page, setPage] = useAtom(virtualScrollPageAtom);

  const { data, isLoading, isFetching } = postsApi.useGetPostsByPageQuery(page);

  const rowVirtualizer = useVirtualizer({
    count: data ? data.posts.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  //change page when we reach the last item
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem || !data || !data.posts || !data.hasNextPage) {
      return;
    }

    if (lastItem.index >= data.posts.length - 1 && data.hasNextPage && !isFetching && !isLoading) {
      setPage((p) => p + 1);
    }
  }, [data, isLoading, rowVirtualizer.getVirtualItems(), isFetching, isLoading]);

  return {
    posts: data?.posts ?? [],
    isLoading,
    isFetching,
    rowVirtualizer,
  };
};
