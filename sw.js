

const cacheName = 'v6';

const cacheFiles = [
  '/',
  '/index.html',
  '/template.html',
  '/js/app.js',
  '/css/reset.css',
  '/css/style.css',
  '/favicon.ico'
];


self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(cacheName).then(function (cache){
       return cache.addAll(cacheFiles)
    })
  )
})


self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if (response) return response
      return fetch(event.request)
    }).catch(function (err) {
      return caches.match('/template.html')
    })
  )
})



self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (thisCacheName) {
              if (thisCacheName !== cacheName) {
                console.log(`deleting ${thisCacheName}`);
                return caches.delete(thisCacheName);
              }
            }
          )
        )
      }
    )
  );
});
