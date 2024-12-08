const CACHE_NAME = "V1_cache_FER";

const urlsToCache = [
    './',
    './assets/favicon.ico',
    './assets/img/portfolio/1.png',
    './assets/img/portfolio/2.png',
    './assets/img/portfolio/3.png',
    './assets/img/portfolio/c.png',
    './assets/img/portfolio/fondo.png',
    './assets/img/portfolio/foto.png',
    './assets/img/portfolio/java.png',
    './assets/img/portfolio/logo.png',
    './assets/img/portfolio/node.png',
    './assets/img/portfolio/python.png',
    './assets/img/portfolio/react.png',
    './assets/img/portfolio/react2.png',
    './assets/img/portfolio/TASKEASE.jpg',
    './css/style.css',
    './js/script.js', // Asegúrate de agregar los archivos JS si los usas
    './index.html', // Incluye el index.html si es necesario
    './manifest.json', // Si tienes un manifest, agréguelo también
];

// Evento de instalación
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        console.log('Archivos cacheados');
                        self.skipWaiting(); // Corregido para ser llamado como función
                    });
            })
    );
});

// Evento de activación
self.addEventListener('activate', e => {
    const listaBlancaCache = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(nombresCache => {
                return Promise.all(
                    nombresCache.map(nombresCache => {
                        if (listaBlancaCache.indexOf(nombresCache) === -1) {
                            return caches.delete(nombresCache); // Elimina las caches antiguas
                        }
                    })
                );
            })
            .then(() => self.clients.claim()) // Asegura que el nuevo SW controle los clientes
    );
});

// Evento de Fetch (captura las solicitudes de los recursos)
sself.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(e.request).catch(() => {
                    // Manejo de fallback para cuando no hay conexión
                    if (e.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});
