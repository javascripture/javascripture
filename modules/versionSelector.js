/*global javascripture*/
javascripture.modules.versionSelector = {
	switcher: '#versionSelector',
	getVersion: function () {
		if ( localStorage && localStorage.english ) {
			return localStorage.english;
		}
		return 'kjv';
	},
	switchVersion: function ( version ) {
		javascripture.data.english = javascripture.data[ version ];
		localStorage.english = version;
		if ( 'undefined' !== typeof $.fn.popup ) { //should be done in a different place
			$( '.popup' ).popup( 'close' );
		}
		$( javascripture.modules.versionSelector.switcher ).val( version );
		if ( 'undefined' !== typeof javascripture.modules.reference ) {
			javascripture.modules.reference.loadReferenceFromHash();
		}
	}
};

//when page loads
javascripture.modules.versionSelector.switchVersion( javascripture.modules.versionSelector.getVersion() );

//bind version switcher
$( document ).on( 'change', javascripture.modules.versionSelector.switcher, function () {
	javascripture.modules.versionSelector.switchVersion( $(this).val() );
} );