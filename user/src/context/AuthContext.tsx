import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { api_user_login, api_user_logout, api_user_register, api_user } from "@/constans/strings";
import { LoginResponse, User } from "@/type/auth";

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nama: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axiosInstance.post<LoginResponse>(api_user_login, {
      email,
      password,
    });
    const { id, email: userEmail, access_token, refresh_token } = data.data;

    // Ambil nama dari endpoint profile (public, tidak butuh token)
    const profileRes = await axios.get(`${api_user}/${userEmail}`);
    const nama: string = profileRes.data?.data?.user?.nama ?? "";

    const userData: User = { id, email: userEmail, nama };

    await AsyncStorage.setItem("accessToken", access_token);
    await AsyncStorage.setItem("refreshToken", refresh_token);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (nama: string, email: string, password: string) => {
    await axiosInstance.post(api_user_register, { nama, email, password });
  };

  const logout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        await axiosInstance.post(api_user_logout, { refreshToken });
      }
    } catch {
      // best-effort logout
    } finally {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
