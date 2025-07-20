const CACHE_NAME = 'sgx-analyzer-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for stock data
self.addEventListener('sync', event => {
  if (event.tag === 'stock-sync') {
    event.waitUntil(syncStockData());
  }
});

function syncStockData() {
  // Sync stock data when back online
  return new Promise((resolve) => {
    console.log('Syncing stock data...');
    // In a real app, this would sync with actual stock API
    resolve();
  });
}

// Push notifications for stock alerts
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Stock price alert triggered!',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'view-stocks',
        title: 'View Stocks',
        icon: 'icon-192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('SGX Stock Alert', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view-stocks') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle message from main thread for stock data updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'STOCK_UPDATE') {
    // Handle stock data updates
    console.log('Received stock update:', event.data.payload);
  }
});
