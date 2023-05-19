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
    '/venkant/files/aak.gif',
    '/venkant/files/const.js',
    '/venkant/files/style.css',
    '/venkant/files/tv-static.gif',
    '/venkant/files/sw.js',
    '/venkant/index.html',
    '/venkant/manifest.json',
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
      .catch(() => caches.match('/offline.html')) // Serve custom offline page
  );
});
