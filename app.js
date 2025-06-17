// ✅ Daftarkan Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('✅ Service Worker terdaftar:', reg.scope))
      .catch(err => console.error('❌ Gagal mendaftarkan Service Worker:', err));
  });
}

// ✅ Impor CSS dan halaman
import './style.css';
import 'leaflet/dist/leaflet.css'; // jika kamu pakai leaflet
import home from './src/routes/home.js';
import tambah from './src/routes/tambah.js';
import tentang from './src/routes/tentang.js';
import login from './src/routes/login.js';
import notfound from './src/routes/notfound.js';
import renderHeader from './src/components/header.js';

// ✅ Minta izin notifikasi (Push Notification)
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('✅ Izin notifikasi diberikan');
      } else {
        console.warn('❌ Izin notifikasi ditolak');
      }
    });
  }
}

// ✅ Rute-rute aplikasi SPA
const routes = {
  '/': home,
  '/tambah': tambah,
  '/tentang': tentang,
  '/login': login,
};

// ✅ Router
function router() {
  const app = document.getElementById('app');
  const hash = decodeURIComponent(window.location.hash.slice(1).toLowerCase()) || '/';
  const page = routes[hash] || notfound;
  const isSensitivePage = hash === '/tambah';

  const renderPage = () => {
    app.innerHTML = '';
    page(app);
    renderHeader(); // perbarui header setelah render halaman
  };

  if (!document.startViewTransition || isSensitivePage) {
    renderPage();
  } else {
    const transition = document.startViewTransition(renderPage);
    transition.ready.then(() => console.log('🎬 Transisi siap dimulai'));
    transition.finished.then(() => console.log('✅ Transisi selesai'));
  }
}

// ✅ Inisialisasi saat halaman dimuat
window.addEventListener('load', () => {
  requestNotificationPermission();

  if (!navigator.onLine) {
    console.warn('📴 Aplikasi sedang offline, data mungkin terbatas.');
  }

  router();
});

// ✅ Dengarkan perubahan URL hash
window.addEventListener('hashchange', router);
