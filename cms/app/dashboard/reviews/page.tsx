'use client';

import { useState } from 'react';
import { api_reviews } from '@/constans/strings';

type ReviewItem = {
  id: number;
  rating: number;
  comment: string;
  user: { id: number; nama: string };
};

type ReviewsResult = {
  wisata: { id: number; nama: string };
  reviews: ReviewItem[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [wisataId, setWisataId] = useState('');
  const [result, setResult] = useState<ReviewsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!wisataId.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setSearched(true);
    try {
      const res = await fetch(`${api_reviews}/wisata/${wisataId.trim()}`, {
        credentials: 'include',
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal mengambil ulasan');
      setResult(json.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  const avgRating = result?.reviews?.length
    ? (result.reviews.reduce((s, r) => s + r.rating, 0) / result.reviews.length).toFixed(1)
    : '-';

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ulasan Wisata</h1>
        <p className="text-sm text-slate-500 mt-1">Lihat ulasan berdasarkan ID wisata</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form onSubmit={handleSearch}>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Cari berdasarkan ID Wisata
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <input
                type="number"
                min={1}
                value={wisataId}
                onChange={(e) => setWisataId(e.target.value)}
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

      {!searched && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium text-sm">Masukkan ID wisata untuk melihat ulasan</p>
        </div>
      )}

      {searched && !error && result && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{result.wisata.nama}</h2>
                <p className="text-sm text-slate-500 mt-0.5">ID Wisata: #{result.wisata.id}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{avgRating}</p>
                <p className="text-xs text-slate-400">{result.reviews.length} ulasan</p>
              </div>
            </div>
          </div>

          {result.reviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
              <p className="text-slate-400 text-sm">Belum ada ulasan untuk wisata ini</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm">
                  Semua Ulasan
                  <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full font-medium">
                    {result.reviews.length}
                  </span>
                </h3>
              </div>
              <div className="divide-y divide-slate-50">
                {result.reviews.map((r) => (
                  <div key={r.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shrink-0">
                        <span className="text-slate-600 text-xs font-bold">{r.user.nama.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-slate-800">{r.user.nama}</p>
                          <StarRating rating={r.rating} />
                          <span className="text-xs text-slate-400">({r.rating}/5)</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{r.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {searched && !error && !result && !loading && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <p className="text-slate-400 text-sm">Wisata tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}
