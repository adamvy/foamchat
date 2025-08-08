self.addEventListener('install', event => {
  console.log('SW installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('SW activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  var data = event.data.json();
  var options = {
    body: data.body,
    data: {
      url: data.url
    }
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  const url = event.notification.data?.url || '/';
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {
      // Check if there's a window with the same URL.
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        // Use endsWith to ignore query params and fragments for a more robust match
        if ( client.url.endsWith(url) && 'focus' in client ) {
          return client.focus();
        }
      }
      // If no window was found, open a new one.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
