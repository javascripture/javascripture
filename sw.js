var cache = 'javascripture.11.1'; // service worker!

self.addEventListener('install', function(e) {
	e.waitUntil( caches.open( cache ).then(function(cache) { // layout tweaks
	return cache.addAll([
		'/',
		'/index.html',
		'/css/layout.css',
		'/manifest.json',
		'/javascripture.svg',
		//libs
		'lib/MorphCodes.js',
		'lib/MorphParse.js',

		//data
		'data/bible.js',
		'data/extra-dictionary.js',
		'data/strongs-dictionary.js',
		'data/kjvdwyer7.js',
		'data/web3.js',
		'data/strongsObjectWithFamilies2.js',
		'data/hebrew.js',
		'data/greek4.js',
		'data/crossReferences.js',
		'data/morphology.js',
		'data/literalConsistent.js',
		'data/literalConsistentExtra.js',

		//api - so that search works offline?
		'api/searchApi.js',

		//modules
		'build/bundle.js',

		//workers
		'workers/worker.js',
		]);
	}));
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});

// Delete unused cache
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [ cache ];
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
