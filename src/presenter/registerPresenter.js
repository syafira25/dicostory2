import registerView from '../../view/registerView.js';

export default function registerPresenter(container) {
  async function register(name, email, password, errorElement) {
    try {
      const response = await fetch('https://story-api.dicoding.dev/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.hash = '#/login';
      } else {
        errorElement.textContent = result.message || 'Registrasi gagal.';
      }
    } catch (err) {
      errorElement.textContent = 'Gagal registrasi.';
      console.error(err);
    }
  }

  registerView(container, register);
}
