;( function () {
	$( document ).bind( 'createWayPoint', function () {
		console.log('create way point');
		$('.reference').waypoint( function ( direction ) {
//			console.log(this);
//			console.log(direction);
			var $this;
			if ( direction === 'down' ) {
				$this = $(this);
			} else {
//				console.log( $(this).prev('.reference') );
				if ( $(this).prev('.reference').length ) {
					$this = $(this).prev('.reference');
				}
			}
//			console.log( typeof ( $this ) );
			if ( typeof ( $this ) !== 'undefined' ) {
//				console.log( $this.data() );
//				document.getElementById( 'bookSelect' ).value = $this.data( 'book' );
//				document.getElementById( 'chapterSelect' ).value = $this.data( 'chapter' );
				var reference = $this.data( 'book' ) + ' ' + $this.data( 'chapter' );
				if ( $this.data( 'verse' ) ) {
					reference += ':' + $this.data( 'verse' );
				}
				document.getElementById( 'goToReference' ).value = reference;
			}
		}, {
			offset: $('.dock').height()
		} );
	} );
} )( jQuery );