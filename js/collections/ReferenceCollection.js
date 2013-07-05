// Category Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/ReferenceModel", 'bible', 'english-ot', 'english-nt', 'hebrew', 'greek' ], function( $, Backbone, ReferenceModel, bible, englishOt, englishNt, hebrew, greek ) {

	var english = jQuery.extend(englishOt, englishNt);

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
						referenceName: references.getReferenceName(),
						chapters: []
					},
					previousChapter = references.getReference(-1),
					currentChapter = references.getReference(0),
					nextChapter = references.getReference(1);

				if ( previousChapter ) {
					collection.chapters.push( previousChapter );					
				}
				if ( currentChapter ) {
					collection.chapters.push( currentChapter );					
				}
				if ( nextChapter ) {
					collection.chapters.push( nextChapter );					
				}

				// Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
				options.success( collection );

				// Triggers the custom `added` method (which the Category View listens for)
				self.trigger( "create" );

				// Resolves the deferred object (this triggers the changePage method inside of the Category Router)
				deferred.resolve();

			}, 1);

			// Returns the deferred object
			return deferred;

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

    // Returns the Model class
    return Collection;

} );