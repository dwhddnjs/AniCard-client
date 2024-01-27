import { API_KEYS } from "@/common/apiKeys"
import { fetcher } from "@/common/axios"
import { useQuery } from "@tanstack/react-query"
import React from "react"

export const useRoster = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [API_KEYS.roster],
    queryFn: () => fetcher(API_KEYS.roster),
  })
  return {
    data: data?.data,
    isLoading,
    isError,
  }
}
