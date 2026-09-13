import { parcel } from "@/lib/services/parcel.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateParcel = () => {
  return useMutation({
    mutationFn: parcel.createParcel,
    onSuccess: (res) => {
      toast.success(res.message || "Parcel created successfully");
    },
    onError: (res) => {
      toast.error(res.message || "Failed to create parcel");
    },
  });
};
