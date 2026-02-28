// sw.js — Firebase + Vanilla JS CYM Tracker

const CACHE_NAME = 'cym-tracker-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.js',         // main JS
  './db-firebase.js',  // Firestore helper
  './style.css'        // optional, kung may CSS
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate Service Worker and remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

// Fetch event: cache first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests like API calls to Trickle DB or others unless they are explicitly cached assets
  if (!event.request.url.startsWith(self.location.origin) && !ASSETS_TO_CACHE.includes(event.request.url)) {
      return;
  }

  // Network First for HTML pages to ensure fresh content
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Stale-While-Revalidate for other resources
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
            // Check if valid response before caching
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                 cache.put(event.request, networkResponse.clone());
            }
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});
