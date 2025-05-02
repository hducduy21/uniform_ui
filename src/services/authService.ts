import api from "@/configs/axios";
import { AuthResponse, LoginCredentials, RegisterFormData, UserAuth } from "@/types/dto";
import { getAccessToken } from "@/utils/cookieUtil";
import axios from "axios";
import { redirect } from "react-router-dom";


export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);

    const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
    document.cookie = `accessToken=${response.data.tokens.accessToken}; path=/; expires=${expires}; secure; samesite=strict`;
    localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.response?.data.message);
    }
    throw new Error("Login failed. Please check your credentials.");
  }finally {
    console.log("Login response:", getAccessToken());
  }
};

export const register = async (credentials: RegisterFormData): Promise<void> => {
  try {
    await api.post<AuthResponse>("/user/register", credentials);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.response?.data.message);
    }
    throw new Error("Registration failed. Please try again.");
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await api.post<{ accessToken: string }>("/auth/refresh", { refreshToken });
    const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
    document.cookie = `accessToken=${response.data.accessToken}; path=/; expires=${expires}; secure; samesite=strict`;
    return response.data.accessToken;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw new Error("Failed to refresh token.");
  }
};

export const logout = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed.");
  } finally {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict";
    localStorage.removeItem("refreshToken");
  }
};

export const isAuthenticated = (): boolean => {
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split("=");
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);
  return !!cookies["accessToken"];
};

export const getCurrentUser = async (): Promise<UserAuth> => {
  try {
    const response = await api.get<UserAuth>("/auth/me");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
};
