var module = {};
var javascripture = {};
javascripture.api = {};

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
