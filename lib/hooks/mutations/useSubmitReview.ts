import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviews } from "@/lib/services/reviews.service";
import { toast } from "sonner";

export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviews.submitReview,

    onSuccess: (data) => {
      toast.success(data.message || "Review submitted successfully");
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
};
