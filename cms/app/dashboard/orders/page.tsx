'use client';

import { useState } from 'react';
import { api_orders } from '@/constans/strings';

type OrderItem = {
  wisata_id: number;
  user_id: number;
  qty: number;
  harga: number;
  total_harga: number;
  tanggal: string;
  status: string;
};

const statusStyle: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  confirmed: 'bg-green-100 text-green-700 ring-1 ring-green-200',
  cancelled: 'bg-red-100 text-red-700 ring-1 ring-red-200',
  completed: 'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
};

export default function OrdersPage() {
  const [userId, setUserId] = useState('');
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!userId.trim()) return;
    setLoading(true);
    setError('');
    setOrders([]);
    setSearched(true);
    try {
      const res = await fetch(`${api_orders}/user/${userId.trim()}`, {
        credentials: 'include',
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal mengambil pesanan');
      setOrders(json.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = orders.reduce((s, o) => s + o.total_harga, 0);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pesanan</h1>
        <p className="text-sm text-slate-500 mt-1">Lihat riwayat pesanan berdasarkan ID user</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form onSubmit={handleSearch}>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Cari berdasarkan ID User
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="number"
                min={1}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="cth. 1"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-300 bg-slate-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Mencari...' : 'Tampilkan'}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {!searched && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium text-sm">Masukkan ID user untuk melihat pesanan</p>
        </div>
      )}

      {searched && !error && !loading && (
        <>
          {orders.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <p className="text-2xl font-bold text-slate-900">{orders.length}</p>
                <p className="text-sm text-slate-500 mt-0.5">Total Pesanan</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <p className="text-2xl font-bold text-slate-900">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                <p className="text-sm text-slate-500 mt-0.5">Total Nilai</p>
              </div>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
              <p className="text-slate-400 text-sm">Tidak ada pesanan untuk user ini</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm">Riwayat Pesanan — User #{userId}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Wisata ID</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Qty</th>
                      <th className="px-5 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Harga</th>
                      <th className="px-5 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</th>
                      <th className="px-5 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.map((o, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 text-slate-700 font-medium">#{o.wisata_id}</td>
                        <td className="px-5 py-4 text-slate-500">
                          {new Date(o.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4 text-slate-600">{o.qty}x</td>
                        <td className="px-5 py-4 text-right text-slate-600">Rp {o.harga.toLocaleString('id-ID')}</td>
                        <td className="px-5 py-4 text-right font-semibold text-slate-800">Rp {o.total_harga.toLocaleString('id-ID')}</td>
                        <td className="px-5 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyle[o.status] ?? 'bg-slate-100 text-slate-600'}`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
