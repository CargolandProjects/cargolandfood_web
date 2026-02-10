import { useMutation, useQueryClient } from "@tanStack/react-query";
import { address } from "@/lib/services/address.service";
import { toast } from "sonner";
import { useSession } from "../useSession";

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  const { refreshSession } = useSession();
  return useMutation({
    mutationFn: address.createAddress,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
      refreshSession();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSelectAddress = () => {
  const queryClient = useQueryClient();
  const { refreshSession } = useSession();
  return useMutation({
    mutationFn: address.selectAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      refreshSession();
      toast.success("address selected");
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { refreshSession } = useSession();

  return useMutation({
    mutationFn: address.deleteAddress,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
      refreshSession();
      toast.success("address removed successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
