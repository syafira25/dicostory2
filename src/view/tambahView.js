import '../components/map.js';

export default function tambahView(container, onSubmit) {
  container.innerHTML = `
    <h2>Tambah Cerita</h2>
    <form aria-label="Form tambah cerita">
      <label for="desc">Deskripsi:</label>
      <textarea id="desc" required></textarea>

      <label for="photo">Ambil Foto:</label>
      <video id="camera" autoplay playsinline></video>
      <canvas id="canvas" style="display:none;"></canvas>
      <button type="button" id="capture">Ambil Gambar</button>
      <img id="preview" alt="Hasil Foto" style="display:none; max-width: 100%; margin-top: 1rem;" />

      <label for="lat">Latitude:</label>
      <input type="number" id="lat" step="any" required readonly />

      <label for="lon">Longitude:</label>
      <input type="number" id="lon" step="any" required readonly />

      <div id="map" style="height: 200px; margin-bottom: 1rem;"></div>

      <button type="submit">Kirim</button>
      <p id="error" style="color:red;" role="alert"></p>
    </form>
  `;

  const desc = container.querySelector('#desc');
  const camera = container.querySelector('#camera');
  const canvas = container.querySelector('#canvas');
  const captureBtn = container.querySelector('#capture');
  const preview = container.querySelector('#preview');
  const lat = container.querySelector('#lat');
  const lon = container.querySelector('#lon');
  const form = container.querySelector('form');
  const errorEl = container.querySelector('#error');

  // Kamera
  let stream;
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((mediaStream) => {
      stream = mediaStream;
      camera.srcObject = stream;
    })
    .catch((err) => {
      console.error('Kamera error:', err);
      errorEl.textContent = 'Kamera tidak dapat diakses. Izinkan akses kamera.';
    });

  let photoBlob = null;

  captureBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;
    context.drawImage(camera, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      photoBlob = blob;
      const imgURL = URL.createObjectURL(blob);
      preview.src = imgURL;
      preview.style.display = 'block';
    }, 'image/jpeg');
  });

  // Map
  const map = L.map('map').setView([-6.2, 106.8], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  let marker;
  map.on('click', function (e) {
    const { lat: clickedLat, lng: clickedLng } = e.latlng;
    lat.value = clickedLat.toFixed(6);
    lon.value = clickedLng.toFixed(6);

    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(e.latlng).addTo(map);
    }
  });

  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      errorEl.textContent = 'Anda belum login.';
      return;
    }

    if (!photoBlob) {
      errorEl.textContent = 'Silakan ambil foto terlebih dahulu.';
      return;
    }

    const formData = new FormData();
    formData.append('description', desc.value);
    formData.append('photo', photoBlob);
    formData.append('lat', lat.value);
    formData.append('lon', lon.value);

    try {
      const response = await fetch('https://story-api.dicoding.dev/v1/stories', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);
      alert('Cerita berhasil ditambahkan!');
      window.location.hash = '/';
    } catch (err) {
      errorEl.textContent = `Gagal mengirim cerita: ${err.message}`;
    }
  });
}
