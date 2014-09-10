/*global javascripture*/
javascripture.modules.versionSelector = {
	switcher: '.versionSelector',
	getVersion: function ( target ) {
		if ( localStorage && localStorage[ target ] ) {
			return localStorage[ target ];
		}
		return 'kjv';
	},
	switchVersion: function ( version, target ) {
		//if ( version === 'original' ) {
		//	$('html').addClass( 'read-original' );
		//} else {
		//	$('html').removeClass( 'read-original' );
			if ( version === 'lc' ) {
				javascripture.data[ target ] = javascripture.data.kjv;
			} else {
				javascripture.data[ target ] = javascripture.data[ version ];
			}
			localStorage[ target ] = version;
			if ( 'undefined' !== typeof $.fn.popup ) { //should be done in a different place
				$( '.popup' ).popup( 'close' );
			}
//			$( javascripture.modules.versionSelector.switcher ).val( version );
			if ( 'undefined' !== typeof javascripture.modules.reference ) {
				javascripture.modules.reference.loadReferenceFromHash();
			}
		//}
	}
};

//when page loads

//default
javascripture.data.english = javascripture.data.kjv;

//change it if necessary
javascripture.modules.versionSelector.switchVersion( javascripture.modules.versionSelector.getVersion( 'left' ), 'left' );
javascripture.modules.versionSelector.switchVersion( javascripture.modules.versionSelector.getVersion( 'right' ), 'right' );

//bind version switcher
$( javascripture.modules.versionSelector.switcher ).change( function () {
	javascripture.modules.versionSelector.switchVersion( $(this).val(), $(this).data('target') );
} );
