import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api_user_refresh } from "@/constans/strings";
import { RefreshResponse } from "@/type/auth";

export const useRefreshToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async (): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("Tidak ada refresh token");

      const { data } = await axios.post<RefreshResponse>(api_user_refresh, {
        refreshToken,
      });
      const newToken = data.data.access_token;
      await AsyncStorage.setItem("accessToken", newToken);
      return newToken;
    } catch (e: unknown) {
      setError("Sesi berakhir. Silakan login kembali.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { refresh, loading, error };
};
