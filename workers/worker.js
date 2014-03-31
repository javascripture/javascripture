var javascripture = {};
javascripture.data = {};
javascripture.data.kjv = {};
javascripture.data.web = {};
javascripture.data.greek = {};
javascripture.data.hebrew = {};
javascripture.api = {};
importScripts('../data/kjvdwyer7.js');
importScripts('../data/web3.js');
importScripts('../data/hebrew6.js');
importScripts('../data/greek4.js');

importScripts('../data/bible.js');
importScripts('../data/strongsObjectWithFamilies.js');
importScripts('../api/word.js');

importScripts('../api/searchApi.js');
importScripts('../api/reference.js');
self.addEventListener('message', function( e ) {
	var result;

	if ( e.data.task === 'search' ) {

		result = javascripture.api.search.getReferences( e.data.parameters );
	}
	if ( e.data.task === 'reference' ) {
		result = javascripture.api.reference.getThreeChapters( e.data.parameters );
	}

	if ( result ) {
		self.postMessage( {
			task: e.data.task,
			result: result
		} );
	}

}, false);

//self.addEventListener('message', function(e) {
	//e.data;
//	self.postMessage( e.data );//javascripture.data.greek.Matthew[0][0]);
//}, false);