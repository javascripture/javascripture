/*global javascripture*/
javascripture.modules.versionSelector = {
	switcher: '.versionSelector',
	getVersion: function ( target ) {
		if ( localStorage && localStorage[ target ] ) {
			return localStorage[ target ];
		}
		if ( $( '[name=' + target + 'Version]').val() ) {
			return $( '[name=' + target + 'Version]').val();
		}
		return 'kjv';
	},
	switchVersion: function ( $this, version ) {
		var target = $this.data('target');
		if ( 'undefined' === typeof version ) {
			version = $this.val();
		}

		if ( version === 'lc' ) {
			javascripture.data[ target ] = javascripture.data.original;
		} else {
			javascripture.data[ target ] = javascripture.data[ version ];
		}

		localStorage[ target ] = version;

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
