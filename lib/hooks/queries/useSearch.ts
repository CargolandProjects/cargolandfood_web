import { menu } from "@/lib/services/menu.service";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => menu.getSearchItems(query),
    enabled: !!query,
  });
};
