import { API_KEYS } from "@/common/apiKeys";
import { fetcher } from "@/common/axios";
import React from "react";
import { useQuery } from "react-query";
import { useIsLogin } from "./useIsLoginStore";

export const useSavedRoster = () => {
  const { isLogin } = useIsLogin();
  const { data, isLoading, isError } = useQuery({
    queryKey: `${API_KEYS.roster}/saved`,
    queryFn: () => fetcher(`${API_KEYS.roster}/saved`),
    enabled: isLogin,
  });
  return {
    data: data?.data,
    isLoading,
    isError,
  };
};
