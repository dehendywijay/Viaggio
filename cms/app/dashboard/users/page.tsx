'use client';

import { useState } from 'react';

const dummyResult = {
  nama: 'Budi Santoso',
  id: 42,
  email: 'budi@example.com',
  reviews: [
    { wisata: 'Pantai Kuta', rating: 5, comment: 'Pantainya sangat indah, pasirnya putih bersih!', tanggal: '2 Jun 2025' },
    { wisata: 'Tanah Lot', rating: 4, comment: 'Pemandangan sunset yang luar biasa.', tanggal: '15 Mei 2025' },
    { wisata: 'Ubud Monkey Forest', rating: 3, comment: 'Bagus tapi lumayan ramai wisatawan.', tanggal: '3 Apr 2025' },
  ],
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

export default function UsersPage() {
  const [query, setQuery] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    if (query.includes('@')) {
      setShowResult(true);
      setNotFound(false);
    } else {
      setShowResult(false);
      setNotFound(true);
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manajemen User</h1>
        <p className="text-sm text-slate-500 mt-1">Cari pengguna berdasarkan alamat email</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form onSubmit={handleSearch}>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Cari berdasarkan Email
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="user@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-300 bg-slate-50"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              Cari
            </button>
          </div>
        </form>
      </div>

      {notFound && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <p className="text-slate-700 font-semibold">User tidak ditemukan</p>
          <p className="text-slate-400 text-sm mt-1">Tidak ada akun dengan email tersebut.</p>
        </div>
      )}

      {!showResult && !notFound && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium text-sm">Masukkan email untuk mencari user</p>
        </div>
      )}

      {showResult && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-200">
                <span className="text-white text-xl font-bold">
                  {dummyResult.nama.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900">{dummyResult.nama}</h3>
                <p className="text-sm text-slate-500">{dummyResult.email}</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400">User ID</p>
                <p className="text-sm font-semibold text-slate-700">#{dummyResult.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-100">
              {[
                { label: 'Total Ulasan', value: dummyResult.reviews.length },
                { label: 'Rating Rata-rata', value: '4.0' },
                { label: 'Bergabung', value: 'Jan 2025' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-slate-900">{item.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 text-sm">
                Riwayat Ulasan
                <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full font-medium">
                  {dummyResult.reviews.length}
                </span>
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {dummyResult.reviews.map((r, i) => (
                <div key={i} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-slate-800">{r.wisata}</p>
                        <StarRating rating={r.rating} />
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{r.comment}</p>
                    </div>
                    <p className="text-xs text-slate-400 shrink-0 mt-0.5">{r.tanggal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
