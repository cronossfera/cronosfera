// sw.js
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/logo.png',
        badge: '/favicon.png',
        data: { url: data.url || '/' }
    };
    event.waitUntil(
        self.registration.showNotification(data.title || 'Cronosfera', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data.url || '/';
    event.waitUntil(
        clients.openWindow(url)
    );
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('cronosfera-v1').then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                'styles.css',
                'script.js',
                'capsulas.js',
                'sw.js',
                'manifest.json',
                '/logo.png',
                'favicon.ico',
                '/sci-fi-bg.jpg',
                '/frutiger-metro-bg.jpg',
                '/pastel-frutiger-metro-bg.jpg',
                '/vaporwave-bg.jpg',
                '/dark-academia-frutiger-metro-bg.jpg',
                '/frutiger-aero-bg.jpg',
                '/galaxia-bg.jpg',
                '/custom-bg.jpg'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'logo.png',
            data: { url: data.url || '/' }
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
