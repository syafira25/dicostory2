const BASE_URL = 'https://story-api.dicoding.dev/v1';

export async function getStories() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result.listStory;
}

// ✅ Perbaikan di sini
export async function postStory(formData) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // ❗ Jangan set Content-Type agar browser otomatis atur boundary
    },
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}
