// auth.js
export function saveAuth({ token, user }) {
  localStorage.setItem('sebo_token', token);
  localStorage.setItem('sebo_user', JSON.stringify(user));
}

export function currentUser() {
  return JSON.parse(localStorage.getItem('sebo_user') || 'null');
}

export function logout() {
  localStorage.removeItem('sebo_token');
  localStorage.removeItem('sebo_user');
}

