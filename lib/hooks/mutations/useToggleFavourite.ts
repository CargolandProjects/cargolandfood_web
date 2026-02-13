import { favourites } from "@/lib/services/favourites.service";
import { vendorById } from "@/lib/services/vendors.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favourites.makeFavourite,

    onSuccess: (_, vars) => {
      const { vendorId, isFavourite } = vars;

      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });

      //   This updates the isFavourite flag of the cache for ui update
      //  This prevents refetching the vendor just to update a flag
      queryClient.setQueryData(
        ["vendorById", vendorId],
        (oldData: vendorById) => {
          if (!oldData) return;
          // console.log("Old Data: ", oldData);

          const newData = {
            ...oldData,
            data: {
              ...oldData.data,
              isFavourite,
            },
          };

          // console.log("New Data: ", newData);
          return newData;
        }
      );
    },

    onError: (error, vars) => {
      const fallbackMsg = vars.isFavourite
        ? "Failed to add to favourites"
        : "Failed to remove from favourites";
      toast.error(error.message || fallbackMsg);
    },
  });
};
