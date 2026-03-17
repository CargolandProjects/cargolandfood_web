import { useEffect } from "react";
import { useGuestLocationStore } from "@/lib/stores/guestLocationStore";

/**
 * Hook to manage guest location with automatic hydration
 * Similar pattern to useSession for consistency
 */
export const useGuestLocation = () => {
  const { guestLocation, isHydrated, setGuestLocation, clearGuestLocation, hydrate } =
    useGuestLocationStore();

  // Hydrate from localStorage on mount (client-side only)
  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  return {
    guestLocation,
    isHydrated,
    setGuestLocation,
    clearGuestLocation,
    // Convenience getter for zoneId
    zoneId: guestLocation?.zoneId ?? null,
  };
};
