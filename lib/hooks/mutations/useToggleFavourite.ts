import { favourites } from "@/lib/services/favourites.service";
import { vendorById, Vendors } from "@/lib/services/vendors.service";
import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleFavourite = (
  source: "homepage" | "vendorpage" | "general" | undefined,
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

      //  This updates the isFavourite flag of the cache for ui update
      //  And prevents refetching the vendor/vendors just to update a flag
      if (source === "vendorpage" || source === "general") {
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

      if (source === "homepage" || source === "general") {
        if (!zoneid) {
          console.error(
            "useToggleFavourite: zoneid is required for cache update when source is 'homepage'"
          );
          return;
        }

        // Update cache for infinite query structure
        queryClient.setQueryData(
          ["vendors", zoneid],
          (oldData: InfiniteData<Vendors> | undefined) => {
            if (!oldData) {
              console.warn(`No cached data found for ${source} update`);
              return;
            }

            // Map through all pages and update the specific vendor
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                vendors: page.vendors.map((v) =>
                  v.id === vendorId ? { ...v, isFavourite } : v
                ),
              })),
            };
          }
        );
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
