import Link from 'next/link';
import { api_wisata } from '@/constans/strings';

type AllWisataResponse = {
  id: number;
  nama: string;
  alamat: string;
  harga: number;
  kategori: string;
  foto: string;
};

const kategoriStyle: Record<string, string> = {
  Alam: 'bg-green-100 text-green-700 ring-1 ring-green-200',
  Budaya: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  Kuliner: 'bg-red-100 text-red-700 ring-1 ring-red-200',
  Hiburan: 'bg-purple-100 text-purple-700 ring-1 ring-purple-200',
  Religi: 'bg-teal-100 text-teal-700 ring-1 ring-teal-200',
};

async function getWisata(): Promise<AllWisataResponse[]> {
  try {
    const res = await fetch(api_wisata, { cache: 'no-store', credentials: 'include' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function WisataPage() {
  const wisataData = await getWisata();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Daftar Wisata</h1>
          <p className="text-sm text-slate-500 mt-1">{wisataData.length} destinasi terdaftar</p>
        </div>
        <Link
          href="/dashboard/wisata/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Wisata
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari wisata..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
            />
          </div>
          <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-600">
            <option value="">Semua Kategori</option>
            <option>Alam</option>
            <option>Budaya</option>
            <option>Kuliner</option>
            <option>Hiburan</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">#</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Wisata</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Kategori</th>
                <th className="px-5 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Harga</th>
                <th className="px-5 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {wisataData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                    Belum ada data wisata
                  </td>
                </tr>
              ) : (
                wisataData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-5 py-4 text-slate-400 text-xs">{idx + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                          {item.foto ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.foto} alt={item.nama} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{item.nama}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.alamat}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${kategoriStyle[item.kategori] ?? 'bg-slate-100 text-slate-600'}`}>
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-semibold text-slate-800">
                        {item.harga === 0 ? (
                          <span className="text-green-600 font-medium">Gratis</span>
                        ) : (
                          `Rp ${item.harga.toLocaleString('id-ID')}`
                        )}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Link
                        href={`/dashboard/wisata/${item.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Menampilkan {wisataData.length} data</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
