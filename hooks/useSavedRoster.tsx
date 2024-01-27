"use client"

import { API_KEYS } from "@/common/apiKeys"
import { fetcher } from "@/common/axios"
import { useIsLogin } from "./useIsLoginStore"
import { useQuery } from "@tanstack/react-query"

export const useSavedRoster = () => {
  const { isLogin } = useIsLogin()
  const { data, isLoading, isError } = useQuery({
    queryKey: [`${API_KEYS.roster}/saved`],
    queryFn: () => fetcher(`${API_KEYS.roster}/saved`),
    enabled: isLogin,
  })
  return {
    data: data?.data,
    isLoading,
    isError,
  }
}
