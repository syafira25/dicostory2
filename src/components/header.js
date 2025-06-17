export default function renderHeader() {
  const nav = document.querySelector('header nav');
  if (!nav) return;

  const token = localStorage.getItem('token');

  nav.innerHTML = `
    <a href="#/" aria-label="Beranda">Beranda</a>
    <a href="#/tambah" aria-label="Tambah Cerita">Tambah Cerita</a>
    <a href="#/tentang" aria-label="Tentang">Tentang</a>
    ${token
      ? '<a href="#" id="logout-link" aria-label="Logout">Logout</a>'
      : '<a href="#/login" aria-label="Login">Login</a>'}
  `;

  if (token) {
    const logoutBtn = document.getElementById('logout-link');
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');

      // Ubah URL ke login dan render ulang header tanpa reload
      window.location.hash = '/login';
      setTimeout(() => renderHeader(), 100); // memberi jeda agar hashchange selesai
    });
  }
}
