import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { api_user } from "@/constans/strings";
import { ProfileResponse, UserProfile } from "@/type/profile";

export const useProfile = (email: string | undefined) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get<ProfileResponse>(
        `${api_user}/${email}`
      );
      setProfile(data.data);
    } catch {
      setError("Gagal memuat profil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [email]);

  return { profile, loading, error, refetch: fetchProfile };
};
