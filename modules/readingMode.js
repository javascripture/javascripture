$( '#readingMode' ).bind( 'touchstart click', function () {
	$(this).toggleClass( 'icon-fullscreen-exit' );
	readingMode = $( 'html' ).toggleClass( 'reading-mode' ).hasClass( 'reading-mode' );
	if ( localStorage ) {
		localStorage.readingMode = readingMode;
	}
} );
if ( localStorage && localStorage.readingMode && localStorage.readingMode === 'true' ) {
	$( 'html' ).addClass( 'reading-mode' );
}
