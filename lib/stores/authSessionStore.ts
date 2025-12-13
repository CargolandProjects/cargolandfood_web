import { create } from "zustand";
import { auth, User } from "@/lib/services/auth.service";

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthSessionState {
  user: User | null;
  pendingUser: User | null;
  status: SessionStatus;

  // Actions
  hydrateFromStorage: () => Promise<void>;
  setPendingUser: (user: User | null) => void;
  completeOtp: () => void;
  setUser: (user: User | null) => void;
  updateUser: (patch: Partial<User>) => Promise<void>;
  signOut: () => void;
}

const USER_KEY = "user";
const USER_PENDING_KEY = "user_pending";
const USER_ID_KEY = "user_id";
const ACCESS_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

const readJSON = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const writeJSON = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const useAuthSessionStore = create<AuthSessionState>((set, get) => ({
  user: null,
  pendingUser: null,
  status: "loading",

  hydrateFromStorage: async () => {
    // Determine status from storage
    const access = typeof window !== "undefined" ? localStorage.getItem(ACCESS_KEY) : null;
    const storedUser = readJSON<User>(USER_KEY);
    const pending = readJSON<User>(USER_PENDING_KEY);

    if (!access) {
      set({ user: null, pendingUser: pending, status: "unauthenticated" });
      return;
    }

    if (storedUser && access) {
      set({ user: storedUser, pendingUser: pending, status: "authenticated" });
      return;
    }

    const userId = typeof window !== "undefined" ? localStorage.getItem(USER_ID_KEY) : null;
    if (userId) {
      try {
        const res = await auth.getUserById(userId);
        if (res?.user) {
          writeJSON(USER_KEY, res.user);
          set({ user: res.user, pendingUser: pending, status: "authenticated" });
          return;
        }
      } catch {
        // fall through to unauthenticated if fetch fails
      }
    }

    set({ user: null, pendingUser: pending, status: "unauthenticated" });
  },

  setPendingUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) writeJSON(USER_PENDING_KEY, user);
      else localStorage.removeItem(USER_PENDING_KEY);
      if (user?.id) localStorage.setItem(USER_ID_KEY, user.id);
    }
    set({ pendingUser: user });
  },

  completeOtp: () => {
    const pending = get().pendingUser ?? readJSON<User>(USER_PENDING_KEY);
    if (pending) {
      writeJSON(USER_KEY, pending);
      if (typeof window !== "undefined") {
        localStorage.removeItem(USER_PENDING_KEY);
      }
      set({ user: pending, pendingUser: null, status: "authenticated" });
    }
  },

  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) writeJSON(USER_KEY, user);
      else localStorage.removeItem(USER_KEY);
    }
    set({ user, status: user ? "authenticated" : "unauthenticated" });
  },

  updateUser: async (patch) => {
    const current = get().user;
    if (!current?.id) return;
    const res = await auth.updateUserById(current.id, patch);
    if (res?.user) {
      writeJSON(USER_KEY, res.user);
      set({ user: res.user, status: "authenticated" });
    }
  },

  signOut: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(USER_PENDING_KEY);
      // Don't remove USER_ID_KEY to allow future hydration if tokens come back
    }
    set({ user: null, pendingUser: null, status: "unauthenticated" });
  },
}));
