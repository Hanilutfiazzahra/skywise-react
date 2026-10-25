const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL belum diatur. Konfigurasikan URL backend saat API tersedia.');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Permintaan API gagal (${response.status}).`);
  }

  if (response.status === 204) return null;
  return response.json();
}

// Siap digunakan ketika endpoint backend materi sudah tersedia.
export function getLessons() {
  return request('/lessons');
}

export function createLesson(lesson) {
  return request('/lessons', {
    method: 'POST',
    body: JSON.stringify(lesson),
  });
}
