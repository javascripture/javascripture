$('.bookSelect a').bind( 'mousemove touchmove', function( event ) {
	var numberOfChapters = parseInt( $(this).data( 'chapters' ), 10 );
	var position = event.clientX - $(this).offset().left;

	if ( ! event.clientX ) {
		var position = event.originalEvent.touches[0].clientX - $(this).offset().left;
	}
	var spacing =  $(this).width() / numberOfChapters;
	var chapter = Math.ceil( position / spacing );
	if ( isNaN( chapter ) ) {
		return false;
	}

	if ( chapter > numberOfChapters ) {
		chapter = numberOfChapters;
	}
	var hrefArray = $( this ).attr( 'href' ).split( ':' ),
		newHref = hrefArray[0] + ':' + chapter;

	$( this ).attr( 'href', newHref ).find('.chapter').text( chapter );
});
$('.bookSelect a').bind( 'touchend', function(event) {
	event.preventDefault();
	window.location.href = $( this ).attr( 'href' );
});
