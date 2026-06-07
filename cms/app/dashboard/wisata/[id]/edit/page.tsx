import EditWisataForm from './EditWisataForm';

const wisataData = [
  { id: 1, nama: 'Pantai Kuta', alamat: 'Jl. Pantai Kuta, Badung, Bali', deskripsi: 'Pantai terkenal di Bali dengan ombak yang indah dan sunset yang memukau.', kategori: 'Alam', jenis: 'Dalam Kota', harga: 50000, durasi: 3 },
  { id: 2, nama: 'Tanah Lot', alamat: 'Beraban, Kediri, Tabanan, Bali', deskripsi: 'Pura laut ikonik yang berdiri di atas batu karang di tengah laut.', kategori: 'Budaya', jenis: 'Luar Kota', harga: 60000, durasi: 2 },
  { id: 3, nama: 'Ubud Monkey Forest', alamat: 'Jl. Monkey Forest, Ubud, Bali', deskripsi: 'Hutan suci dengan ratusan kera ekor panjang yang hidup bebas.', kategori: 'Alam', jenis: 'Luar Kota', harga: 80000, durasi: 2 },
  { id: 4, nama: 'Kecak Dance Uluwatu', alamat: 'Pura Luhur Uluwatu, Badung, Bali', deskripsi: 'Pertunjukan tari Kecak spektakuler dengan latar sunset di Pura Uluwatu.', kategori: 'Budaya', jenis: 'Luar Kota', harga: 100000, durasi: 2 },
  { id: 5, nama: 'Tegalalang Rice Terrace', alamat: 'Tegalalang, Ubud, Bali', deskripsi: 'Sawah terasering yang menakjubkan dengan pemandangan hijau yang memanjakan mata.', kategori: 'Alam', jenis: 'Luar Kota', harga: 15000, durasi: 1 },
  { id: 6, nama: 'Seminyak Beach', alamat: 'Seminyak, Badung, Bali', deskripsi: 'Pantai eksklusif yang terkenal dengan restoran tepi pantai dan bar sunset.', kategori: 'Alam', jenis: 'Dalam Kota', harga: 0, durasi: 4 },
  { id: 7, nama: 'Museum Bali', alamat: 'Jl. Mayor Wisnu No.1, Denpasar, Bali', deskripsi: 'Museum yang menyimpan koleksi seni dan artefak budaya Bali yang kaya.', kategori: 'Budaya', jenis: 'Dalam Kota', harga: 25000, durasi: 2 },
];

export default async function EditWisataPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const wisata = wisataData.find((w) => w.id === Number(id)) ?? null;

  return <EditWisataForm wisata={wisata} id={id} />;
}
