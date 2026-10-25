import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import LessonForm from './components/LessonForm.jsx';
import LessonList from './components/LessonList.jsx';
import Footer from './components/Footer.jsx';
import { ArrowLeft, BookOpen, Compass, Globe2, LockKeyhole, LogOut, MoonStar, Orbit, ShieldCheck, Sparkles, Star, Sun } from 'lucide-react';

const funFacts = {
  'solar-intro': 'Kalau Matahari seukuran bola besar, Bumi cuma seperti butiran kecil jika dibandingkan dengannya.',
  'solar-sun': 'Cahaya Matahari butuh sekitar 8 menit 20 detik untuk sampai ke Bumi.',
  'solar-mercury': 'Satu hari Matahari terbit-ke-terbit di Merkurius lebih lama daripada satu tahunnya.',
  'solar-venus': 'Venus berputar sangat lambat, dan arah putarannya berlawanan dengan kebanyakan planet.',
  'solar-earth': 'Sekitar 71% permukaan Bumi tertutup air, tetapi sebagian besar air itu adalah air asin.',
  'solar-mars': 'Gunung Olympus Mons di Mars adalah gunung berapi raksasa yang jauh lebih tinggi daripada Everest.',
  'solar-jupiter': 'Bintik Merah Besar di Jupiter adalah badai raksasa yang telah diamati selama ratusan tahun.',
  'solar-saturn': 'Cincin Saturnus sangat lebar, tetapi bagian utamanya relatif tipis dibandingkan lebarnya.',
  'solar-outer': 'Satu tahun di Neptunus berlangsung sekitar 165 tahun Bumi.',
  'solar-small-bodies': 'Ekor komet biasanya mengarah menjauhi Matahari karena dorongan angin Matahari dan tekanan cahaya.'
};

const lessonExtras = {
  'solar-intro': { question: 'Kenapa planet-planet bisa tetap mengorbit Matahari?', answer: 'Karena tarikan gravitasi Matahari.', explore: 'Bayangkan Tata Surya seperti keluarga besar. Matahari adalah pusatnya, sedangkan planet-planet bergerak pada jalurnya masing-masing.' },
  'solar-sun': { question: 'Apakah Matahari termasuk planet?', answer: 'Bukan, Matahari adalah bintang yang menghasilkan cahaya dan energi sendiri.', explore: 'Coba bayangkan bagaimana kehidupan di Bumi akan berubah jika Matahari tiba-tiba tidak memancarkan cahaya.' },
  'solar-mercury': { question: 'Planet apa yang paling dekat dengan Matahari?', answer: 'Merkurius.', explore: 'Walaupun paling dekat dengan Matahari, Merkurius bukan planet terpanas. Venus justru lebih panas karena atmosfernya.' },
  'solar-venus': { question: 'Mengapa Venus lebih panas daripada Merkurius?', answer: 'Atmosfer Venus yang tebal memerangkap panas melalui efek rumah kaca.', explore: 'Awan tebal Venus bukan awan air seperti yang sering kita lihat di Bumi. Atmosfernya sangat berbeda.' },
  'solar-earth': { question: 'Apa yang membuat Bumi cocok untuk kehidupan seperti yang kita kenal?', answer: 'Antara lain adanya air cair, atmosfer, dan suhu yang sesuai.', explore: 'Bumi terlihat biru dari luar angkasa karena sebagian besar permukaannya tertutup lautan.' },
  'solar-mars': { question: 'Apa yang membuat permukaan Mars tampak merah?', answer: 'Mineral yang mengandung besi mengalami oksidasi, mirip proses terbentuknya karat.', explore: 'Robot penjelajah telah dikirim ke Mars untuk mempelajari batuan, cuaca, dan kemungkinan adanya air pada masa lalu.' },
  'solar-jupiter': { question: 'Apa nama badai besar yang terlihat di Jupiter?', answer: 'Bintik Merah Besar.', explore: 'Jupiter begitu besar sehingga lebih dari seribu Bumi secara volume bisa muat di dalamnya, meski perbandingan tepat bergantung pada cara menghitung.' },
  'solar-saturn': { question: 'Apakah cincin Saturnus terbuat dari satu lempeng padat?', answer: 'Tidak. Cincinnya terdiri dari banyak partikel es, debu, dan batuan.', explore: 'Dari kejauhan cincin Saturnus terlihat seperti piringan, tetapi sebenarnya terdiri dari banyak bagian kecil yang mengorbit planet.' },
  'solar-outer': { question: 'Planet manakah yang memiliki tahun paling panjang di antara delapan planet?', answer: 'Neptunus, dengan satu tahun sekitar 165 tahun Bumi.', explore: 'Uranus punya kemiringan sumbu ekstrem sehingga seolah-olah berputar sambil rebahan.' },
  'solar-small-bodies': { question: 'Apa perbedaan singkat antara asteroid dan komet?', answer: 'Asteroid umumnya berbatu atau logam, sedangkan komet banyak mengandung es dan debu.', explore: 'Saat komet mendekati Matahari, esnya memanas dan melepaskan gas serta debu yang dapat membentuk ekor.' }
};

