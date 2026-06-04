export type Order = {
  wisata_id: number;
  user_id: number;
  qty: number;
  harga: number;
  total_harga: number;
  tanggal: string;
  status: string;
};

export type CreateOrderRequest = {
  user_id: number;
  wisata_id: number;
  qty: number;
  harga: number;
  tanggal: string;
  status: string;
};
