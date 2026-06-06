import Link from 'next/link';

const stats = [
  {
    label: 'Total Wisata',
    value: '24',
    sub: '+3 bulan ini',
    color: 'blue',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    ring: 'ring-blue-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Total User',
    value: '128',
    sub: '+12 bulan ini',
    color: 'emerald',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    ring: 'ring-emerald-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Total Pesanan',
    value: '45',
    sub: '+8 bulan ini',
    color: 'orange',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    ring: 'ring-orange-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    label: 'Total Ulasan',
    value: '312',
    sub: '+27 bulan ini',
    color: 'violet',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    ring: 'ring-violet-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const quickActions = [
  {
    href: '/dashboard/wisata',
    title: 'Lihat Semua Wisata',
    desc: 'Kelola daftar destinasi wisata',
    color: 'from-blue-500 to-blue-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: '/dashboard/wisata/add',
    title: 'Tambah Wisata Baru',
    desc: 'Tambahkan destinasi wisata baru',
    color: 'from-emerald-500 to-emerald-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/dashboard/users',
    title: 'Manajemen User',
    desc: 'Cari dan kelola pengguna',
    color: 'from-violet-500 to-violet-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const recentWisata = [
  { nama: 'Pantai Kuta', kategori: 'Alam', harga: 50000 },
  { nama: 'Tanah Lot', kategori: 'Budaya', harga: 60000 },
  { nama: 'Ubud Monkey Forest', kategori: 'Alam', harga: 80000 },
  { nama: 'Kecak Dance Uluwatu', kategori: 'Budaya', harga: 100000 },
];

const kategoriColor: Record<string, string> = {
  Alam: 'bg-green-100 text-green-700',
  Budaya: 'bg-amber-100 text-amber-700',
  Kuliner: 'bg-red-100 text-red-700',
  Hiburan: 'bg-purple-100 text-purple-700',
};

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-7 flex items-center justify-between overflow-hidden relative">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 60%)' }} />
        <div className="relative">
          <p className="text-slate-400 text-sm mb-1">Selamat datang kembali,</p>
          <h1 className="text-white text-2xl font-bold">Admin Viaggio</h1>
          <p className="text-slate-400 text-sm mt-2">
            Kelola destinasi wisata, pengguna, dan konten platform Viaggio.
          </p>
        </div>
        <div className="relative hidden sm:block">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`w-11 h-11 rounded-xl ${s.bg} ring-4 ${s.ring} flex items-center justify-center mb-4`}>
              <span className={s.text}>{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
            <p className={`text-xs font-medium mt-2 ${s.text}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {quickActions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}>
              <span className="text-white">{a.icon}</span>
            </div>
            <p className="text-slate-900 font-semibold text-sm">{a.title}</p>
            <p className="text-slate-500 text-xs mt-1">{a.desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 text-sm">Wisata Terbaru</h2>
          <Link href="/dashboard/wisata" className="text-blue-600 text-xs font-medium hover:text-blue-700">
            Lihat semua
          </Link>
        </div>
        <div className="divide-y divide-slate-50">
          {recentWisata.map((w, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{w.nama}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${kategoriColor[w.kategori] ?? 'bg-slate-100 text-slate-600'}`}>
                    {w.kategori}
                  </span>
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-700">
                Rp {w.harga.toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