const themes = [
  { id: 'earth', title: 'Kita Ada di Mana?', icon: '🌍', description: 'Kenali Bumi dan tempat kita di alam semesta. Cari tahu posisi Bumi dalam ruang yang begitu luas.', symbol: Globe2 },
  { id: 'solar', title: 'Tata Surya', icon: '☀️', description: 'Kenalan dengan Matahari dan planet-planet yang ada di sekitar kita.', symbol: Sun },
  { id: 'stars', title: 'Bintang', icon: '⭐', description: 'Apa itu bintang? Bagaimana bintang bisa bersinar di langit malam?', symbol: Star },
  { id: 'galaxies', title: 'Galaksi', icon: '🌌', description: 'Kenali galaksi tempat kita tinggal dan galaksi-galaksi lain di alam semesta.', symbol: Orbit },
  { id: 'sky', title: 'Fenomena Langit', icon: '🌠', description: 'Pelajari fenomena langit seperti gerhana, hujan meteor, dan aurora.', symbol: MoonStar },
];

export default function App() {
  const [lessons, setLessons] = useState([
    { id: 'solar-intro', title: 'Mengenal Tata Surya', theme: 'Tata Surya', icon: '☀️', description: 'Tata Surya terdiri dari Matahari dan benda-benda langit yang mengorbitnya.', content: 'Matahari menjadi pusat Tata Surya. Delapan planet yang mengelilinginya adalah Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus. Selain planet, Tata Surya juga memiliki planet katai, asteroid, komet, dan berbagai benda kecil lainnya. Semua benda tersebut bergerak karena pengaruh gravitasi. Jarak antarplanet sangat luas, sehingga gambar Tata Surya di buku biasanya tidak menunjukkan ukuran dan jarak dengan skala sebenarnya.' },
    { id: 'solar-sun', title: 'Matahari, Pusat Tata Surya', theme: 'Tata Surya', icon: '🌞', description: 'Kenali bintang yang memberi cahaya dan energi untuk Bumi.', content: 'Matahari adalah bintang yang berada di pusat Tata Surya. Gravitasi Matahari menjaga planet-planet tetap berada pada orbitnya. Energi Matahari dihasilkan melalui proses fusi nuklir di bagian intinya, ketika hidrogen bergabung membentuk helium. Energi tersebut bergerak keluar dan akhirnya dipancarkan sebagai cahaya dan panas. Bagi Bumi, energi Matahari penting untuk cuaca, iklim, dan proses fotosintesis pada tumbuhan. Energi Matahari dihasilkan melalui proses fusi nuklir di bagian intinya, ketika hidrogen bergabung membentuk helium. Energi tersebut bergerak keluar dan akhirnya dipancarkan sebagai cahaya dan panas. Bagi Bumi, energi Matahari penting untuk cuaca, iklim, dan proses fotosintesis pada tumbuhan.' },
    { id: 'solar-mercury', title: 'Merkurius: Planet Terdekat', theme: 'Tata Surya', icon: '🪨', description: 'Planet terkecil yang mengorbit paling dekat dengan Matahari.', content: 'Merkurius memiliki permukaan berbatu dan hampir tidak memiliki atmosfer tebal. Suhu permukaannya berubah sangat besar antara siang dan malam. Karena atmosfernya sangat tipis, panas tidak tersimpan dengan baik ketika malam tiba. Permukaan Merkurius dipenuhi kawah akibat tumbukan benda langit, sehingga sekilas terlihat mirip dengan Bulan. Walaupun paling dekat dengan Matahari, Merkurius bukan planet terpanas. Karena atmosfernya sangat tipis, panas tidak tersimpan dengan baik ketika malam tiba. Permukaan Merkurius dipenuhi kawah akibat tumbukan benda langit, sehingga sekilas terlihat mirip dengan Bulan. Walaupun paling dekat dengan Matahari, Merkurius bukan planet terpanas.' },
    { id: 'solar-venus', title: 'Venus, Planet yang Panas', theme: 'Tata Surya', icon: '🟠', description: 'Planet dengan atmosfer tebal dan suhu permukaan sangat tinggi.', content: 'Atmosfer Venus kaya akan karbon dioksida. Efek rumah kaca yang kuat membuat Venus menjadi planet terpanas di Tata Surya. Lapisan awannya sangat tebal dan mengandung tetesan asam sulfat, sehingga permukaan Venus sulit diamati secara langsung dari luar angkasa. Tekanan atmosfer di permukaannya juga jauh lebih tinggi daripada tekanan udara di permukaan Bumi. Kondisi ini membuat Venus menjadi lingkungan yang sangat ekstrem bagi manusia. Lapisan awannya sangat tebal dan mengandung tetesan asam sulfat, sehingga permukaan Venus sulit diamati secara langsung dari luar angkasa. Tekanan atmosfer di permukaannya juga jauh lebih tinggi daripada tekanan udara di permukaan Bumi. Kondisi ini membuat Venus menjadi lingkungan yang sangat ekstrem bagi manusia.' },
    { id: 'solar-earth', title: 'Bumi, Rumah Kita', theme: 'Tata Surya', icon: '🌍', description: 'Planet yang kita tinggali dan satu-satunya tempat yang diketahui mendukung kehidupan.', content: 'Bumi memiliki air dalam bentuk cair di permukaannya, atmosfer yang mendukung kehidupan, dan satu satelit alami yaitu Bulan. Atmosfer membantu menjaga suhu dan melindungi permukaan dari sebagian radiasi berbahaya serta benda kecil dari ruang angkasa. Bumi juga memiliki medan magnet yang membantu membelokkan banyak partikel bermuatan dari Matahari. Hingga kini, Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan. Atmosfer membantu menjaga suhu dan melindungi permukaan dari sebagian radiasi berbahaya serta benda kecil dari ruang angkasa. Bumi juga memiliki medan magnet yang membantu membelokkan banyak partikel bermuatan dari Matahari. Hingga kini, Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan.' },
    { id: 'solar-mars', title: 'Mars si Planet Merah', theme: 'Tata Surya', icon: '🔴', description: 'Planet berbatu yang menarik perhatian para peneliti.', content: 'Warna kemerahan Mars berasal dari mineral besi yang teroksidasi di permukaannya. Para ilmuwan mempelajari Mars untuk memahami sejarah air dan kemungkinan kehidupan mikroba di masa lalu. Mars memiliki gunung, lembah, kawah, dan jejak aliran yang menunjukkan bahwa air pernah mengalir di permukaannya. Planet ini memiliki dua satelit kecil, Phobos dan Deimos. Sejumlah wahana robotik telah dikirim untuk memotret permukaan, memeriksa batuan, dan mempelajari cuacanya. Mars memiliki gunung, lembah, kawah, dan jejak aliran yang menunjukkan bahwa air pernah mengalir di permukaannya. Planet ini memiliki dua satelit kecil, Phobos dan Deimos. Sejumlah wahana robotik telah dikirim untuk memotret permukaan, memeriksa batuan, dan mempelajari cuacanya.' },
    { id: 'solar-jupiter', title: 'Jupiter, Planet Terbesar', theme: 'Tata Surya', icon: '🟤', description: 'Raksasa gas yang memiliki badai besar dan banyak bulan.', content: 'Jupiter adalah planet terbesar di Tata Surya. Bintik Merah Besar merupakan badai raksasa yang telah diamati selama berabad-abad. Jupiter terutama tersusun dari hidrogen dan helium, sehingga tidak memiliki permukaan padat seperti Bumi. Planet ini mempunyai sistem cincin yang tipis dan banyak satelit alami. Gravitasi Jupiter yang kuat juga memengaruhi pergerakan berbagai benda di wilayah luar Tata Surya. Jupiter terutama tersusun dari hidrogen dan helium, sehingga tidak memiliki permukaan padat seperti Bumi. Planet ini mempunyai sistem cincin yang tipis dan banyak satelit alami. Gravitasi Jupiter yang kuat juga memengaruhi pergerakan berbagai benda di wilayah luar Tata Surya.' },
    { id: 'solar-saturn', title: 'Saturnus dan Cincinnya', theme: 'Tata Surya', icon: '🪐', description: 'Planet raksasa yang terkenal dengan sistem cincin yang mencolok.', content: 'Cincin Saturnus tersusun terutama dari bongkahan es, debu, dan batuan. Saturnus juga memiliki banyak satelit alami. Cincin-cincinnya terbagi menjadi beberapa bagian dengan celah di antaranya. Dari Bumi, cincin itu dapat terlihat jelas menggunakan teleskop, tetapi dari dekat bentuknya lebih menyerupai kumpulan partikel yang mengorbit daripada satu benda padat. Saturnus juga merupakan planet raksasa gas dengan kerapatan rata-rata lebih rendah daripada air. Cincin-cincinnya terbagi menjadi beberapa bagian dengan celah di antaranya. Dari Bumi, cincin itu dapat terlihat jelas menggunakan teleskop, tetapi dari dekat bentuknya lebih menyerupai kumpulan partikel yang mengorbit daripada satu benda padat. Saturnus juga merupakan planet raksasa gas dengan kerapatan rata-rata lebih rendah daripada air.' },
    { id: 'solar-outer', title: 'Uranus dan Neptunus', theme: 'Tata Surya', icon: '🔵', description: 'Dua planet terluar yang dingin dan jauh dari Matahari.', content: 'Uranus berputar dengan kemiringan sumbu yang sangat besar. Neptunus berada paling jauh dari Matahari di antara delapan planet dan memiliki angin yang sangat kencang. Kedua planet sering disebut raksasa es karena bagian dalamnya mengandung banyak materi seperti air, amonia, dan metana dalam kondisi bertekanan tinggi. Metana di atmosfer membantu memberi warna biru pada keduanya, meskipun warna dan komposisi atmosfernya tidak persis sama. Karena sangat jauh dari Matahari, keduanya menerima jauh lebih sedikit cahaya dan panas dibandingkan Bumi. Kedua planet sering disebut raksasa es karena bagian dalamnya mengandung banyak materi seperti air, amonia, dan metana dalam kondisi bertekanan tinggi. Metana di atmosfer membantu memberi warna biru pada keduanya, meskipun warna dan komposisi atmosfernya tidak persis sama. Karena sangat jauh dari Matahari, keduanya menerima jauh lebih sedikit cahaya dan panas dibandingkan Bumi.' },
    { id: 'solar-small-bodies', title: 'Asteroid, Komet, dan Meteoroid', theme: 'Tata Surya', icon: '☄️', description: 'Kenali benda-benda kecil yang juga menjadi bagian Tata Surya.', content: 'Asteroid umumnya tersusun dari batuan dan logam. Komet mengandung es dan debu, sedangkan meteoroid adalah benda kecil yang bergerak di ruang angkasa. Sebagian besar asteroid berada di sabuk antara Mars dan Jupiter, walaupun ada juga yang memiliki orbit berbeda. Saat komet mendekati Matahari, sebagian esnya berubah menjadi gas dan membawa debu hingga membentuk koma serta ekor. Meteoroid yang memasuki atmosfer Bumi dan berpijar terlihat sebagai meteor; jika sisanya sampai ke permukaan, benda itu disebut meteorit. Sebagian besar asteroid berada di sabuk antara Mars dan Jupiter, walaupun ada juga yang memiliki orbit berbeda. Saat komet mendekati Matahari, sebagian esnya berubah menjadi gas dan membawa debu hingga membentuk koma serta ekor. Meteoroid yang memasuki atmosfer Bumi dan berpijar terlihat sebagai meteor; jika sisanya sampai ke permukaan, benda itu disebut meteorit.' }
  ]);
  const [page, setPage] = useState('home');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [lightTheme, setLightTheme] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const visibleLessons = useMemo(() => lessons.filter((lesson) => !selectedTheme || lesson.theme === selectedTheme.title), [lessons, selectedTheme]);
  const bookmarkedLessons = useMemo(() => lessons.filter((lesson) => bookmarks.includes(lesson.id)), [lessons, bookmarks]);

  function toggleBookmark(lesson) {
    if (!loggedIn) { setLoginError('Login diperlukan untuk menyimpan bookmark.'); setPage('admin-login'); return; }
    setBookmarks((current) => {
      const next = current.includes(lesson.id) ? current.filter((id) => id !== lesson.id) : [...current, lesson.id];
      try { localStorage.setItem(`skywise-bookmarks-${userEmail.toLowerCase()}`, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function addLesson(lesson) {
    setLessons((current) => [...current, lesson]);
    setPage('admin');
  }
  function editLesson(lesson) {
    const title = window.prompt('Judul materi:', lesson.title);
    if (title === null || !title.trim()) return;
    const description = window.prompt('Deskripsi materi:', lesson.description || '');
    if (description === null) return;
    const content = window.prompt('Isi materi:', lesson.content || lesson.description || '');
    if (content === null) return;
    const funFact = window.prompt('Tahukah Kamu? (fakta unik):', lesson.funFact || funFacts[lesson.id] || '');
    if (funFact === null) return;
    setLessons((current) => current.map((item) => item.id === lesson.id ? { ...item, title: title.trim(), description: description.trim(), content: content.trim(), funFact: funFact.trim() } : item));
  }
  function deleteLesson(lesson) {
    if (!window.confirm(`Hapus materi "${lesson.title}"?`)) return;
    setLessons((current) => current.filter((item) => item.id !== lesson.id));
    setBookmarks((current) => current.filter((id) => id !== lesson.id));
  }
  function goTo(nextPage) {
    if (nextPage === 'admin-login' || nextPage === 'login') { setLoginError(''); setPage('admin-login'); return; }
    if (nextPage === 'admin' && !isAdmin) { setLoginError(''); setPage('admin-login'); return; }
    if (nextPage === 'bookmarks' && !loggedIn) { setLoginError('Login diperlukan untuk membuka bookmark.'); setPage('admin-login'); return; }
    setSelectedTheme(null);
    setPage(nextPage);
  }
  function login(event) {
    event.preventDefault();
    // Demo only: replace this client-side check with backend authentication before production.
    const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@skywise.id').toLowerCase();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'skywise123';
    if (username.trim().toLowerCase() === adminEmail && password === adminPassword) { setIsAdmin(true); setLoggedIn(true); setUserEmail(username.trim()); try { setBookmarks(JSON.parse(localStorage.getItem(`skywise-bookmarks-${username.trim().toLowerCase()}`) || '[]')); } catch { setBookmarks([]); } setLoginError(''); setPassword(''); setPage('admin'); }
    else if (username.includes('@') && password.length >= 4) { setIsAdmin(false); setLoggedIn(true); setUserEmail(username.trim()); try { setBookmarks(JSON.parse(localStorage.getItem(`skywise-bookmarks-${username.trim().toLowerCase()}`) || '[]')); } catch { setBookmarks([]); } setLoginError(''); setPassword(''); setPage('lessons'); }
    else setLoginError('Masukkan email valid dan password minimal 4 karakter.');
  }
  function logout() { setIsAdmin(false); setLoggedIn(false); setUserEmail(''); setUsername(''); setPassword(''); setPage('home'); }

  return <div className={`app-shell ${lightTheme ? "theme-light" : "theme-dark"}`}><div className="starfield" aria-hidden="true" />
    <Header page={page} isAdmin={isAdmin} loggedIn={loggedIn} onNavigate={goTo} onLogout={logout} lightTheme={lightTheme} onToggleTheme={() => setLightTheme((v) => !v)} />
    <main className="main-content">
      {page === 'home' && <>
        <section className="original-hero" id="beranda">
          <div className="eyebrow"><Sparkles size={14}/> ASTRONOMI UNTUK SEMUA</div>
          <h1>Yuk, Kenalan dengan<br/><span>Alam Semesta!</span></h1>
          <p>Belajar astronomi dengan cara yang sederhana<br className="desktop-break"/> dan menyenangkan.</p>
          <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-planet planet-one"/><div className="hero-planet planet-two"/>
        </section>
        <section className="theme-section"><div className="section-title"><div><div className="section-kicker">PILIH PETUALANGANMU</div><h2>Jelajahi alam semesta</h2><p>Mulai dari tempat kita tinggal hingga luasnya galaksi.</p></div><span className="theme-count">05 topik</span></div>
          <div className="theme-grid">{themes.map((theme, index) => <article className="theme-card" key={theme.id}><div className={`theme-icon theme-icon-${index}`}>{theme.icon}</div><div className="theme-index">TOPIK 0{index + 1}</div><h3>{theme.title}</h3><p>{theme.description}</p><button className="text-link" onClick={() => { setSelectedTheme(theme); setPage('lessons'); }}>Pelajari <span>→</span></button></article>)}</div>
        </section>
      </>}
      {page === 'lessons' && <>
        <button className="back-link" onClick={() => { setSelectedTheme(null); setPage('home'); }}><ArrowLeft size={16}/> Kembali ke Beranda</button>
        <PageHeading eyebrow="PERPUSTAKAAN SKYWISE" title={selectedTheme?.title || 'Daftar Materi Pembelajaran'} description={selectedTheme?.description || 'Temukan materi untuk memulai perjalanan belajar astronomi.'}/>
        <LessonList lessons={visibleLessons} view="user" onSelect={(lesson) => { setSelectedLesson(lesson); setPage('detail'); }}/>
      </>}
      {page === 'bookmarks' && <>
        <button className="back-link" onClick={() => setPage('home')}><ArrowLeft size={16}/> Kembali ke Beranda</button>
        <PageHeading eyebrow="MATERI TERSIMPAN" title="Bookmark Saya" description="Materi yang kamu simpan supaya gampang dibaca lagi."/>
        <LessonList lessons={bookmarkedLessons} view="user" onSelect={(lesson) => { setSelectedLesson(lesson); setPage('detail'); }}/>
      </>}
      {page === 'detail' && <>
        <button className="back-link" onClick={() => setPage('lessons')}><ArrowLeft size={16}/> Kembali ke Daftar Materi</button>
        {selectedLesson ? <article className="panel detail-panel"><div className="lesson-symbol detail-symbol">{selectedLesson.icon || '📘'}</div><div className="section-kicker">{selectedLesson.theme}</div><h1>{selectedLesson.title}</h1><p>{selectedLesson.description}</p><div className="detail-bookmark-action"><button className="button button-quiet" onClick={() => toggleBookmark(selectedLesson)}>{bookmarks.includes(selectedLesson.id) ? '★ Hapus dari Bookmark' : '☆ Simpan Bookmark'}</button>{!loggedIn && <span>Login diperlukan untuk menyimpan materi.</span>}</div><div className="detail-content"><div className="section-kicker">MATERI SINGKAT</div><h2>Yang perlu kamu ketahui</h2><p>{selectedLesson.content || selectedLesson.description}</p></div><div className="fun-fact-box"><div className="fun-fact-icon">💡</div><div><div className="fun-fact-label">TAHUKAH KAMU?</div><h2>Fakta kecil, wawasan baru</h2><p>{selectedLesson.funFact || funFacts[selectedLesson.id] || 'Alam semesta menyimpan banyak hal menarik. Coba cari tahu fakta lain tentang topik ini!'}</p></div></div><div className="think-box"><span>🧭</span><div><b>Yuk, eksplorasi lagi</b><p>{lessonExtras[selectedLesson.id]?.explore || 'Coba cari hubungan materi ini dengan hal-hal yang kamu lihat di langit.'}</p></div></div></article> : <div className="panel empty-state"><h3>Belum ada materi untuk dibuka</h3><p>Pilih materi dari daftar setelah tersedia.</p></div>}
      </>}
      {page === 'admin-login' && <section className="login-layout"><div className="login-aside"><div className="login-mark"><img src="/assets/images/skywise-logo-modern.png" alt="Skywise"/></div><div className="eyebrow"><ShieldCheck size={14}/> AKUN SKYWISE</div><h1>Belajar bersama,<br/><span>jelajahi kemungkinan.</span></h1><p>Masuk sebagai pengguna untuk menjelajahi materi, atau admin untuk mengelola perpustakaan.</p></div><form className="panel login-panel" onSubmit={login}><div className="panel-heading"><div className="panel-heading-icon"><LockKeyhole size={20}/></div><div><h2>Login Skywise</h2><p>Masuk sebagai pengguna atau admin dengan email dan password.</p></div></div><label className="field"><span>Email</span><input type="email" autoComplete="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="nama@email.com" required/></label><label className="field login-password"><span>Password</span><input type="password" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Masukkan password" required/></label>{loginError && <p className="form-error" role="alert">{loginError}</p>}<button className="button button-primary login-submit" type="submit"><LockKeyhole size={16}/> Masuk</button><button className="back-link login-back" type="button" onClick={()=>setPage('home')}><ArrowLeft size={15}/> Kembali ke Beranda</button><p className="login-note">Gunakan akun yang sesuai untuk masuk. Pengguna dapat login dengan email valid dan password minimal 4 karakter (demo lokal).</p></form></section>}
      {page === 'admin' && isAdmin && <><div className="admin-welcome"><div><div className="eyebrow"><ShieldCheck size={14}/> DASHBOARD ADMIN</div><h1>Kelola Materi</h1><p>Kelola materi astronomi yang tersedia di Skywise.</p></div><div className="admin-welcome-actions"><button className="button button-primary" onClick={() => { setSelectedTheme(null); setPage('lessons'); }}><BookOpen size={16}/> Lihat Tampilan Belajar</button><button className="button button-quiet" onClick={logout}><LogOut size={16}/> Keluar</button></div></div><div className="admin-stat panel"><div className="stats-icon"><BookOpen size={20}/></div><div><p className="stats-label">Total materi</p><p className="stats-number">{lessons.length}</p></div><span className="stats-note">Materi dalam sesi ini</span></div><LessonForm onAddLesson={addLesson} mode="admin"/><LessonList lessons={lessons} view="admin" onEdit={editLesson} onDelete={deleteLesson}/></>}
    </main><Footer/>
  </div>;
}

function PageHeading({eyebrow,title,description}) { return <section className="page-heading"><div className="eyebrow"><Sparkles size={14}/>{eyebrow}</div><h1>{title}</h1><p>{description}</p></section>; }
