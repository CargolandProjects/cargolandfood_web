import { address } from "@/lib/services/address.service";
import { useQuery } from "@tanstack/react-query";

export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: address.getAddresses,
  });
};
