const CACHE_NAME = "de-remise-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/tabs.js",
  "/js/icons.js",
  "/js/firebase-config.js",
  "/js/shopping.js",
  "/js/todo.js",
  "/js/cleaning.js",
  "/js/calendar.js",
  "/js/weather.js",
  "/js/info.js",
  "/manifest.json",
  "/icons/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  // Network-first for Firebase/Open-Meteo calls so data stays live; cache-first for app shell.
  if (event.request.url.includes("firestore") || event.request.url.includes("open-meteo")) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
