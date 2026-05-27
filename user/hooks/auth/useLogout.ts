import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export const useLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.replace("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
};
