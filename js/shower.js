;( function ( $ ) {
	$.fn.shower = function ( method ) {
		var $this = this;
		var methods = {
			show: function () {
				$this.show();
			},
			hide: function () {
				$this.hide();
			}
		};

		if ( methods[method] ) {
			methods[method]();
		}
	};
	$( document ).on( 'click', '.shower', function ( event ) {
		event.preventDefault();
		var hash = $( this ).attr( 'href' );
		$( hash ).shower( 'show' );
	} );
	$( document ).on( 'click', '.hider', function ( event ) {
		event.preventDefault();
		var hash = $( this ).attr( 'href' );
		$( hash ).shower( 'hide' );
	} );
} )( jQuery );