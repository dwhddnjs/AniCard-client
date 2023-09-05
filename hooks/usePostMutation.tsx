import { API_KEYS } from "@/common/apiKeys";
import { postRequest } from "@/common/axios";
import { UseMutationResult, useMutation } from "react-query";

export const usePostMutation = (key: string) => {
  const {
    mutateAsync: trigger,
    isLoading,
    isError,
  } = useMutation((data: Record<string, string | number>) =>
    postRequest(key, data)
  );

  return {
    trigger,
    isLoading,
    isError,
  };
};
