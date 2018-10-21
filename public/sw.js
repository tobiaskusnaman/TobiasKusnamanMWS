const CACHE_NAME = 'my-site-cache-v2'
const filesToCache = [
  './images/icon.png',
  './images/menu.svg',
  './project1/index.html',
  './project1/add2numbers.js',
  './project2/index.html',
  './project2/main.css',
  './project2/main.js',
  './index.html',
  './main.css',
  './main.js',
  './manifest.json',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(filesToCache);
      })
  );
})

self.addEventListener('activate', function(event) {
  // Lakukan aktifasi
  });

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if(response) {
          return response;
        }
        return fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(error => {
        console.log(error)
      })
  )
})

// self.addEventListener('fetch', (event) => {
//   console.log('Fetching:', event.request.url)
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         console.log('isi response ==========', response)
//         if(response) {
//           // console.log(`Found ${event.request.url} in cache`)
//           return response;
//         }
//         // console.log(`Network request for ${event.request.url}`)

//         var fetchRequest = event.request.clone();
//         console.log('fetchrequest', fetchRequest)
//         return fetch(fetchRequest).then(
//           function(response) {
//             console.log('response', response)
//             if(!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }
//             var responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then(function(cache) {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           }
//         );
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   )
// })