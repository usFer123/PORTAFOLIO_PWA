const CAHE_NAME = "FP_cache_PWA_MFRP";

urlsToCache = [
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
    './assets/img/TASKEASE.png'
];

//Funcion de instalacion
//almacena el nombre y los archivos que van a ir guardados en cache

self.addEventListener('install', e =>{
    e.waitUntil( //le decimos que detenga el evento hasta que se ejecute lo siguiente
        caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting)
        })

    )
})

self.addEventListener('activate', e =>{
    const listaBlancaCache = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(nombresCache => {
            return Promise.all(
                nombresCache.map(nombresCache =>{
                    if(listaBlancaCache.indexOf(nombresCache) === -1){
                        return caches.delete(nombresCache)
                    }
                })
            )
        })
        //activamos la cache actualizada
        .then(()=> self.clients.claim())
    )

})

self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res)
            {
                return res
            }
            return fetch(e.request)
        })
    )
})