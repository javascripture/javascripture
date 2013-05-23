// Mobile Router
// =============

// Includes file dependencies
	define([ "jquery", "backbone", "../models/ReferenceModel", "../collections/ReferenceCollection", "../views/ReferenceView", 'bible' ], function( $, Backbone, ReferenceModel, ReferenceCollection, ReferenceView, bible ) {

	// Extends Backbone.Router
	var ReferenceRouter = Backbone.Router.extend( {

		// The Router constructor
		initialize: function() {

			var self = this;

			this.referenceView = new ReferenceView( {
				el: '#reference',
				collection: new ReferenceCollection( [], {} )
			} );
			

			$(window).bind('scrollstop', function () {
				var $window = $(this),
					scrollTop = $window.scrollTop(),
					contentHeight = $('#reference-panel').height() - $window.height();
				if (scrollTop === 0) { //previous
					var offsetChapter = self.referenceView.collection.previousChapter;
					window.location.hash = 'reference?' + self.objectToQueryString( offsetChapter );
				}
				if (scrollTop > contentHeight) { //next
					var offsetChapter = self.referenceView.collection.nextChapter;
					window.location.hash = 'reference?' + self.objectToQueryString( offsetChapter );
				}
			});

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
			var hashObject = this._getObjectFromHash( hash );

//			$('#reference-panel').reference( hashObject );
			this.referenceView.collection.book = hashObject.book;
			this.referenceView.collection.chapter = hashObject.chapter;
			this.referenceView.collection.verse = hashObject.verse;

            $.mobile.loading( "show" );

            // Fetches the Collection of Category Models for the current Category View
            this.referenceView.collection.fetch().done( function() {

                $.mobile.loading( "hide" );

            } );

		},

		_getObjectFromHash: function( hash ) {
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
			return this.objectToQueryString( referenceObject );
		},
		
		objectToQueryString: function( object ) {
			string = '';
			$.each(object, function (parameter, value) {
				if ( string != '' ) {
					string += '&';
				}
				string += parameter + '=' + value;
			})
			return string;
		}

    } );

    // Returns the Router class
    return ReferenceRouter;

} );