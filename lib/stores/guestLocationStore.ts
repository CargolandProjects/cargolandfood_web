import { create } from "zustand";

/**
 * Guest Location Store
 * Manages location/zone data for unauthenticated users
 * Persists to localStorage and syncs across tabs
 */

export interface GuestLocation {
  zoneId: string;
  addressLine1: string;
  // Add any other fields the backend returns from set-guest-user-address
}

interface GuestLocationState {
  guestLocation: GuestLocation | null;
  isHydrated: boolean;
}

interface GuestLocationActions {
  setGuestLocation: (location: GuestLocation) => void;
  clearGuestLocation: () => void;
  hydrate: () => void;
}

type GuestLocationStore = GuestLocationState & GuestLocationActions;

const STORAGE_KEY = "guest_location";

export const useGuestLocationStore = create<GuestLocationStore>((set) => ({
  guestLocation: null,
  isHydrated: false,

  setGuestLocation: (location) => {
    set({ guestLocation: location });
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    }
  },

  clearGuestLocation: () => {
    set({ guestLocation: null });
    // Clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  hydrate: () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const location = JSON.parse(stored) as GuestLocation;
        set({ guestLocation: location, isHydrated: true });
      } catch (error) {
        console.error(
          "Failed to parse guest location from localStorage:",
          error
        );
        localStorage.removeItem(STORAGE_KEY);
        set({ isHydrated: true });
      }
    } else {
      set({ isHydrated: true });
    }
  },
}));

// Cross-tab sync listener (similar to your auth session pattern)
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      const state = useGuestLocationStore.getState();
      if (event.newValue) {
        try {
          const location = JSON.parse(event.newValue) as GuestLocation;
          state.setGuestLocation(location);
        } catch (error) {
          console.error("Failed to sync guest location across tabs:", error);
        }
      } else {
        state.clearGuestLocation();
      }
    }
  });
}
