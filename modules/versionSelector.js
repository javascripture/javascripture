/*global javascripture*/
javascripture.modules.versionSelector = {
	switcher: '.versionSelector',
	getVersion: function ( target ) {
		if ( localStorage && localStorage[ target ] ) {
			return localStorage[ target ];
		}
		return 'kjv';
	},
	switchVersion: function ( $this, version ) {
		var target = $this.data('target');
		if ( 'undefined' === typeof version ) {
			version = $this.val();
		}

		if ( version === 'lc' ) {
			javascripture.data[ target ] = javascripture.data.kjv;
		} else {
			javascripture.data[ target ] = javascripture.data[ version ];
		}

		localStorage[ target ] = version;
		if ( 'undefined' !== typeof $.fn.popup ) { //should be done in a different place
			$( '.popup' ).popup( 'close' );
		}
		$this.val( version );
		if ( 'undefined' !== typeof javascripture.modules.reference ) {
			javascripture.modules.reference.loadReferenceFromHash();
		}

	}
};

//when page loads

//default
javascripture.data.english = javascripture.data.kjv;

//change it if necessary
javascripture.modules.versionSelector.switchVersion( $( '[name=leftVersion]'), javascripture.modules.versionSelector.getVersion( 'left' ) );
javascripture.modules.versionSelector.switchVersion( $( '[name=rightVersion]'), javascripture.modules.versionSelector.getVersion( 'right' ) );

//bind version switcher
$( javascripture.modules.versionSelector.switcher ).change( function () {
	javascripture.modules.versionSelector.switchVersion( $(this) );
} );
