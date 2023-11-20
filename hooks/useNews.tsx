import { ArticleTypes } from "@/app/news/page";
import { API_KEYS } from "@/common/apiKeys";
import { fetcher } from "@/common/axios";
import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";

type ResponseData = {
  statusCode: number;
  message: string;
  data: Data;
};

type Data = {
  page: number;
  data: ArticleTypes[];
};

export const useNews = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: API_KEYS.news,
    queryFn: ({ pageParam = 1 }) =>
      fetcher(`${API_KEYS.news}?page=${pageParam}`),
    getNextPageParam: (lastPage: ResponseData) => {
      return lastPage?.data?.page + 1;
    },
    initialPageParam: 1,
  } as any);

  return {
    data: data?.pages,
    fetchNextPage,
    fetchPreviousPage,
    isFetching,
    isFetchingNextPage,
  };
};
