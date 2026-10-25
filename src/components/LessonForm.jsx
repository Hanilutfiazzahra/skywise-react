import { useState } from 'react';
import { Plus, BookOpenText } from 'lucide-react';

const themes = [
  { value: 'Kita Ada di Mana?', icon: '🌍' },
  { value: 'Tata Surya', icon: '☀️' },
  { value: 'Bintang', icon: '⭐' },
  { value: 'Galaksi', icon: '🌌' },
  { value: 'Fenomena Langit', icon: '🌠' },
];

export default function LessonForm({ onAddLesson, mode = 'admin' }) {
  const isUser = mode === 'user';
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !theme || !description.trim()) {
      setError('Lengkapi judul, tema, dan deskripsi materi terlebih dahulu.');
      return;
    }
    const selectedTheme = themes.find((item) => item.value === theme);
    onAddLesson({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      title: title.trim(),
      theme,
      icon: selectedTheme?.icon ?? '📘',
      description: description.trim(),
    });
    setTitle('');
    setTheme('');
    setDescription('');
    setError('');
  }

  return (
    <section className="panel form-panel" id="form-materi">
      <div className="panel-heading">
        <div className="panel-heading-icon"><BookOpenText size={20} /></div>
        <div><h2>{isUser ? 'Usulkan materi' : 'Tambah materi'}</h2><p>{isUser ? 'Punya ide topik astronomi? Kirim usulan materi melalui formulir ini.' : 'Isi detail untuk menambahkan materi baru ke daftar.'}</p></div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="field field-title">
            <span>Judul materi <b>*</b></span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Mengenal Planet Saturnus" maxLength={100} />
          </label>
          <label className="field">
            <span>Tema pembelajaran <b>*</b></span>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="">Pilih tema</option>
              {themes.map((item) => <option key={item.value} value={item.value}>{item.icon} {item.value}</option>)}
            </select>
          </label>
          <label className="field field-description">
            <span>Deskripsi singkat <b>*</b></span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tulis gambaran singkat tentang materi ini..." rows={3} maxLength={300} />
            <small>{description.length}/300 karakter</small>
          </label>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <span className="required-note"><b>*</b> Wajib diisi</span>
          <button className="button button-primary" type="submit"><Plus size={18} /> {isUser ? 'Kirim usulan' : 'Tambah materi'}</button>
        </div>
      </form>
    </section>
  );
}
