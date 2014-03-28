var javascripture = {};
javascripture.data = {};
javascripture.data.greek = {};
javascripture.api = {};
importScripts('../data/greek4.js');
importScripts('../api/search.js?1');
self.addEventListener('message', function(e) {
	// var data = e.data;
	var result = javascripture.api.search.getReferences( {
		language: "greek",
		lemma: "G4864",
		range: "verse",
	} );
  self.postMessage(result);
}, false);

//self.addEventListener('message', function(e) {
	//e.data;
//	self.postMessage( e.data );//javascripture.data.greek.Matthew[0][0]);
//}, false);