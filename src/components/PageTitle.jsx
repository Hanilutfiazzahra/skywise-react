import { Sparkles } from 'lucide-react';

export default function PageTitle({ view }) {
  const isAdmin = view === 'admin';
  return (
    <section className="page-heading" id="beranda">
      <div className="eyebrow"><Sparkles size={14} /> ASTRONOMI UNTUK SEMUA</div>
      <h1>{isAdmin ? 'Kelola Materi' : 'Jelajahi Alam Semesta'}</h1>
      <p>{isAdmin ? 'Tambahkan materi pembelajaran dan kelola daftar materi Skywise.' : 'Temukan perjalanan belajar astronomi. Daftar materi akan mengikuti data yang tersedia di aplikasi.'}</p>
    </section>
  );
}
