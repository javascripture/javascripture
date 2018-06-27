var javascripture = {};
javascripture.data = {};
javascripture.data.kjv = {};
javascripture.data.web = {};
javascripture.data.greek = {};
javascripture.data.hebrew = {};
javascripture.api = {};
self.postMessage( { task: 'loading', html: 'loading KJV' } );
importScripts('../data/kjvdwyer7.js');
self.postMessage( { task: 'loading', html: 'loading WEB' } );
importScripts('../data/web3.js');
self.postMessage( { task: 'loading', html: 'loading Hebrew' } );
importScripts('../data/hebrew-with-morph5.js');
importScripts('../data/jonah.js');
self.postMessage( { task: 'loading', html: 'loading Greek' } );
importScripts('../data/greek4.js');

importScripts('../data/bible.js');
self.postMessage( { task: 'loading', html: 'loading Strongs' } );
importScripts('../data/strongsObjectWithFamilies2.js');

self.postMessage( { task: 'loading', html: 'loading API' } );
importScripts('../api/word.js');
importScripts('../api/searchApi.js');
importScripts('../api/reference.js');
self.postMessage( { task: 'loading', html: 'loading complete!' } );
self.addEventListener('message', function( e ) {
	var result;

	if ( e.data.task === 'search' || e.data.task === 'word' ) {
		result = javascripture.api.search.getReferences( e.data.parameters );
	}
	if ( e.data.task === 'reference' ) {
		result = javascripture.api.reference.getThreeChapters( e.data.parameters );
	}

	if ( result ) {
		self.postMessage( {
			task: e.data.task,
			parameters: e.data.parameters,
			result: result
		} );
	}

}, false);
