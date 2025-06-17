export default function loginPresenter(container) {
  container.innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" required />
      
      <button type="submit">Login</button>
      <p id="error" style="color: red;"></p>
    </form>
  `;

  const form = container.querySelector('#login-form');
  const errorEl = container.querySelector('#error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch('https://story-api.dicoding.dev/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login gagal');
      }

      localStorage.setItem('token', result.loginResult.token);
      alert('Login berhasil!');
      window.location.hash = '/';
    } catch (err) {
      errorEl.textContent = err.message;
    }
  });
}
