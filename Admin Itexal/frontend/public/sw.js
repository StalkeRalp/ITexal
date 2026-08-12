// Service Worker Cosmetic Admin — Stratégie de Cache Sécurisée
const CACHE_NAME = "cosmetic-admin-v1";
const STATIC_ASSETS = [
  "/icon.svg",
  "/manifest.json",
  "/manifest.webmanifest"
];

// Installation du Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Stratégie Fetch : Sécurité Maximale
// Ne JAMAIS mettre en cache les API, jetons d'authentification ou données sensibles
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Exclure les données dynamiques, les appels API, l'authentification et l'admin
  if (
    event.request.method !== "GET" ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes("/auth") ||
    url.pathname.includes("/admin")
  ) {
    return; // Laisser passer directement au réseau
  }

  // Network First pour le reste des ressources statiques
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200 && response.type === "basic") {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
