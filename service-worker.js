const CACHE_NAME = "text-to-veseme-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/manifest.json",
    "/images/icon-192.png", // Replace with your actual image paths
    "/images/icon-512.png"  // Replace with your actual image paths
];

// Install the service worker and cache the app shell
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch resources from the cache or the network
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached resource or fetch from network if not cached
                return response || fetch(event.request);
            })
            .catch(error => {
                console.error("Error during fetch:", error);
                throw error; // Prevent unhandled promise rejection
            })
    );
});

// Activate the service worker and remove old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
