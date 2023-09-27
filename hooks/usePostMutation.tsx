import { API_KEYS } from "@/common/apiKeys";
import { postRequest } from "@/common/axios";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";

export const usePostMutation = (key: string) => {
  const {
    mutateAsync: trigger,
    isLoading,
    isError,
  } = useMutation((data: any) => postRequest(key, data));

  return {
    trigger,
    isLoading,
    isError,
  };
};
