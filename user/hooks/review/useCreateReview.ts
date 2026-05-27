import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { api_reviews } from "@/constans/strings";

export const useCreateReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = async (
    wisataId: string,
    rating: number,
    comment: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post(api_reviews, {
        wisata_id: wisataId,
        rating,
        comment,
      });
    } catch (e: unknown) {
      const msg =
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Gagal mengirim ulasan.";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading, error };
};
