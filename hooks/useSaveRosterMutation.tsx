"use client"

import { API_KEYS } from "@/common/apiKeys"
import { postRequest } from "@/common/axios"
import { useToast } from "@/components/ui/use-toast"
import { PlayerTypes } from "@/types/Player-type"
import { SelectedPlayerTypes } from "@/types/Roster-type"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSaveRosterMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const {
    mutate,
    isError,
    isPending: isLoading,
  } = useMutation({
    mutationFn: (data: {
      title: string
      players: Omit<SelectedPlayerTypes, "id">[]
    }) => postRequest(API_KEYS.roster, data),
    onSuccess: (data) => {
      queryClient.setQueryData([`${API_KEYS.roster}/saved`], data)
      toast({
        title: "새로운 로스터가 저장 되었습니다.",
      })
    },
    onError: (error) => {
      console.log(error)
      toast({
        title: "오류 발생",
      })
    },
  })

  return {
    mutate,
    isError,
    isLoading,
  }
}
