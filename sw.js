// Incrementa questo numero OGNI VOLTA che carichi una nuova versione di index.html.
// Basta cambiare v1 -> v2 -> v3 ... e il vecchio cache viene buttato via automaticamente.
const CACHE_VERSION = 'v1';
const CACHE_NAME = 'palestra-cache-' + CACHE_VERSION;

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // il nuovo service worker prende il controllo subito, senza aspettare
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim()) // prende subito il controllo delle pagine aperte
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Per la pagina HTML: prova sempre la rete per prima (versione più recente),
  // usa la cache solo se sei offline.
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Per il resto (font, icone...): cache-first, va bene che sia più "statico"
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
