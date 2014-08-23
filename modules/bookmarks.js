/*global javascripture Backbone _*/
/*javascripture.modules.bookmarks = {
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

*/

var Bookmark = Backbone.Model.extend( { } );

var BookmarkList = Backbone.Collection.extend({
    model: Bookmark,

    // Save all of the todo items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("bookmarks-backbone")

});

var BookmarkView = Backbone.View.extend({
	tagName: 'li',
	events: {
		'click .remove' : 'deleteBookmark'
	},
	deleteBookmark: function() {
		this.model.destroy();
	},
    initialize: function() {
      this.listenTo( this.model, 'destroy', this.remove );
    },
    render: function() {
		// Compile the template using underscore
		var template = _.template( $("#bookmark-template").html(), this.model.attributes );
		// Load the compiled HTML into the Backbone "el"
		this.$el.html( template );
		return this.$el;
    }
});

var BookmarksView = Backbone.View.extend({
	el: '#bookmarksPanel',
	initialize: function(){
		this.collection = new BookmarkList();
		this.render();
		this.listenTo( this.collection, 'add', this.addOne );
	},
	events: {
		"click .bookmark-current-passage": "clickAdd"
	},
	clickAdd: function() {
		var reference = javascripture.modules.reference.getReferenceFromHash();
		var bookmark = new Bookmark( reference );
		this.collection.create( bookmark );
	},
	addOne: function( bookmark ) {
		var bookmarkView = new BookmarkView( { model: bookmark } );
		this.$( 'ol.bookmarks' ).append( bookmarkView.render() );
    },

	render: function() {
		//Pass variables in using Underscore.js Template
		var self = this;
		this.collection.fetch();
		this.collection.each( function( bookmark ) {
			self.addOne( bookmark );
		} );
	}
});

var bookmarksView = new BookmarksView();
