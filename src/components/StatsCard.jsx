import { LibraryBig } from 'lucide-react';

export default function StatsCard({ total }) {
  return (
    <section className="stats-card" aria-live="polite">
      <div className="stats-icon"><LibraryBig size={22} /></div>
      <div>
        <p className="stats-label">Total materi</p>
        <p className="stats-number">{total}</p>
      </div>
      <span className="stats-note">materi tersimpan di sesi ini</span>
    </section>
  );
}
