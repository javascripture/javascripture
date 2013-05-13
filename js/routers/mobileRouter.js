// Mobile Router
// =============

// Includes file dependencies
define([ "jquery","backbone", "../models/ReferenceModel", "../collections/ReferenceCollection", "../views/ReferenceView", 'bible' ], function( $, Backbone, ReferenceModel, ReferenceCollection, ReferenceView, bible ) {

    // Extends Backbone.Router
    var ReferenceRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Animal Category View
            this.ReferenceView = new ReferenceView( { el: "#reference", collection: new ReferenceCollection( [] , { type: "reference" } ) } );

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home",

            // When #category? is on the url, the reference method is called
            "reference?:type": "reference"

        },

        // Home method
        home: function() {

			// Programatically changes to the categories page
			var bookNumber,
				chapterNumber,
				numberOfVerses,
				verseNumber,
				referenceObject = {};
			bookNumber = Math.floor(Math.random() * bible.Data.books.length);
			chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length);
			numberOfVerses = bible.Data.verses[bookNumber][chapterNumber];
			verseNumber = Math.floor(Math.random() * numberOfVerses);
			referenceObject.book = bible.Data.books[bookNumber][0];
			referenceObject.chapter = chapterNumber + 1;
			referenceObject.verse = verseNumber + 1;
			$('#reference-panel').reference(referenceObject);
			//$.mobile.changePage( "#reference" );

        },

        // Category method that passes in the type that is appended to the url hash
        reference: function(type) {

			// Stores the current Category View  inside of the currentView variable
			var typeArray = type.split('&'),
				currentView = this[ type + "View" ],
				bookParamArray = typeArray[0].split('='),
                chapterParamArray = typeArray[1].split('='),
                verseParamArray = typeArray[2].split('=');
                           
			/*var currentBook = $('#reference-panel').reference('option', 'book'),
				currentChapter = $('#reference-panel').reference('option', 'chapter'),
				currentVerse = $('#reference-panel').reference('option', 'verse'),
				requestedBook = router.getParams(match[1]).book,
				requestedChapter = router.getParams(match[1]).chapter,
				requestedVerse = router.getParams(match[1]).verse;*/
			//if (currentBook !== requestedBook || currentChapter !== requestedChapter) {
			$('#reference-panel').reference({
				book: bookParamArray[1],
				chapter: chapterParamArray[1],
				verse: verseParamArray[1]
			});

            // If there are no collections in the current Category View
/*            if(!currentView.collection.length) {

                // Show's the jQuery Mobile loading icon
                $.mobile.loading( "show" );

                // Fetches the Collection of Category Models for the current Category View
                currentView.collection.fetch().done( function() {

                    // Programatically changes to the current categories page
                    $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );
    
                } );

            }

            // If there already collections in the current Category View
            else {

                // Programatically changes to the current categories page
                $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );

            }
*/
        }

    } );

    // Returns the Router class
    return ReferenceRouter;

} );