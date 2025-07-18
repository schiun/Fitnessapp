(cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF'
diff --git a/FitDaily-Complete-Package/sw.js b/FitDaily-Complete-Package/sw.js
--- a/FitDaily-Complete-Package/sw.js
+++ b/FitDaily-Complete-Package/sw.js
@@ -0,0 +1,105 @@
+const CACHE_NAME = 'fitdaily-v1';
+const urlsToCache = [
+  '/',
+  '/index.html',
+  '/styles.css',
+  '/script.js',
+  '/manifest.json',
+  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
+  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
+];
+
+// Install event - cache resources
+self.addEventListener('install', event => {
+  event.waitUntil(
+    caches.open(CACHE_NAME)
+      .then(cache => {
+        console.log('Opened cache');
+        return cache.addAll(urlsToCache);
+      })
+  );
+});
+
+// Fetch event - serve from cache when offline
+self.addEventListener('fetch', event => {
+  event.respondWith(
+    caches.match(event.request)
+      .then(response => {
+        // Return cached version or fetch from network
+        return response || fetch(event.request);
+      }
+    )
+  );
+});
+
+// Activate event - clean up old caches
+self.addEventListener('activate', event => {
+  event.waitUntil(
+    caches.keys().then(cacheNames => {
+      return Promise.all(
+        cacheNames.map(cacheName => {
+          if (cacheName !== CACHE_NAME) {
+            console.log('Deleting old cache:', cacheName);
+            return caches.delete(cacheName);
+          }
+        })
+      );
+    })
+  );
+});
+
+// Background sync for workout data
+self.addEventListener('sync', event => {
+  if (event.tag === 'workout-sync') {
+    event.waitUntil(syncWorkoutData());
+  }
+});
+
+function syncWorkoutData() {
+  // Sync workout statistics when back online
+  return new Promise((resolve) => {
+    console.log('Syncing workout data...');
+    resolve();
+  });
+}
+
+// Push notifications
+self.addEventListener('push', event => {
+  const options = {
+    body: event.data ? event.data.text() : 'Time for your daily workout!',
+    icon: 'icon-192.png',
+    badge: 'icon-192.png',
+    vibrate: [100, 50, 100],
+    data: {
+      dateOfArrival: Date.now(),
+      primaryKey: 1
+    },
+    actions: [
+      {
+        action: 'start-workout',
+        title: 'Start Workout',
+        icon: 'icon-192.png'
+      },
+      {
+        action: 'close',
+        title: 'Close',
+        icon: 'icon-192.png'
+      }
+    ]
+  };
+
+  event.waitUntil(
+    self.registration.showNotification('FitDaily Reminder', options)
+  );
+});
+
+// Handle notification clicks
+self.addEventListener('notificationclick', event => {
+  event.notification.close();
+
+  if (event.action === 'start-workout') {
+    event.waitUntil(
+      clients.openWindow('/')
+    );
+  }
+});
EOF
)
