import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { api_orders } from "@/constans/strings";
import { CreateOrderRequest } from "@/type/order";

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (req: CreateOrderRequest) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post(api_orders, req);
    } catch (e: unknown) {
      const msg =
        (e as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Gagal membuat pesanan.";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
};
