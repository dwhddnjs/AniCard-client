"use client"

import { API_KEYS } from "@/common/apiKeys"
import { fetcher } from "@/common/axios"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ArticleTypes } from "@/types/Article-type"

export type ResponseData = {
  statusCode: number
  message: string
  data: { data: ArticleTypes; page: number }
}

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
    queryKey: [API_KEYS.news],
    queryFn: ({ pageParam = 1 }) =>
      fetcher(`${API_KEYS.news}?page=${pageParam}`),
    getNextPageParam: (lastPage: ResponseData) => {
      return lastPage?.data?.page + 1
    },
    initialPageParam: 1,
  })

  return {
    data: data?.pages,
    fetchNextPage,
    fetchPreviousPage,
    isFetching,
    isFetchingNextPage,
  }
}
