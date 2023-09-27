import { API_KEYS } from "@/common/apiKeys";
import { fetcher } from "@/common/axios";
import React from "react";
import { useQuery } from "react-query";

export const usePacks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: API_KEYS.store,
    queryFn: () => fetcher(API_KEYS.store),
  });
  return {
    data: data?.data,
    isLoading,
    isError,
  };
};
