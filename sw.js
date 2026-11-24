// Kursheld – Service Worker: macht die App installierbar, offline startbar und liefert Benachrichtigungen.
const CACHE = 'kursheld-v3';
const FILES = ['./', './index.html', './manifest.webmanifest', './firebase-config.js',
  './icon-192.png', './icon-512.png', './favicon.png'];

self.addEventListener('install', e => {
  // Jede Datei einzeln und fehlertolerant: fehlt eine, darf der Service Worker trotzdem starten.
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(FILES.map(f => c.add(f).catch(() => null))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Eigene Dateien: erst Internet (für Updates), sonst aus dem Speicher. Fremde Adressen nicht anfassen.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(new Request(e.request.url, { cache: 'no-cache', credentials: 'same-origin' })).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
// Tippen auf eine Benachrichtigung: App öffnen bzw. nach vorne holen.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || './#wecker';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) { c.navigate && c.navigate(new URL(target, self.registration.scope).href).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(target);
  }));
});
