import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export const useRegister = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (nama: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await register(nama, email, password);
      router.replace("/auth/login");
    } catch (e: unknown) {
      const msg =
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Registrasi gagal. Coba lagi.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
};
