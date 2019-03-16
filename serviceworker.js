const cacheName = "v1";

// call install event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");
});

// call activate event
self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service worker: Clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// call fetch event *note: if page isn't visited it's not cached
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // make clone of response
        const resClone = res.clone();
        // open cache
        caches.open(cacheName).then(cache => {
          // add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
