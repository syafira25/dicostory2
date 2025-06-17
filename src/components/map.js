import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
window.L = L;

export default function renderMap(stories) {
  const map = L.map('map').setView([-2, 117], 5); // Tengah Indonesia

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  stories.forEach((story) => {
    if (story.lat && story.lon) {
      L.marker([story.lat, story.lon])
        .addTo(map)
        .bindPopup(`<strong>${story.name}</strong><br>${story.description}`);
    }
  });
}
