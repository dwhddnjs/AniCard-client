import { API_KEYS } from "@/common/apiKeys";
import { fetcher } from "@/common/axios";
import React from "react";
import { useQuery } from "react-query";

export const useNews = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: API_KEYS.news,
    queryFn: () => fetcher(`${API_KEYS.news}`),
  });
  return {
    data: data?.data,
    isLoading,
    isError,
  };
};
