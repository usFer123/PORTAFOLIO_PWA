const CACHE_NAME = "FP_cache_PWA_MFRP_v1"; // Versión agregada para controlar actualizaciones

const urlsToCache = [
    './',
    './assets/img/c.png',
    './assets/img/Captura de pantalla 2024-12-07 152923.png',
    './assets/img/Captura de pantalla 2024-12-07 153448.png',
    './assets/img/Captura de pantalla 2024-12-07 160832.png',
    './assets/img/fondo.png',
    './assets/img/foto.png',
    './assets/img/java.png',
    './assets/img/logo.png',
    './assets/img/node.png',
    './assets/img/python.png',
    './assets/img/react.png',
    './assets/img/react2.png',
    './assets/img/TASKEASE.png',
    './index.html',
    './js/script.js',
    './css/styles.css',
    './manifest.json'

];

// Evento de instalación - caché de archivos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting()); // Invocar correctamente el método
        })
    );
});


// Evento de activación - limpieza de caché antiguo
self.addEventListener('activate', e => {
    const listaBlancaCache = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(nombresCache => {
            return Promise.all(
                nombresCache.map(nombresCache => {
                    if (listaBlancaCache.indexOf(nombresCache) === -1) {
                        return caches.delete(nombresCache);
                    }
                })
            );
        })
        // Activar el nuevo caché
        .then(() => self.clients.claim())
    );
});

// Evento de obtención de archivos - responder desde la caché o buscar en la red
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                return res; // Responder desde la caché si existe
            }
            return fetch(e.request); // Buscar en la red si no está en caché
        })
    );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(function(error) {
            console.log('Error al registrar el Service Worker:', error);
        });
}
