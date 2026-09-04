/*
  Service worker della Scheda Palestra.
  Cache "app shell": una volta aperta almeno una volta con connessione,
  l'app continua a funzionare anche offline (i dati restano comunque
  salvati solo nel browser del telefono, vedi avviso nell'app).

  IMPORTANTE: quando pubblichi un aggiornamento del file index.html,
  cambia la stringa CACHE_VERSION qui sotto (es. 'v2', 'v3', ...):
  è così che il telefono capisce che deve scaricare la nuova versione
  invece di continuare a mostrare quella salvata in cache.
*/
const CACHE_VERSION = 'v6';
const CACHE_NAME = `scheda-palestra-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './favicon-32.png',
  './favicon-16.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key.startsWith('scheda-palestra-') && key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Cache-first per i file dell'app, rete con fallback alla cache per il resto
// (es. i font di Google, che restano disponibili se già scaricati una volta).
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          if (response && response.ok && event.request.url.startsWith(self.location.origin)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') return caches.match('./index.html');
        });
    })
  );
});
