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

			var self = this,

            // Creates a jQuery Deferred Object
            deferred = $.Deferred();

            // Uses a setTimeout to show the loading spinner
            setTimeout( function() {
				var references = new ReferenceModel({
					book: self.book,
					chapter: self.chapter,
					verse: self.verse
				});

				self.previousChapter = references.getOffsetChapter(-1);
				self.nextChapter = references.getOffsetChapter(1);

				var collection = {
					currentId: references.getReferenceId(),
					chapters: []
				};

				collection.chapters.push(references.getReference(-1));
				collection.chapters.push(references.getReference(0));
				collection.chapters.push(references.getReference(+1));

                // Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
                options.success( collection );

                // Triggers the custom `added` method (which the Category View listens for)
                self.trigger( "added" );

                // Resolves the deferred object (this triggers the changePage method inside of the Category Router)
                deferred.resolve();

            }, 1);

            // Returns the deferred object
            return deferred;

        }

    } );

    // Returns the Model class
    return Collection;

} );