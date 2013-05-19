// Category Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/ReferenceModel" ], function( $, Backbone, ReferenceModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
            this.book = options.book;
            this.chapter = options.chapter;
            this.verse = options.verse;

        },

        // Sets the Collection model property to be a Category Model
        model: ReferenceModel,

        // Sample JSON data that in a real app will most likely come from a REST web service
        jsonArray: [

            { "category": "animals", "type": "Pets" },

            { "category": "animals", "type": "Farm Animals" },

            { "category": "animals", "type": "Wild Animals" },

            { "category": "colors", "type": "Blue" },

            { "category": "colors", "type": "Green" },

            { "category": "colors", "type": "Orange" },

            { "category": "colors", "type": "Purple" },

            { "category": "colors", "type": "Red" },

            { "category": "colors", "type": "Yellow" },

            { "category": "colors", "type": "Violet" },

            { "category": "vehicles", "type": "Cars" },

            { "category": "vehicles", "type": "Planes" },

            { "category": "vehicles", "type": "Construction" }

        ],

        // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
        sync: function( method, model, options ) {

            // Local Variables
            // ===============

            // Instantiates an empty array
            var categories = [],

                // Stores the this context in the self variable
                self = this,

                // Creates a jQuery Deferred Object
                deferred = $.Deferred();

            // Uses a setTimeout to show the loading spinner
            setTimeout( function() {

                // Filters the above sample JSON data to return an array of only the correct category type
                categories = _.filter( self.jsonArray, function( row ) {

                    return row.category === self.type;

                } );
                console.log(categories);
                //var references = [];
				/*$.each(categories, function() {
					var category = new CategoryModel({
						book: 'Genesis',
						chapter: 1,
						verse: 1
					});
					references.push(category.getReference());
				});*/

				var references = new ReferenceModel({
					book: self.book,
					chapter: self.chapter,
					verse: self.verse
				});
				var collection = references.getReference();

				/*var collection = {
					chapterWrapperId: 'chapterWrapperId',
					chapterWrapperClass: 'chapterWrapperClass',
					book: 'book',
					chapter: 'chapter',
					references: references
		     	};*/

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