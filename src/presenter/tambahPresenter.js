import tambahView from '../view/tambahView.js';
import { postStory } from '../api/storyApi.js';

export default function tambahPresenter(container) {
  tambahView(container, async (data, errorEl) => {
    const { description, photo, lat, lon } = data;

    if (!description || !photo || !lat || !lon) {
      errorEl.textContent = 'Semua data wajib diisi';
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    formData.append('lat', lat);
    formData.append('lon', lon);

    try {
      await postStory(formData);
      window.location.hash = '/';
    } catch (err) {
      errorEl.textContent = 'Gagal mengirim cerita. Coba lagi.';
      console.error(err);
    }
  });
}
