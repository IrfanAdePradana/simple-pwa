(function() {
  'use strict';

  var filesToCache = [
    '/',
    '/index.html',
    '/scss/',
    '/gulpfile.js',
    '/1.png',
    '/vendor/bootstrap/css/',
    '/vendor/bootstrap/js/',
    '/img/logoutama.png',
    '/img/profile.png',
    '/img/portfolio',
  ];

  var staticCacheName = 'foodpedia';

  self.addEventListener('install', function(event) {
    console.log('Menginstall service worker dan cache assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    console.log('Fetch untuk: ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Ditemukan: ', event.request.url, ' in cache');
          return response;
        }
        
        console.log('Permintaan untuk: ', event.request.url);
        return fetch(event.request).then(function(response) {
          if (response.status === 404) {
            return console.log('terjadi kesalahan');
          }
          
          return caches.open(staticCacheName).then(function(cache) {
            if (event.request.url.indexOf(cache) < 0) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          });
        });
      }).catch(function(error) {
        console.log('Terjadi kesalahan, ', error);
      })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('Mengaktifkan pekerja-web...');

    var cacheWhitelist = [staticCacheName];
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

})();
