const CACHE_NAME = 'v1_cache_portfolio';
const OFFLINE_PAGE = '/index.html';

// Asegúrate que las rutas coincidan con tu estructura de archivos
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/manifest.json',
  '/assets/img/portfolio/1.png',
  '/assets/img/portfolio/2.png',
  '/assets/img/portfolio/3.png',
  '/assets/img/portfolio/c.png',
  '/assets/img/portfolio/fondo.png',
  '/assets/img/portfolio/foto.jpeg',
  '/assets/img/portfolio/java.png',
  '/assets/img/portfolio/logo.png',
  '/assets/img/portfolio/node.png',
  '/assets/img/portfolio/python.png',
  '/assets/img/portfolio/react.png',
  '/assets/img/portfolio/react2.png',
  '/assets/img/portfolio/TASKEASE.jpg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Limpia caches antiguas
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Toma control de clientes inmediatamente
      self.clients.claim()
    ])
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna el recurso cacheado si existe
        if (response) {
          return response;
        }

        // Si no está en cache, intenta fetchearlo
        return fetch(event.request)
          .then(response => {
            // Verifica que sea una respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la respuesta para guardarla en cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Si falla el fetch y es una navegación, muestra la página offline
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_PAGE);
            }
            // Para otros recursos, puedes retornar una imagen/recurso por defecto
            return new Response('Sin conexión');
          });
      })
  );
});

