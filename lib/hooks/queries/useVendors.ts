import { vendors } from "@/lib/services/vendors.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useVendors = (zoneId: string) => {
  return useInfiniteQuery({
    queryKey: ["vendors", zoneId],
    queryFn: ({ pageParam }) => vendors.getAllVendors(zoneId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!zoneId.trim(),
  });
};

export const useVendorById = (id: string) => {
  return useQuery({
    queryKey: ["vendorById", id],
    queryFn: () => vendors.getVendorById(id),
    enabled: !!id,
  });
};
