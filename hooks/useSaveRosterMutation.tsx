import { PlayerTypes } from "@/app/roster/components/roster-card";
import { API_KEYS } from "@/common/apiKeys";
import { postRequest } from "@/common/axios";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

export const useSaveRosterMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: { title: string; players: Omit<PlayerTypes, "id">[] }) =>
      postRequest(API_KEYS.roster, data),
    onSuccess: (data) => {
      queryClient.setQueryData([`${API_KEYS.roster}/saved`], data);
      toast({
        title: "로스터가 저장 되었습니다.",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "오류 발생",
      });
    },
  });

  return {
    mutate,
    isError,
    isLoading,
  };
};
