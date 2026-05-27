import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.replace("/");
    } catch (e: unknown) {
      const msg =
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Login gagal. Periksa email dan password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};
