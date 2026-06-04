import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { api_orders, api_wisata } from "@/constans/strings";
import { Order } from "@/type/order";
import { Wisata } from "@/type/wisata";

export type OrderWithWisata = Order & { wisata: Wisata | null };

export const useOrders = (userId: number | undefined) => {
  const [orders, setOrders] = useState<OrderWithWisata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get(
        `${api_orders}/user/${userId}`
      );
      const orderList: Order[] = data.data ?? [];

      const enriched = await Promise.all(
        orderList.map(async (order) => {
          try {
            const wisataRes = await axios.get(
              `${api_wisata}/${order.wisata_id}`
            );
            return { ...order, wisata: wisataRes.data.data as Wisata };
          } catch {
            return { ...order, wisata: null };
          }
        })
      );

      setOrders(enriched);
    } catch {
      setError("Gagal memuat pesanan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return { orders, loading, error, refetch: fetchOrders };
};
