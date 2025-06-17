export default function loginView(container, onLogin) {
  container.innerHTML = `
    <h2>Login</h2>
    <form id="login-form" aria-label="Form Login">
      <label for="email">Email</label><br/>
      <input type="email" id="email" required /><br/><br/>
      
      <label for="password">Password</label><br/>
      <input type="password" id="password" required /><br/><br/>

      <button type="submit">Login</button>
      <p id="error" style="color: red;"></p>
    </form>
    <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
  `;

  const form = container.querySelector('#login-form');
  const errorEl = container.querySelector('#error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    onLogin(email, password, errorEl);
  });
}
