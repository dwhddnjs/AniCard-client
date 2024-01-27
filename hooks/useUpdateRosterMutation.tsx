"use client"

import { API_KEYS } from "@/common/apiKeys"
import { postRequest, putRequest } from "@/common/axios"
import { useToast } from "@/components/ui/use-toast"
import { PlayerTypes } from "@/types/Player-type"
import { SelectedPlayerTypes } from "@/types/Roster-type"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateRosterMutation = () => {
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
    }) => putRequest(API_KEYS.roster, data),
    onSuccess: (data) => {
      queryClient.setQueryData([`${API_KEYS.roster}/saved`], data)
      toast({
        title: "기존 로스터가 수정 되었습니다.",
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
