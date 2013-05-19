// Mobile Router
// =============

// Includes file dependencies
	define([ "jquery", "backbone", "../models/ReferenceModel", "../collections/ReferenceCollection", "../views/ReferenceView", 'bible' ], function( $, Backbone, ReferenceModel, ReferenceCollection, ReferenceView, bible ) {

	// Extends Backbone.Router
	var ReferenceRouter = Backbone.Router.extend( {

		// The Router constructor
		initialize: function() {

			Backbone.history.start();

		},

		// Backbone.js Routes
		routes: {

			// When there is no hash bang on the url, the home method is called
			"": "home",

			// When #reference? is on the url, the reference method is called
			"reference?:type": "reference"
			
		},

		// Home method
		home: function() {
		
			this.reference( this._getRandomReference() );

		},

		reference: function( hash ) {
			
			options = this._getOptionsFromHash( hash )
			$('#reference-panel').reference( options );
            
            /*this.referenceView = new ReferenceView( { el: "#reference", collection: new ReferenceCollection( [] ) } );

            $.mobile.loading( "show" );

            // Fetches the Collection of Category Models for the current Category View
            this.referenceView.collection.fetch().done( function() {
            
                $.mobile.loading( "hide" );

            } );*/

		},

		_getOptionsFromHash: function( hash ) {
			var typeArray = hash.split('&'),
				options = {};
			for(var i = 0; i < typeArray.length; i++) {
				parameter = typeArray[i].split('=');
				options[parameter[0]] = parameter[1];
			}
			return options;
		},

		// get a random reference
		_getRandomReference: function() {
			var bookNumber = Math.floor(Math.random() * bible.Data.books.length),
				chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length);
				numberOfVerses = bible.Data.verses[bookNumber][chapterNumber];
				verseNumber = Math.floor(Math.random() * numberOfVerses);
				referenceObject = {};
			referenceObject.book = bible.Data.books[bookNumber][0];
			referenceObject.chapter = chapterNumber + 1;
			referenceObject.verse = verseNumber + 1;
			return 'book=' + referenceObject.book + '&chapter=' + referenceObject.chapter  + '&verse=' + referenceObject.verse;
		}

    } );

    // Returns the Router class
    return ReferenceRouter;

} );