var getStrongsColor = function( lemma ) {
		var strongsInt = parseInt( lemma );
		if ( isNaN ( strongsInt ) ) {
			strongsInt = 0;
		}
		var theSizeOfAColorSegment = 360 / 8000,
			hue = strongsInt * theSizeOfAColorSegment,
			staturation = '50%',
			lightness = '50%';
		return 'hsl( ' + hue + ',' + staturation + ', ' + lightness + ' )';
};

var getHue = function( strongsInt ) {
	var theSizeOfAColorSegment = 360 / 8000; //8000 different words
	return strongsInt * theSizeOfAColorSegment;
};

var getSaturation = function( strongsInt ) {
	return '50%';
};

var getLightness = function( strongsInt ) {
	return '50%';
};

var getStrongsStyle = function ( strongsNumber ) {
	highlightWordsWith
	var hightlightFamilies = javascripture.state.settings.highlightWordsWith === 'family',
		className,
		classInt;
	if ( hightlightFamilies ) {
		className = javascripture.api.word.getFamily( strongsNumber ) + '-family';
		classInt = parseFloat( strongsNumber.substring( 1, strongsNumber.length ), 10 );
	} else {
		className = strongsNumber;
		classInt = parseInt( strongsNumber.substring( 1, strongsNumber.length ), 10 );
	}

	var newColor = getStrongsColor( classInt );
	return '.' + className + ' {color:#fff !important;background:' + newColor + ' !important;}';
};

module.exports = {
	get: getStrongsColor,
	getStyle: getStrongsStyle
};
