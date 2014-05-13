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


javascripture.modules.bookmarks.init();*/


/*var Bookmark = Backbone.Model.extend();
var BookmarkList = Backbone.Collection.extend( {

	// Reference to this collection's model.
	model: Bookmark,

	// Save all of the todo items under the `"todos-backbone"` namespace.
	localStorage: new Backbone.LocalStorage("todos-backbone")

} );

var BookmarkView = Backbone.View.extend({

	//... is a list tag.
	tagName:  "li",

	// Cache the template function for a single item.
	template: _.template($('#bookmark-template').html()),

	// The DOM events specific to an item.
	events: {
	  "click .toggle"   : "toggleDone",
	  "dblclick .view"  : "edit",
	  "click a.destroy" : "clear",
	  "keypress .edit"  : "updateOnEnter",
	  "blur .edit"      : "close"
	},

	// The TodoView listens for changes to its model, re-rendering. Since there's
	// a one-to-one correspondence between a **Todo** and a **TodoView** in this
	// app, we set a direct reference on the model for convenience.
	initialize: function() {
	  this.listenTo(this.model, 'change', this.render);
	  this.listenTo(this.model, 'destroy', this.remove);
	},

	// Re-render the titles of the todo item.
	render: function() {
	  this.$el.html(this.template(this.model.toJSON()));
	  this.$el.toggleClass('done', this.model.get('done'));
	  this.input = this.$('.edit');
	  return this;
	},

	// Toggle the `"done"` state of the model.
	toggleDone: function() {
	  this.model.toggle();
	},

	// Switch this view into `"editing"` mode, displaying the input field.
	edit: function() {
	  this.$el.addClass("editing");
	  this.input.focus();
	},

	// Close the `"editing"` mode, saving changes to the todo.
	close: function() {
	  var value = this.input.val();
	  if (!value) {
	    this.clear();
	  } else {
	    this.model.save({title: value});
	    this.$el.removeClass("editing");
	  }
	},

	// If you hit `enter`, we're through editing the item.
	updateOnEnter: function(e) {
	  if (e.keyCode == 13) this.close();
	},

	// Remove the item, destroy the model.
	clear: function() {
	  this.model.destroy();
	}

});

*/
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
