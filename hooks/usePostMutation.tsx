import { API_KEYS } from "@/common/apiKeys";
import { postRequest } from "@/common/axios";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";

export const usePostMutation = (key: string) => {
  const { toast } = useToast();
  const {
    mutateAsync: trigger,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (data?: any) => postRequest(key, data),

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: `${error?.message}`,
      });
    },
  });

  return {
    trigger,
    isLoading,
    isError,
  };
};
