// JVA Music — service worker
//
// Caches same-origin GET responses on first fetch so the metronome (and
// the rest of the site) keeps working offline after the user has visited
// once. Strategy: cache-first, fall back to network, fall back to cached
// HTML if everything fails (so an offline launch still shows the page).
//
// Bump CACHE_NAME to invalidate all caches on the next visit — useful
// when shipping a hard-incompatible change.

const CACHE_NAME = 'jva-music-v1';
const OFFLINE_FALLBACK = '/metronome/';

// Files we want to be definitely cached even before the user navigates
// to them. Astro emits content-hashed assets we can't list here (they
// change every build), so those are picked up by the runtime cache.
const CORE_ASSETS = [
  '/',
  '/metronome/',
  '/metronome.css',
  '/favicon.webp',
  '/site.webmanifest',
  '/icons/icon-180.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Use addAll with individual catches so one missing asset doesn't
      // abort install — in dev the manifest paths can drift slightly.
      Promise.all(CORE_ASSETS.map((u) => cache.add(u).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Don't intercept analytics or admin tools.
  if (url.pathname.startsWith('/admin') || url.pathname.includes('gtag')) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      // Serve from cache if present; revalidate in the background.
      const fetched = fetch(req).then((resp) => {
        if (resp.ok && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone));
        }
        return resp;
      }).catch(() => null);

      if (cached) {
        // Don't await `fetched` — return cache immediately, refresh next time.
        fetched;
        return cached;
      }
      return fetched.then((resp) => {
        if (resp) return resp;
        // Offline + nothing cached for this URL: fall back to the
        // cached metronome page if the request was a navigation.
        if (req.mode === 'navigate') return caches.match(OFFLINE_FALLBACK);
        return Response.error();
      });
    })
  );
});
