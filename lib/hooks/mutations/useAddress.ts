import { useMutation, useQueryClient } from "@tanstack/react-query";
import { address } from "@/lib/services/address.service";
import { toast } from "sonner";
import { useSession } from "../useSession";
import { useGuestLocation } from "../useGuestLocation";

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  const { refreshSession } = useSession();
  return useMutation({
    mutationFn: address.createAddress,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });

      const result = await refreshSession();

      if (result?.success) {
        toast.success("Address added successfully");
      } else {
        const toastId = toast.error(
          "Address added, but session update failed",
          {
            description: "Click retry to update your profile",
            duration: Infinity,
            action: {
              label: "Retry",
              onClick: async () => {
                const retryResult = await refreshSession();
                if (retryResult?.success) {
                  toast.success("Session updated successfully");
                } else {
                  toast.error("Still failed. Please try adding address again.");
                }
              },
            },
            cancel: {
              label: "close",
              onClick: () => {
                toast.dismiss(toastId);
              },
            },
          }
        );
      }
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
  const { refreshSession } = useSession();

  return useMutation({
    mutationFn: address.selectAddress,
    onSuccess: async () => {
      // Refresh session to update the session with the latest address and data
      const result = await refreshSession();

      if (result?.success) {
        toast.success("Address selected successfully");
      } else {
        // Address was selected on backend, but session update failed
        const toastId = toast.error(
          "Address selected, but session update failed",
          {
            description: "Click retry to update your profile",
            duration: Infinity,
            action: {
              label: "Retry",
              onClick: async () => {
                const retryResult = await refreshSession();
                if (retryResult?.success) {
                  toast.success("Session updated successfully");
                } else {
                  toast.error(
                    "Still failed. Please try selecting address again."
                  );
                }
              },
            },
            cancel: {
              label: "close",
              onClick: () => {
                toast.dismiss(toastId);
              },
            },
          }
        );
      }
    },
    onError: () => {
      toast.error("Failed to select address");
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { refreshSession } = useSession();

  return useMutation({
    mutationFn: address.deleteAddress,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });

      const result = await refreshSession();

      if (result?.success) {
        toast.success("Address removed successfully");
      } else {
        const toastId = toast.error(
          "Address removed, but session update failed",
          {
            description: "Click retry to update your profile",
            duration: Infinity,
            action: {
              label: "Retry",
              onClick: async () => {
                const retryResult = await refreshSession();
                if (retryResult?.success) {
                  toast.success("Session updated successfully");
                } else {
                  toast.error("Still failed. Session may be out of sync.");
                }
              },
            },
            cancel: {
              label: "close",
              onClick: () => {
                toast.dismiss(toastId);
              },
            },
          }
        );
      }
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
