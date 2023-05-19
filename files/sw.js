/* self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('crack')
        .then(cache => cache.addAll([
          '/files/aak.gif',
          '/files/const.js',
          '/files/style.css',
          '/files/tv-static.gif',
          '/files/sw.js',
          '/index.html',
          '/'
        ]))
    );
  }); */
  
const staticCacheName = 'crack';
const appShellFiles = [
    '/files/aak.gif',
    '/files/const.js',
    '/files/style.css',
    '/files/tv-static.gif',
    '/files/sw.js',
    '/index.html',
    '/manifest.json',
    '/'
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
      .catch(() => caches.match('/offline.html')) // Serve custom offline page
  );
});
