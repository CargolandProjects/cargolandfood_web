import { parcel } from "@/lib/services/parcel.service";
import { useQuery } from "@tanstack/react-query";

export const useActiveParcel = () => {
  return useQuery({
    queryKey: ["activeParcel"],
    queryFn: parcel.getActiveParcel,
    select: (res) => res.data
  });
};
