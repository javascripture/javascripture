$('.open-menu').click( function( event ) {
	event.preventDefault();
	var $this = $( $(this).attr('href') ),
		$leftMenu = $( '.menu.left' ),
		$rightMenu = $( '.menu.right' ),
	    offset = 0,
	    axis = 'left';

	if ( $this.hasClass( 'right' ) ) {
		axis = 'right';
	}
	if ( $this.hasClass( 'top' ) ) {
		offset = '-200px';
	}

	if ( axis === 'left' ) {
		$leftMenu.animate( {
			left: offset
		} ).removeClass( 'top' );
	}

	if ( axis === 'right' ) {
		$rightMenu.animate( {
			right: offset
		} ).removeClass( 'top' );

	}

	if ( offset === 0 ) {
		$this.addClass('top');
	}
} );

if ( window.innerWidth > 960 ) {
	$( '#keyCode68' ).click();
	$( '#keyCode83' ).click();
}


