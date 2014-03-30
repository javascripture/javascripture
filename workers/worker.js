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
importScripts('../api/searchApi.js');
self.addEventListener('message', function( e ) {
	if ( e.data.task === 'search' ) {
		self.postMessage( javascripture.api.search.getReferences( e.data.parameters ) );
	}
}, false);

//self.addEventListener('message', function(e) {
	//e.data;
//	self.postMessage( e.data );//javascripture.data.greek.Matthew[0][0]);
//}, false);