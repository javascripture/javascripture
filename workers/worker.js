var module = {};
var javascripture = {};
javascripture.data = {};
javascripture.api = {};
self.postMessage( { task: 'loading', html: 'loading KJV' } );
importScripts('../data/KJV.js');
self.postMessage( { task: 'loading', html: 'loading ESV' } );
importScripts('../data/ESV.js');
self.postMessage( { task: 'loading', html: 'loading WEB' } );
importScripts('../data/WEB.js');
self.postMessage( { task: 'loading', html: 'loading Hebrew' } );
importScripts('../data/morphhb.js');
self.postMessage( { task: 'loading', html: 'loading Greek' } );
importScripts('../data/tischendorf.js');

javascripture.data.kjv=KJV.books;
javascripture.data.esv=ESV.books;
javascripture.data.web=WEB.books;
javascripture.data.hebrew=morphhb;
javascripture.data.greek=tischendorf;

importScripts('../data/bible.js');
self.postMessage( { task: 'loading', html: 'loading API' } );
importScripts('../api/searchApi.js');
self.postMessage( { task: 'loading', html: 'loading complete!' } );
self.addEventListener('message', function( e ) {
	var result;
	if ( e.data.task === 'search' || e.data.task === 'word' ) {
		result = javascripture.api.search.getReferences( e.data.parameters, e.data.data );
	}

	if ( result ) {
		self.postMessage( {
			task: e.data.task,
			parameters: e.data.parameters,
			result: result
		} );
	}

}, false);
