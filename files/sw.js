const staticCacheName = 'crack';
const appShellFiles = [
    '/venkant/files/aak.gif',
    '/venkant/files/const.js',
    '/venkant/files/style.css',
    '/venkant/files/tv-static.gif',
    '/venkant/files/sw.js',
    '/venkant/index.html',
    '/venkant/manifest.json',
    '/venkant/offline.html',
    '/venkant/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => cache.addAll(appShellFiles))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/venkant/offline.html')) // Serve custom offline page
  );
});
