"use client";

import { api_wisata } from "@/constans/strings";
import { Wisata } from "@/type/wisata";
import axios from "axios";
import { useEffect, useState } from "react";

export const useWisatabyId = (slug: string) => {
  const [wisata, setWisata] = useState<Wisata>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWisata = async () => {
    try {
      setLoading(true);
 
      const data = await axios
        .get(`${api_wisata}/${slug}`)
        .then((res) => res.data.data);

      setWisata(data);
    } catch (error) {
      console.error(error);
      setError("Gagal Mengambil Data Wisata.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchWisata();
    }
  }, [slug]);

  return {
    wisata,
    loading,
    error,
    refetch: fetchWisata,
  };
};