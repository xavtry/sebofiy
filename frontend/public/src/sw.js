// sw.js (install in production build)
const CACHE = 'sebofiy-static-v1';
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // only cache GET requests to API and static assets
  if (e.request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) {
    // network-first for API
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  } else {
    // static cache
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});

