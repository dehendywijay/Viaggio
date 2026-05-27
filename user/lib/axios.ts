import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { api, api_user_refresh } from "@/constans/strings";

const instance = axios.create({ baseURL: api });

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token!)
  );
  failedQueue = [];
}

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    const isRefreshEndpoint = original?.url?.includes("/refresh");
    if (error.response?.status !== 401 || original._retry || isRefreshEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return instance(original);
        })
        .catch((err) => Promise.reject(err));
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("no refresh token");

      const { data } = await axios.post(api_user_refresh, { refreshToken });
      const newToken: string = data.data.accessToken;

      await AsyncStorage.setItem("accessToken", newToken);
      instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      processQueue(null, newToken);

      original.headers.Authorization = `Bearer ${newToken}`;
      return instance(original);
    } catch (err) {
      processQueue(err, null);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");
      router.replace("/auth/login");
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default instance;
