;( function ( $ ) {
	$( document ).on( 'click', '.toggler', function ( event ) {
		event.preventDefault();
		var hash = $( this ).attr( 'href' );
		$( hash ).toggle();
	} );
} )( jQuery );