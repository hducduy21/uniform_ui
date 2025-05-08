import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import * as authService from "@/services/authService";
import { AuthResponse, LoginCredentials, RegisterFormData, UserAuth } from "@/types/dto";
import { toast } from "react-toastify";
interface AuthContextType {
  user: UserAuth | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isAuthenticated: () => false,
});

interface AuthService {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<UserAuth>;
  isAuthenticated: () => boolean;
  refreshAccessToken: () => Promise<string>;
}

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  authService?: AuthService;
}> = ({ children, authService: authServiceOverride = authService }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await authServiceOverride.getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError("Failed to fetch user.");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [authServiceOverride]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await authServiceOverride.login(credentials);
        setUser(response.user);
        toast.info("Welcome back!");
      } catch (err) {
        toast.error("Login failed. Please check your credentials.");
        setError("Login failed. Please check your credentials.");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [authServiceOverride]
  );

  const register = useCallback(
    async (userData: RegisterFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        await authServiceOverride.register(userData);
        toast.success("Registration successful! Please log in.");
      } catch (err) {
        toast.error("Registration failed. Please try again.");
        setError("Registration failed. Please try again.");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [authServiceOverride]
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authServiceOverride.logout();
      setUser(null);
      toast.info("Logged out successfully, see you next time!");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
      setError("Logout failed. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [authServiceOverride]);

  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login,
      register,
      logout,
      isAuthenticated
    }),
    [user, isLoading, error, login, register, logout, isAuthenticated]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};