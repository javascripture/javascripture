/*global javascripture Backbone _*/
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
