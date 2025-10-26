
// api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

async function request(path, opts = {}) {
  const url = API_BASE + path;
  const headers = opts.headers || {};
  if (localStorage.getItem('sebo_token')) headers['Authorization'] = 'Bearer ' + localStorage.getItem('sebo_token');
  const res = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...headers } });
  const data = await res.json().catch(()=>null);
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export async function register(email, password, displayName) {
  return await request('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password, displayName }) });
}

export async function login(email, password) {
  return await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function listTracks() {
  return await request('/api/tracks');
}

export async function getTrack(id) {
  return await request(`/api/tracks/${id}`);
}

export async function search(q) {
  return await request(`/api/search?q=${encodeURIComponent(q)}`);
}
