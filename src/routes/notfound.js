export default function notfound(container) {
  container.innerHTML = `
    <section class="notfound">
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Ups! Halaman yang kamu tuju tidak tersedia.</p>
      <a href="#/">Kembali ke Beranda</a>
    </section>
  `;
}
