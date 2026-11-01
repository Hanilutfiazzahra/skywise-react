import { useEffect, useState } from 'react';
import { Images, RefreshCw } from 'lucide-react';
import { getGalleryImages } from '../services/galleryService.js';
import GalleryCard from './GalleryCard.jsx';

const galleryThemes = [
  { name: 'Tata Surya', query: 'solar system' },
  { name: 'Bintang', query: 'stars' },
  { name: 'Galaksi', query: 'galaxy' },
  { name: 'Fenomena Langit', query: 'eclipse' },
  { name: 'Kita Ada di Mana?', query: 'earth from space' },
];

export default function GalleryPage() {
  const [theme, setTheme] = useState(galleryThemes[0]);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  async function loadImages() {
    setStatus('loading');

    try {
      const result = await getGalleryImages(theme.query);
      setImages(result);
      setStatus('success');
    } catch (error) {
      setErrorMessage(error.message);
      setStatus('error');
    }
  }

  useEffect(() => {
    loadImages();
  }, [theme]);

  function changeTheme(event) {
    const selected = galleryThemes.find((item) => item.name === event.target.value);
    setTheme(selected);
  }

  return (
    <>
      <section className="page-heading">
        <div className="eyebrow"><Images size={14} /> GALERI ASTRONOMI</div>
        <h1>Galeri Astronomi</h1>
        <p>Foto-foto astronomi dari NASA Image and Video Library.</p>
      </section>

      <section className="panel list-panel">
        <div className="list-heading">
          <div>
            <h2>Foto {theme.name}</h2>
            <p>Pilih tema untuk melihat foto yang berbeda.</p>
          </div>
          <select className="gallery-select" value={theme.name} onChange={changeTheme} aria-label="Pilih tema galeri">
            {galleryThemes.map((item) => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>

        {status === 'loading' && (
          <div className="gallery-status" role="status">
            <span className="gallery-spinner" /> Memuat foto astronomi...
          </div>
        )}

        {status === 'error' && (
          <div className="gallery-status gallery-error" role="alert">
            <p>Oops, foto gagal dimuat. Periksa koneksi internetmu lalu coba lagi.</p>
            <small>Detail: {errorMessage}</small>
            <button className="button button-primary" onClick={loadImages}>
              <RefreshCw size={16} /> Coba Lagi
            </button>
          </div>
        )}

        {status === 'success' && images.length === 0 && (
          <div className="empty-state">
            <h3>Belum ada foto untuk tema ini</h3>
            <p>Coba pilih tema lain.</p>
          </div>
        )}

        {status === 'success' && images.length > 0 && (
          <div className="gallery-grid">
            {images.map((item) => (
              <GalleryCard
                key={item.data[0].nasa_id}
                title={item.data[0].title}
                date={item.data[0].date_created}
                imageUrl={item.links && item.links.length > 0 ? item.links[0].href : ''}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
