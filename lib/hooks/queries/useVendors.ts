import { vendors } from "@/lib/services/vendors.service";
import { useQuery } from "@tanstack/react-query";

export const useVendors = (zoneId: string) => {
  return useQuery({
    queryKey: ["vendors", zoneId],
    queryFn: () => vendors.getAllVendors(zoneId),
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
