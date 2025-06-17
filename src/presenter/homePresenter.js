import homeView from '../view/homeView.js';
import { getStories } from '../api/storyApi.js';
import renderMap from '../components/map.js';
import { getAllStories, saveStory } from '../db/db.js'; 

export default async function homePresenter(container) {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.hash = '#/login';
    return;
  }

  // Render view HTML terlebih dahulu
  container.innerHTML = homeView();

  try {
    const stories = await getStories();

    // ✅ Simpan semua ke IndexedDB
    stories.forEach(story => saveStory(story));

    // Tunggu elemen #list-cerita dan #map muncul di DOM
    await waitForElement('#list-cerita');
    await waitForElement('#map');

    // Render peta dan daftar cerita
    renderMap(stories);
    renderStoryList(stories);
  } catch (err) {
    console.error('Gagal ambil dari API:', err);
    container.innerHTML += `<p style="color:red;">Gagal memuat dari API. Menampilkan cerita offline...</p>`;

    try {
      const offlineStories = await getAllStories();

      await waitForElement('#list-cerita');
      await waitForElement('#map');

      if (offlineStories.length > 0) {
        renderMap(offlineStories);
        renderStoryList(offlineStories);
      } else {
        document.getElementById('list-cerita').innerHTML = '<p>Tidak ada cerita offline.</p>';
      }
    } catch (dbError) {
      container.innerHTML += `<p style="color:red;">Gagal memuat data dari IndexedDB juga.</p>`;
      console.error('IndexedDB error:', dbError);
    }
  }
}

// Fungsi bantu: tunggu elemen tersedia di DOM
function waitForElement(selector) {
  return new Promise((resolve) => {
    const check = () => {
      const el = document.querySelector(selector);
      if (el) resolve(el);
      else requestAnimationFrame(check);
    };
    check();
  });
}

// Render daftar cerita
function renderStoryList(stories) {
  const list = document.getElementById('list-cerita');
  list.innerHTML = '';

  stories.forEach(story => {
    const item = document.createElement('div');
    item.setAttribute('tabindex', '0');
    item.classList.add('story');

    const tanggal = story.createdAt
      ? new Date(story.createdAt).toLocaleDateString('id-ID', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        })
      : 'Tanggal tidak tersedia';

    item.innerHTML = `
      <p><strong>Nama:</strong> ${story.name}</p>
      <p><strong>Tanggal:</strong> ${tanggal}</p>
      <p><strong>Deskripsi:</strong> ${story.description || 'Tidak ada deskripsi'}</p>
      <img src="${story.photoUrl}" alt="Foto cerita dari ${story.name}" width="100" style="border-radius: 5px;" />
      <hr/>
    `;

    list.appendChild(item);
  });
}
