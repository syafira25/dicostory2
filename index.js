import homeRoute from './routes/home.js';
import loginRoute from './routes/login.js';
import registerRoute from './routes/register.js';
import tambahRoute from './routes/tambah.js';
import tentangRoute from './routes/tentang.js';

function renderRoute(route, container) {
  switch (route) {
    case '/':
    case '/home':
      homeRoute(container);
      break;
    case '/login':
      loginRoute(container);
      break;
    case '/register':
      registerRoute(container);
      break;
    case '/tambah':
      tambahRoute(container);
      break;
    case '/tentang':
      tentangRoute(container);
      break;
    default:
      container.innerHTML = '<h2>Halaman tidak ditemukan</h2>';
  }

  updateNavState();
}

function getRouteFromHash() {
  return window.location.hash.slice(1) || '/';
}

function updateNavState() {
  const token = localStorage.getItem('token');
  const loginLink = document.getElementById('login-link');
  const logoutLink = document.getElementById('logout-link');
  const tambahLink = document.getElementById('tambah-link');

  if (token) {
    if (loginLink) loginLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'inline-block';
    if (tambahLink) tambahLink.style.display = 'inline-block';
  } else {
    if (loginLink) loginLink.style.display = 'inline-block';
    if (logoutLink) logoutLink.style.display = 'none';
    if (tambahLink) tambahLink.style.display = 'none';
  }
}

function setupNavigation() {
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert('Berhasil logout!');
      window.location.hash = '/login';
    });
  }
}

// INIT
window.addEventListener('hashchange', () => {
  const route = getRouteFromHash();
  const container = document.getElementById('app');
  renderRoute(route, container);
});

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  const route = getRouteFromHash();
  renderRoute(route, container);
  setupNavigation();
});
