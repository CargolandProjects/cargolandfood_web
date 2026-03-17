import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviews } from "@/lib/services/reviews.service";
import { toast } from "sonner";

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviews.submitReview,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      toast.success(response.message || "Review submitted");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to send review");
    },
  });
};
