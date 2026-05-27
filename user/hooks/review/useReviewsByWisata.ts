import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { api_reviews } from "@/constans/strings";
import { Review } from "@/type/review";

export const useReviewsByWisata = (wisataId: string | undefined) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    if (!wisataId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get(`${api_reviews}/wisata/${wisataId}`);
      setReviews(data.data ?? []);
    } catch {
      setError("Gagal memuat ulasan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [wisataId]);

  return { reviews, loading, error, refetch: fetchReviews };
};
