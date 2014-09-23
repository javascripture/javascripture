;( function () {
	$( document ).bind( 'createWayPoint', function () {
		$('.reference').waypoint( function ( direction ) {
			console.log( 'hit way point' );
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

				// Update URL?
				var newReference = '#reference=' + $this.data( 'book' ) + ':' + $this.data( 'chapter' );
				if ( $this.data( 'verse' ) ) {
					newReference += ':' + $this.data( 'verse' );
				}

				if ( newReference !== window.location.hash ) {
//					console.log( 'change hash?' );
//					window.location.hash = 'reference=' + $this.data( 'book' ) + ':' + $this.data( 'chapter' );
				}
			}
		}, {
			offset: $('#dock').height()
		} );
	} );
} )( jQuery );