function hideDock() {
	$( '.dock' ).animate( { 'top': '-63px' });
}
function showDock() {
	$( '.dock' ).animate( { 'top': 0 });
}
$( '#readingMode' ).bind( 'touchstart click', function () {
	var readingMode = $( 'html' ).toggleClass( 'reading-mode' ).hasClass( 'reading-mode' );
	$(this).toggleClass( 'icon-fullscreen-exit', readingMode );
	if ( readingMode ) {
		$( '#versionSelector' ).append( '<option value="original">Original</original>' );
		hideDock();
	} else {
		$( '#versionSelector option[value=original]' ).remove();
		showDock();
	}
	if ( localStorage ) {
		localStorage.readingMode = readingMode;
	}
} );
if ( localStorage && localStorage.readingMode && localStorage.readingMode === 'true' ) {
	$( 'html' ).addClass( 'reading-mode' );
	$( '#readingMode' ).addClass( 'icon-fullscreen-exit' );
	$( '#versionSelector' ).append( '<option value="original">Original</option>' );
	hideDock();
}

$( '#showGoToReference' ).bind( 'touchstart click', function () {
	var $dock = $( '.dock' );
	if ( $dock.css( 'top' ) === '0px' ) {
		hideDock();
	} else {
		showDock();
	}
} );
