var cacheName = "nightshade-app-cache-" + Date.now();

self.addEventListener("install", function(event) {
  console.log("sw installed");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        "/",
        "index.css",
        "index.html",
        "index.bundle.js",
        "images/",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return (
          response ||
          fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      });
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window"
      })
      .then(function(clientList) {
        console.log(clientList);
        clientList[0].focus();
      })
  );
});

self.addEventListener("activate", function(event) {
  console.log("sw is actived");
  caches.keys().then(function(keys) {
    keys.forEach(function(key) {
      console.log(key);
      if (!key.includes(cacheName)) {
        caches.delete(key).then(function(result) {
          if (result) console.log("deleted " + key);
        });
      }
    });
  });
});
