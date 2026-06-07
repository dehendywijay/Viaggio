'use client';

import { useState } from 'react';
import Link from 'next/link';

const KATEGORI = ['Alam', 'Budaya', 'Kuliner', 'Belanja', 'Hiburan', 'Religi', 'Lainnya'];
const JENIS = ['Dalam Kota', 'Luar Kota', 'Mancanegara'];

const inputCls =
  'w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-300 transition';

type Foto = {
  id: number;
  url: string;
};

type Wisata = {
  id: number;
  nama: string;
  alamat: string;
  deskripsi: string;
  kategori: string;
  jenis: string;
  harga: number;
  durasi: number;
  fotos: Foto[];
};

export default function EditWisataForm({ wisata, id }: { wisata: Wisata | null; id: string }) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState(0);
  const [saved, setSaved] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setFileCount(files.length);
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!wisata) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-semibold text-slate-800">Wisata tidak ditemukan</p>
          <p className="text-sm text-slate-400 mt-1">ID #{id} tidak ada dalam data</p>
        </div>
        <Link
          href="/dashboard/wisata"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/wisata"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Wisata</h1>
          <p className="text-sm text-slate-500 mt-0.5">Perbarui data destinasi wisata</p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-medium">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Perubahan berhasil disimpan
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
              Informasi Dasar
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nama Wisata</label>
              <input
                name="nama"
                type="text"
                className={inputCls}
                defaultValue={wisata.nama}
                placeholder="cth. Pantai Kuta"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Alamat Lengkap</label>
              <input
                name="alamat"
                type="text"
                className={inputCls}
                defaultValue={wisata.alamat}
                placeholder="cth. Jl. Pantai Kuta, Badung, Bali"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Deskripsi</label>
              <textarea
                name="deskripsi"
                rows={4}
                className={inputCls}
                defaultValue={wisata.deskripsi}
                placeholder="Deskripsikan wisata ini secara lengkap..."
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
              Detail & Harga
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Durasi (jam)</label>
                <input
                  name="durasi"
                  type="number"
                  min={1}
                  className={inputCls}
                  defaultValue={wisata.durasi}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Harga (Rp)</label>
                <input
                  name="harga"
                  type="number"
                  min={0}
                  className={inputCls}
                  defaultValue={wisata.harga}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Kategori</label>
                <select name="kategori" className={inputCls} defaultValue={wisata.kategori}>
                  <option value="">Pilih kategori</option>
                  {KATEGORI.map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Jenis</label>
                <select name="jenis" className={inputCls} defaultValue={wisata.jenis}>
                  <option value="">Pilih jenis</option>
                  {JENIS.map((j) => <option key={j}>{j}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
              Foto Wisata
            </h2>

            <label className="block">
              <input
                type="file"
                name="fotos"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
                {previews.length === 0 ? (
                  <>
                    <div className="w-12 h-12 bg-slate-100 rounded-xl mx-auto flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-600">Klik untuk ganti foto</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG hingga 10MB</p>
                  </>
                ) : (
                  <p className="text-sm font-medium text-blue-600">{fileCount} foto dipilih</p>
                )}
              </div>
            </label>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((src, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {wisata.fotos?.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Foto Tersimpan</p>
                <div className="grid grid-cols-3 gap-2">
                  {wisata.fotos.map((foto) => (
                    <div key={foto.id} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={foto.url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-3">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span className="text-xs text-slate-500">ID Wisata: <span className="font-semibold text-slate-700">#{wisata.id}</span></span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Simpan Perubahan
            </button>
            <Link
              href="/dashboard/wisata"
              className="block w-full py-2.5 text-center bg-slate-100 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors"
            >
              Batal
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
