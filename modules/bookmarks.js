/*global javascripture*/
javascripture.modules.bookmarks = {
	init: function() {
		var bookmarks = [];
		if ( ! localStorage.bookmarks ) {
			localStorage.bookmarks = JSON.stringify( bookmarks );
		}
		this.render();
	},
	getLocalStorage: function() {
		return JSON.parse(localStorage.bookmarks);
	},
	saveLocalStorage: function( bookmarks ) {
		localStorage.bookmarks = JSON.stringify( bookmarks );
	},
	addToPage: function( bookmark ) {
		$( '.bookmarks' ).append( '<li><a href="#' + javascripture.modules.reference.createReferenceLink( bookmark ) + '">' + bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse + '</a></li>' );
	},
	add: function() {
		var bookmarks = this.getLocalStorage();
		var referenceObject = javascripture.modules.reference.getReferenceFromHash();
		bookmarks.push( referenceObject );
		this.saveLocalStorage( bookmarks );
		this.addToPage( referenceObject );
	},
	remove: function( keyToRemove ) {
		var bookmarks = this.getLocalStorage();
		bookmarks.filter( function( value, key ) {
			if ( key === keyToRemove ) {
				return false;
			}
			return true;
		} );
		this.saveLocalStorage( bookmarks );
		this.render();
	},
	render: function() {
		var bookmarks = this.getLocalStorage(),
		    bookmarksMarkup = '';
		bookmarks.forEach( function( bookmark ) {
			bookmarksMarkup += '<li><a href="#' + javascripture.modules.reference.createReferenceLink( bookmark ) + '">' + bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse + '</a></li>';
		} );
		$( '.bookmarks' ).html( bookmarksMarkup );
	}
};

//bind version switcher
$( '.bookmark-current-passage' ).on( 'click', function() {
	javascripture.modules.bookmarks.add();
} );

javascripture.modules.bookmarks.init();