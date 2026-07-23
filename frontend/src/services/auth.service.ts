import api from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export const AuthService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },
};
