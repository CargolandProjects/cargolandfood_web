import { vendors } from "@/lib/services/vendors.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useVendors = (zoneId: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ["vendors", zoneId, limit],
    queryFn: ({ pageParam }) => vendors.getAllVendors(zoneId, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!zoneId.trim(),
  });
};

export const useVendorsByCategory = (
  zoneId: string,
  query: string,
  limit: number = 10
) => {
  return useInfiniteQuery({
    queryKey: ["vendorsByCategory", zoneId, query, limit],
    queryFn: ({ pageParam }) =>
      vendors.getVendorsByCategory(zoneId, query, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!zoneId.trim() && !!query,
  });
};

export const useVendorById = (id: string) => {
  return useQuery({
    queryKey: ["vendorById", id],
    queryFn: () => vendors.getVendorById(id),
    enabled: !!id,
  });
};
