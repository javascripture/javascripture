/*global javascripture*/
javascripture.modules.colors = {
	getStrongsColor: function ( strongsInt ) {
		if ( isNaN ( strongsInt ) ) {
			strongsInt = 0;
		}
		var theSizeOfAColorSegment = 360 / 8000,
			hue = strongsInt * theSizeOfAColorSegment,
			staturation = $( '#subdueColorBy' ).val() * 100 + '%',
			lightness = $( '#subdueColorBy' ).val() * 100 + '%';
		return 'hsl( ' + hue + ',' + staturation + ', ' + lightness + ' )';
	},

	getStrongsStyle: function ( strongsNumber ) {
		var hightlightFamilies = $( '#highlightWordsWith' ).val() === 'family',
			className,
			classInt;
		if ( hightlightFamilies ) {
			className = javascripture.api.word.getFamily( strongsNumber ) + '-family';
			classInt = parseFloat( className.substring( 1, className.length ), 10 );
		} else {
			className = strongsNumber;
			classInt = parseInt( strongsNumber.substring( 1, strongsNumber.length ), 10 );
		}

		var newColor = javascripture.modules.colors.getStrongsColor( classInt );
		return '.' + className + ' {color:#fff !important;background:' + newColor + ' !important;}';
	}
};

$( '#highlightWordsWith' ).change( function() {
	var type = $( this ).val();
	localStorage.highlightWordsWith = type;
} );

if ( localStorage.highlightWordsWith ) {
	$( '#highlightWordsWith' ).val( localStorage.highlightWordsWith );
}