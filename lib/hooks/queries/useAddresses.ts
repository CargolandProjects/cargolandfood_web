import { address } from "@/lib/services/address.service";
import { useQuery } from "@tanstack/react-query";

export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: address.getAddresses,
    select: (response) =>
      response.data
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
  });
};
