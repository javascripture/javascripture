var getStrongsColor = function( lemma ) {
		var strongsInt = parseInt( lemma.substring( 1, lemma.length ) );
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

module.exports = {
	get: getStrongsColor
};
