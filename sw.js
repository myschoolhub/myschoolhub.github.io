const CACHE_NAME = 'offline-ai-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@latest/dist/webllm.min.js',
  'https://huggingface.co/mlc-ai/Llama-3-8B-Instruct-q4f32_1-MLC/resolve/main/model.bin'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
