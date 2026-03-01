import { favourites } from "@/lib/services/favourites.service";
import { vendorById, Vendors } from "@/lib/services/vendors.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleFavourite = (
  source: "homepage" | "vendorpage" | undefined,
  zoneid?: string
) => {
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
      if (source === "vendorpage") {
        queryClient.setQueryData(
          ["vendorById", vendorId],
          (oldData: vendorById) => {
            // console.log("Code execution reached here: ", vars);
            if (!oldData) {
              // console.log("Code terminated here: ", oldData);
              console.warn(`No cached data found for ${source} update`, {
                vendorId,
              });
              return;
            }
            console.log("Old Data: ", oldData);

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
      }

      if (source === "homepage") {
        if (!zoneid) {
          console.error(
            "useToggleFavourite: zoneid is required for cache update when source is 'homepage'"
          );
          return;
        }

        queryClient.setQueryData(["vendors", zoneid], (oldData: Vendors) => {
          if (!oldData) {
            console.warn(`No cached data found for ${source} update`);
            return;
          }

          const vendor = oldData.vendors.find((v) => v.id === vendorId);
          if (!vendor) return;

          // console.log("Vendor Found!", vendor);

          return {
            ...oldData,
            vendors: oldData.vendors.map((v) =>
              v.id === vendorId ? { ...v, isFavourite } : v
            ),
          };
        });
      }
    },

    onError: (error, vars) => {
      const fallbackMsg = vars.isFavourite
        ? "Failed to add to favourites"
        : "Failed to remove from favourites";
      toast.error(error.message || fallbackMsg);
    },
  });
};
