import EditWisataForm from './EditWisataForm';
import { api_wisata } from '@/constans/strings';

async function getWisata(id: string) {
  try {
    const res = await fetch(`${api_wisata}/${id}`, { cache: 'no-store', credentials: 'include' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function EditWisataPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const wisata = await getWisata(id);

  return <EditWisataForm wisata={wisata} id={id} />;
}
