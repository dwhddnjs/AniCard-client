import { API_KEYS } from "@/common/apiKeys";
import { fetcher } from "@/common/axios";
import React from "react";
import { useQuery } from "react-query";

export const useSavedRoster = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: `${API_KEYS.roster}/saved`,
    queryFn: () => fetcher(`${API_KEYS.roster}/saved`),
  });
  return {
    data: data?.data,
    isLoading,
    isError,
  };
};
