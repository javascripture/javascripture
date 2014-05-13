/*global javascripture Backbone _*/
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
		this.render();
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
		bookmarks.forEach( function( bookmark, key ) {
			bookmarksMarkup += '<li><a href="#' + javascripture.modules.reference.createReferenceLink( bookmark ) + '">' + bookmark.book + ' ' + bookmark.chapter + ':' + bookmark.verse + '</a><br /><a class="icon-cross remove" aria-hidden="true" data-key="' + key + '"></a></li>';
		} );
		$( '.bookmarks' ).html( bookmarksMarkup );
	}
};

//bind version switcher
$( '.bookmark-current-passage' ).on( 'click', function() {
	javascripture.modules.bookmarks.add();
} );

$( '.bookmarks .remove' ).on( 'click', function() {
alert('h');
	javascripture.modules.bookmarks.remove();
} );


javascripture.modules.bookmarks.init();


/*
var Bookmark = Backbone.Model.extend( { } );

var BookmarkList = Backbone.Collection.extend({
    model: Bookmark
});

var bookmark1 = new Bookmark( { book: "Genesis", chapter: "1", verse: "1" } );
var bookmark2 = new Bookmark( { book: "Genesis", chapter: "2", verse: "1" } );
var bookmark3 = new Bookmark( { book: "Genesis", chapter: "3", verse: "1" } );

var bookmarkList = new BookmarkList([ bookmark1, bookmark2, bookmark3]);
console.log( bookmarkList.models ); // [song1, song2, song3]

var BookmarkView = Backbone.View.extend({
	el: 'li',
    initialize: function() {
      this.listenTo( this.model, 'change', this.render );
      this.listenTo( this.model, 'destroy', this.remove );
    }
});

var BooknmarksView = Backbone.View.extend({
	el: '#bookmarks',
	initialize: function(){
		this.render();
		this.listenTo( bookmarkList, 'add', this.addOne );
		this.listenTo( bookmarkList, 'reset', this.addAll );
	},

    addOne: function( bookmark ) {
		// Compile the template using underscore
		var template = _.template( $("#bookmark-template").html(), bookmark.attributes );
		// Load the compiled HTML into the Backbone "el"
		this.$el.append( template );
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Todos.each(this.addOne, this);
    },

	render: function(){
		//Pass variables in using Underscore.js Template
		var self = this;
		var bookmarkList = new BookmarkList([ bookmark1, bookmark2, bookmark3]);
		console.log( bookmarkList );
		bookmarkList.each( function( bookmark ) {
			self.addOne( bookmark );
		} );
	},
	events: {
		"click input[type=submit]": "addOne"
	}
});
var bookmarksView = new BooknmarksView();
*/