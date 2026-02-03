import { favourites } from "@/lib/services/favourites.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMakeFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favourites.makeFavourite,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to make favourite");
    },
  });
};
