// /* 监听安装事件，install 事件一般是被用来设置你的浏览器的离线缓存逻辑 */
// this.addEventListener('install', function (event) {
 	
//   /* 通过这个方法可以防止缓存未完成，就关闭serviceWorker */
//   event.waitUntil(
//     /* 创建一个名叫V1的缓存版本 */
//     caches.open('v1').then(function (cache) {
//       /* 指定要缓存的内容，地址为相对于跟域名的访问路径 */
//       return cache.addAll([
//         './index.html'
//       ]);
//     })
//   );
// });

// /* 注册fetch事件，拦截全站的请求 */
// this.addEventListener('fetch', function(event) {
//   event.respondWith(
//     // magic goes here
      
//     /* 在缓存中匹配对应请求资源直接返回 */
//     caches.match(event.request)
//   );
// });

// workbox.routing.registerRoute(
//   /(.js|.css)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     plugins: [
//       // explicitly allow to cache `401` …
//       new workbox.cacheableResponse.Plugin({ statuses: [0, 200, 401] }),
//       // … but do not return a cached result
//       // in this case (!cachedResponse.ok)
//       {
//         cachedResponseWillBeUsed: ({ cachedResponse }) => {
//           return (cachedResponse && cachedResponse.ok) ? cachedResponse : null;
//         }
//       }
//     ]
//   })
// );

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    reg.onupdatefound = function() {
      var installingWorker = reg.installing;
      installingWorker.onstatechange = function() {
        switch (installingWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              var event = document.createEvent('Event');
              event.initEvent('sw.update', true, true);
              window.dispatchEvent(event);
            }
            break;
        }
      };
    };
  }).catch(function(e) {
    console.error('Error during service worker registration:', e);
  });
}