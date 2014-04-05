/*global javascripture*/
javascripture.modules.bookmarks = {
	init: function() {
		var bookmarks = [],
			self = this;
		if ( localStorage.bookmarks ) {
			bookmarks = this.getLocalStorage();
			bookmarks.forEach( function( bookmark ) {
				self.addToPage( bookmark );
			} );
		} else {
			localStorage.bookmarks = JSON.stringify([]);

		}
	},
	getLocalStorage: function() {
		return JSON.parse(localStorage.bookmarks);
	},
	saveLocalStorage: function( bookmarks ) {
		localStorage.bookmarks = JSON.stringify( bookmarks );
	},
	addToPage: function( bookmark ) {
		var reference = javascripture.modules.reference.getReferenceFromUrl( bookmark );
		$( '.bookmarks' ).append( '<li><a href="' + bookmark+ '">' + reference.book + ' ' + reference.chapter + ':' + reference.verse + '</a></li>' );
	},
	add: function() {
		var bookmarks = this.getLocalStorage();
		bookmarks.push( window.location.hash );
		this.saveLocalStorage( bookmarks );
		this.addToPage( window.location.hash );
	}
};

//bind version switcher
$( '.bookmark-current-passage' ).on( 'click', function() {
	javascripture.modules.bookmarks.add();
} );

javascripture.modules.bookmarks.init();