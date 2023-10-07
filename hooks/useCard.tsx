import { API_KEYS } from "@/common/apiKeys";
import { fetcher } from "@/common/axios";
import React from "react";
import { useQuery } from "react-query";

export const useCard = (page: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: API_KEYS.card,
    queryFn: () => fetcher(`${API_KEYS.card}?page=${page}`),
  });
  return {
    data: data?.data,
    isLoading,
    isError,
  };
};
