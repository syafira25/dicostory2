export default function registerView(container, onRegister) {
  container.innerHTML = `
    <h2>Registrasi</h2>
    <form>
      <label>Nama: <input id="name" required /></label><br>
      <label>Email: <input type="email" id="email" required /></label><br>
      <label>Password: <input type="password" id="password" required /></label><br>
      <button type="submit">Daftar</button>
      <p id="error" style="color:red;"></p>
    </form>
  `;

  const form = container.querySelector('form');
  const name = container.querySelector('#name');
  const email = container.querySelector('#email');
  const password = container.querySelector('#password');
  const errorEl = container.querySelector('#error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onRegister(name.value, email.value, password.value, errorEl);
  });
}
