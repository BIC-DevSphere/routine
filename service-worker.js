const CACHE_NAME = "routine-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "src/assets/icons/icons-76.png",
  "src/assets/icons/icons-96.png",
  "/src/css/output.css",
  "/src/js/script.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return Promise.all(
        urlsToCache.map((url) => {
          return cache.add(url).catch((error) => {
            console.error("Failed to cache:", url, error);
          });
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
