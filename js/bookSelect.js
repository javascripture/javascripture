$('.bookSelect a').bind('touchmove',function(e){
      e.preventDefault();
alert('h');
});
$('.bookSelect a').bind( 'mousemove touchmove', function(event) {
	var numberOfChapters = parseInt( $(this).data( 'chapters' ), 10 ),
	    position = event.clientX - $(this).offset().left,
	    spacing =  $(this).width() / numberOfChapters,
	    chapter = Math.ceil( position / spacing );
	if ( isNaN( chapter ) ) {
		return false;
	}

	if ( chapter > numberOfChapters ) {
		chapter = numberOfChapters;
	}
	var hrefArray = $( this ).attr( 'href' ).split( 'chapter=' ),
		newHref = hrefArray[0] + 'chapter=' + chapter;

	$( this ).attr( 'href', newHref ).find('.chapter').text( chapter );
});
$('.bookSelect a').bind( 'touchend', function(event) {
	event.preventDefault();
	window.location.href = $( this ).attr( 'href' );
});