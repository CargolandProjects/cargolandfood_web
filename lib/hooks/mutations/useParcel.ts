import { parcel } from "@/lib/services/parcel.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateParcel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: parcel.createParcel,
    onSuccess: (res) => {
      toast.success(res.message || "Parcel created successfully");
      queryClient.invalidateQueries({ queryKey: ["activeParcel"] });
    },
    onError: (res) => {
      toast.error(res.message || "Failed to create parcel");
    },
  });
};

export const useGetParcelDlFees = () => {
  return useMutation({
    mutationFn: parcel.getDeliveryFees,
    onSuccess: (res) => {
      toast.success(res.message || "Parcel created successfully");
    },
    onError: (res) => {
      toast.error(res.message || "Failed to create parcel");
    },
  });
};

export const useDeleteParcel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: parcel.deleteParcel,
    onSuccess: (res) => {
      toast.success(res.message || "Parcel created successfully");
      queryClient.removeQueries({ queryKey: ["activeParcel"] });
    },
    onError: (res) => {
      toast.error(res.message || "Failed to create parcel");
    },
  });
};
