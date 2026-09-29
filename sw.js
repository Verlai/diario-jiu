// Ao editar os arquivos, altere VERSION para renovar o cache.
const VERSION = '6c48f5710a77';
const PREFIX = 'bjj-pwa-' + encodeURIComponent(self.registration.scope) + '-';
const CACHE = PREFIX + VERSION;
const FILES = ['./', './index.html', './pwa.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];
const URLS = FILES.map(p => new URL(p, self.registration.scope).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(URLS)));
  // Sem skipWaiting: não substitui o app enquanto houver abas abertas.
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  // Nunca interceptar POSTs, webhook ou outras origens; cache somente da interface.
  if(request.method !== 'GET' || !URLS.includes(request.url)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request.url);
    if(cached) return cached;
    return fetch(request);
  })());
});
