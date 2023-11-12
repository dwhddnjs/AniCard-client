import { PlayerTypes } from "@/app/roster/components/roster-card";
import { API_KEYS } from "@/common/apiKeys";
import { deleteRequest, postRequest } from "@/common/axios";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

export const useRemoveRosterMutation = (id: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: () => deleteRequest(`${API_KEYS.roster}/${id}`),
    onSuccess: (data) => {
      console.log("data: ", data.data);

      queryClient.setQueriesData([`${API_KEYS.roster}/saved`], data);
      toast({
        title: "로스터가 삭제 되었습니다.",
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
