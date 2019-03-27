var cacheName = 'nightshade-app-cache'

self.addEventListener('install', function (event) {
  console.log('sw installed')
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        'index.css',
        'index.html',
        'index.bundle.js',
        'images/',
        'manifest.json',
        'worker.bundle.js'
      ]);
    })
  )
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (name) {
      return Promise.all(
        cacheNames.filter(function (name) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
          return (name != cacheName)
        }).map(function (name) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
