import { create } from "zustand";
import type { User } from "@/types/auth";
import {
  getToken,
  setToken,
  removeToken,
  getStoredUser,
  setStoredUser,
  removeStoredUser,
} from "@/lib/auth";
import { AuthService } from "@/services/auth.service";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await AuthService.login({ email, password });
      setToken(response.token);
      setStoredUser(response.user);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    AuthService.logout().catch(() => {});
    removeToken();
    removeStoredUser();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },

  hydrate: () => {
    const token = getToken();
    const user = getStoredUser();
    if (token && user) {
      set({
        user,
        token,
        isAuthenticated: true,
      });
    }
  },
}));
