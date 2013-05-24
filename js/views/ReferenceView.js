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
            this.collection.on( "create", this.render, this );

        },

        // Renders all of the Category models on the UI
        render: function() {

			var collection = this.collection
			    jsonCollection = collection.toJSON()[0], //bit strange!
			    anchoringData = this.getAnchoringData( this.collection.direction );

            // Sets the view's template property
            this.template = _.template( $( "script#categoryItems" ).html(), { "collection": jsonCollection } );

            // Renders the view's template inside of the current listview element
            this.$el.find("#reference-panel").html(this.template);

			this.anchorReference( anchoringData );
			
			$('.chapter-wrapper').waypoint(function (event, direction) {
				$('#stopBackbone').val('true');
				var $this = undefined;
				if (direction === 'down') {
					$this = $(this);
				} else {
					if ( $(this).prev('.chapter-wrapper').length ) {
						$this = $(this).prev('.chapter-wrapper');						
					}
				}
				if ( $this !== undefined ) {
					$( 'h1' ).text( $this.data('book') + ' ' + $this.data('chapter') );
					var hash = 'reference?book=' + $this.data('book') + '&chapter=' + $this.data('chapter');
					window.location.hash = hash; //'reference?' + collection.objectToQueryString( collection.nextChapter );
//					event.stopPropagation();					
				}
			}, {
				offset: $('[data-role=header]').height()
			});

            // Maintains chainability
            return this;

        },
        
		getAnchoringData: function ( direction ) {
			//anchor to current verse
			var anchorPointSelector = '.current-verse',
				offset = 0,
				$bodyOffset = $('body').scrollTop(),
				$anchorVerse;

			//anchor to scrollstop point
			if ( direction ) {
				if ( direction === 'previous' ) {
					$anchorVerse = $('.chapter-wrapper:first-child ol.wrapper li:first-child');
				}
	
				if ( direction === 'next' ) {
					$anchorVerse = $('.chapter-wrapper:last-child ol.wrapper li:last-child');
				}
				anchorPointSelector = '#' + $anchorVerse.attr('id');
				offset = $bodyOffset - $anchorVerse.offset().top;
			}

			return [offset, anchorPointSelector];
		},
		
		anchorReference: function ( anchoringData ) {
			var anchorPointSelector = anchoringData[1],
			    offset = anchoringData[0],
			    $anchorPoint = $( anchorPointSelector );

			if ( anchorPointSelector === '.current-verse' ) {
				verseHeight = $anchorPoint.height(),
				offset = -$(window).height() / 2 + verseHeight;				
			}

			//anchor to a chapter
			if ( $anchorPoint.length === 0 ) {
				$anchorPoint = $( '#' + jsonCollection.currentId );
				offset = - $('[data-role=header]').height();
			}

			$('body').scrollTo( $anchorPoint, { offset: offset } );
		}
		
    } );

    // Returns the View class
    return ReferenceView;

} );