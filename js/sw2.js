(function() {
    'use strict';
  
    var filesToCache = [
      '.',
      'style/main.css',
      'index.html',
        'js/main.js',
        'js/idb.js',
      'images/jacket.png',
      'images/sweater.png',
        'images/hoodie.png'
    ];
  
    var staticCacheName = 'pages-shirt-v2';
  
    self.addEventListener('install', function(event) {
      console.log('install service worker and cache static assets');
      event.waitUntil(
        caches.open(staticCacheName)
        .then(function(cache) {
          return cache.addAll(filesToCache);
        })
      );
    });
  
    self.addEventListener('activate', function(event) {
      console.log('Activating service worker');
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
    
    self.addEventListener('fetch', function(event) {
      console.log('Fetch event for ', event.request.url);
      event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response) {
            console.log('Found ', event.request.url, ' in cache');
            return response;
          }
        }).catch(function(error) {
          console.log('Error, ', error);
        })
      );
    });
  
  });
  