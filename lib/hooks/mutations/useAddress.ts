import { useMutation, useQueryClient } from "@tanStack/react-query";
import { address } from "@/lib/services/address.service";
import { toast } from "sonner";

export const useAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: address.createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });

      toast.success("address added");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: address.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });

      toast.success("address removed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
