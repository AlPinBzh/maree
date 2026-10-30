// Garde une copie de l'app pour qu'elle s'ouvre même sans réseau.
// Toujours essayer la version en ligne d'abord (pour recevoir les mises à jour), sinon la copie.
const CACHE = 'maree-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request))
  );
});
