import { useMutation, useQueryClient } from "@tanStack/react-query";
import { address } from "@/lib/services/address.service";
import { toast } from "sonner";
import { useSession } from "../useSession";
import { useGuestLocation } from "../useGuestLocation";

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

export const useSetGuestAddress = () => {
  const { setGuestLocation } = useGuestLocation();
  return useMutation({
    mutationFn: address.setGuestAddress,
    onSuccess: (data) => {
      toast.success("Guest address set successfully");
      setGuestLocation(data);
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
    onError: () => {
      toast.error("failed to select address");
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
