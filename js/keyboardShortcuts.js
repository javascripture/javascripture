/*global javascripture*/
;( function ( $ ) {
	"use strict";
	var listenForKeyboardShortcuts = false,
	    waitingForAnotherNumber = false,
	    waitingForNumberTimer;
	$(document).on('keydown', function (event) {
		if ( $( 'input:focus' ).length === 0 ) {
			//esc
			if ( 27 === event.keyCode ) {
				$( '.popup' ).popup( 'close' );
			}

			//jump to chapter
			if ( event.which > 48 && event.which < 58 ) {
				var chapter = event.which - 48,
				    currentReference = javascripture.modules.reference.getReferenceFromUrl();

				if ( waitingForAnotherNumber ) {
					chapter = '' + currentReference.chapter + chapter;
				}

				waitingForAnotherNumber = true;
				clearTimeout( waitingForNumberTimer );

				if ( javascripture.data.english[currentReference.book][chapter] ) {
					window.location.hash = '#book=' + currentReference.book + '&chapter=' + chapter;
				}
				waitingForNumberTimer = setTimeout( function () {
					if ( waitingForAnotherNumber === true ) {
						waitingForAnotherNumber = false;
					}
				}, 1000);

			}

			if ( event.keyCode === 18 ) {
				listenForKeyboardShortcuts = true;
			} else {
				if ( listenForKeyboardShortcuts ) {
					var target = $('#keyCode' + event.keyCode);
					if ( target.length > 0) {
						event.preventDefault();
						$('#keyCode' + event.keyCode).click();
					}

					if (event.keyCode === 14 || event.keyCode === 16 || event.keyCode === 45 || event.keyCode === 61) {
						if ($('#results .collapsible-wrapper').length) { //there should be a better way to see if the widget has been initialized
							var currentLink = $('#results').find('.ui-btn-active'),
								newLink;
							if (event.keyCode === 61 || event.keyCode === 14) {
								newLink = currentLink.closest('li').next().find('a');
							}
							if (event.keyCode === 45 || event.keyCode === 16) {
								newLink = currentLink.closest('li').prev().find('a');
							}
							newLink.click();
							//not sure why this is needed
							window.location = newLink.attr('href');
							newLink.closest('ol').scrollTo(newLink);
						}
					}
				}
				listenForKeyboardShortcuts = false;
			}

			if ( event.keyCode > 64 && event.keyCode < 91 ) {
				$( '#goToReference' ).val( '' ).focus();
			}
		}
	});
} )( jQuery );