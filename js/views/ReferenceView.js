// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/ReferenceModel" ], function( $, Backbone, ReferenceModel ) {

    // Extends Backbone.View
    var ReferenceView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

	        var self = this; 

            // The render method is called when Category Models are added to the Collection
            this.collection.on( "added", this.render, this );

        },

        // Renders all of the Category models on the UI
        render: function() {

			var collection = this.collection.toJSON()[0]; //bit strange!
            // Sets the view's template property
            this.template = _.template( $( "script#categoryItems" ).html(), { "collection": collection } );

            // Renders the view's template inside of the current listview element
            this.$el.find("#reference-panel").html(this.template);
            
			//anchor to current verse
			var $anchorPoint = $('.current-verse'),
				verseHeight = $anchorPoint.height(),
				offset = -$(window).height()/2 + verseHeight;
			
			//anchor to a chapter
			if ( $anchorPoint.length === 0 ) {
				$anchorPoint = $( '#' + collection.currentId );
				offset = - $('[data-role=header]').height();
			}
			$('body').scrollTo( $anchorPoint, { offset: offset } );

            // Maintains chainability
            return this;

        }
		
    } );

    // Returns the View class
    return ReferenceView;

} );