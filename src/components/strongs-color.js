import { getFamily } from '../lib/word';

var getStrongsColor = function( lemma, lightness ) {
		var strongsInt = parseInt( lemma );
		if ( isNaN ( strongsInt ) ) {
			strongsInt = 0;
		}
		var theSizeOfAColorSegment = 360 / 8000,
			hue = Math.floor( strongsInt * theSizeOfAColorSegment ),
			staturation = '50%';
		return 'hsl( ' + hue + ',' + staturation + ', ' + lightness + ' )';
};

var getHue = function( strongsInt ) {
	var theSizeOfAColorSegment = 360 / 8000; //8000 different words
	return strongsInt * theSizeOfAColorSegment;
};

var getStyle = function ( strongsNumber, lightness, highlightWordsWith ) {
	var hightlightFamilies = highlightWordsWith === 'family',
		className,
		classInt;
	if ( hightlightFamilies ) {
		className = getFamily( strongsNumber ) + '-family';
		classInt = parseFloat( strongsNumber.substring( 1, strongsNumber.length ), 10 );
	} else {
		className = strongsNumber;
		classInt = parseInt( strongsNumber.substring( 1, strongsNumber.length ), 10 );
	}

	var newColor = getStrongsColor( classInt, lightness );
	return '.' + className + ' {color:#fff !important;background:' + newColor + ' !important; margin: 0 -1px; padding: 0 1px;}';
};

module.exports = {
	get: getStrongsColor,
	getStyle: getStyle
};
