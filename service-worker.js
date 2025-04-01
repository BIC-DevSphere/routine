const CACHE_NAME = "routine-cache-v13"; // Increment the version number for new deployments
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "src/assets/icons/icons-76.png",
  "src/assets/icons/icons-96.png",
  "src/assets/problem-solving.svg",
  "src/assets/database.svg",
  "src/assets/programming.svg",
  "/src/css/output.css",
  "/src/js/script.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Failed to cache:", error);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback to cache if network request fails
        return caches.match(event.request);
      });
    })
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
        })
      );
    })
  );
  // Claim clients to ensure the new service worker takes control immediately
  return self.clients.claim();
});
