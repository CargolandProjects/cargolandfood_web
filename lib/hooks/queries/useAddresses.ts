import { address } from "@/lib/services/address.service";
import { useQuery } from "@tanstack/react-query";

export const useAddresses = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: address.getAddresses,
    enabled: isAuthenticated,
    select: (response) =>
      response.data
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
  });
};
