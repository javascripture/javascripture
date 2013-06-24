/*global define, require, debug*/
define(['jquery', 'jquery-mobile', 'ba-debug', 'external/jquery.waypoints'], function ($, timer) {
	"use strict";
	var moduleName = 'wayPoint';
	$.widget("javascripture." + moduleName, {
		_create: function () {
			this.element.waypoint(function (event, direction) {
				console.log('waypoint');
				$('#hashDelay').val('true');
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
					console.log( $this );
					$( 'h1' ).text( $this.data('book') + ' ' + $this.data('chapter') );
//					var hash = 'reference?book=' + $this.data('book') + '&chapter=' + $this.data('chapter');
//					window.location.hash = hash; //'reference?' + collection.objectToQueryString( collection.nextChapter );
//					event.stopPropagation();					
				}
			}, {
				offset: $('[data-role=header]').height()
			});
		}
	});
});