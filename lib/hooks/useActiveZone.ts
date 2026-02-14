import { useSession } from "@/lib/hooks/useSession";
import { useGuestLocation } from "@/lib/hooks/useGuestLocation";

/**
 * Unified hook to get the active zoneId for the current user (authenticated or guest)
 * This is what you'll use in useVendors and anywhere you need zone-based data
 *
 * Priority:
 * 1. Authenticated user's address zoneId
 * 2. Guest location zoneId
 * 3. null (no zone set)
 */
export const useActiveZone = () => {
  const { user, isAuthenticated } = useSession();
  const { zoneId: guestZoneId, isHydrated: guestHydrated } = useGuestLocation();

  // For authenticated users, get zoneId from their address
  // TODO: Adjust based on which address you want to use (first, default, selected, etc.)
  const getDefaultAddress = user?.address.find((a) => a.setAddressDefault);
  const authZoneId = isAuthenticated && getDefaultAddress?.zoneId;

  return {
    zoneId: authZoneId || guestZoneId || null,
    isLoading: !guestHydrated, // You might also check auth loading state
    isGuest: !isAuthenticated,
    isAuthenticated,
  };
};
