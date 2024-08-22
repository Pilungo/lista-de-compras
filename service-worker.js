self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('app-cache').then(cache => {
            return cache.addAll([
                '/lista-de-compras/',
                '/lista-de-compras/index.html',
                '/lista-de-compras/manifest.json',
                '/lista-de-compras/icon-192.png',
                '/lista-de-compras/icon-512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
