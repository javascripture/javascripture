// Category Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/ReferenceModel", 'bible', 'english', 'hebrew', 'greek' ], function( $, Backbone, ReferenceModel, bible, english, hebrew, greek ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

	        if (options) {
	        
	            // Sets the type instance property (ie. animals)
	            this.book = options.book;
	            this.chapter = options.chapter;
	            this.verse = options.verse;
		        
	        }

      },

        // Sets the Collection model property to be a Category Model
        model: ReferenceModel,

        // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
        sync: function( method, model, options ) {

console.log(method);
console.log(model);
console.log(options);
            // Stores the this context in the self variable
            self = this,

            // Creates a jQuery Deferred Object
            deferred = $.Deferred();

            // Uses a setTimeout to show the loading spinner
            setTimeout( function() {
				var references = new ReferenceModel({
					book: self.book,
					chapter: self.chapter,
					verse: self.verse
				});

				var collection = references.getReference();

                // Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
                options.success( collection );

                // Triggers the custom `added` method (which the Category View listens for)
                self.trigger( "added" );

                // Resolves the deferred object (this triggers the changePage method inside of the Category Router)
                deferred.resolve();

            }, 1);

            // Returns the deferred object
            return deferred;

        },
        
        getOffsetChapter: function( offsetNumber ) {
        	
	        var book = this.book,
	        	chapter = this.chapter,
	        	offsetChapter = {},
				offsetChapterNumber = parseInt(chapter, 10) + offsetNumber,
				offsetNumberJavascript = offsetChapterNumber - 1,
				offsetBook;
			if (english[book] && english[book][offsetNumberJavascript] !== undefined) {
				offsetChapter.book = book;
				offsetChapter.chapter = offsetChapterNumber;
			} else {
				//get the offset book
				$.each(bible.Data.books, function (index, loopBookArray) {
					if (loopBookArray[0] === book) {
						offsetBook = index + offsetNumber;
						if (bible.Data.books[offsetBook] !== undefined) {
							offsetChapter.book = bible.Data.books[offsetBook][0];
							//only supports offsets of 1 or -1. to make it work with bigger values this will have to change
							if (offsetNumber > 0) {
								offsetChapter.chapter = 1;
							} else {
								offsetChapter.chapter = bible.Data.verses[offsetBook].length;
							}
						}
					}
				});
			}
			
			return offsetChapter;

        }

    } );

    // Returns the Model class
    return Collection;

} );