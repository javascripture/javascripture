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

var getStrongsColorWithSettings = function( strongsNumber, lightness, highlightWordsWith ) {
	var hightlightFamilies = highlightWordsWith === 'family',
		classInt;
	if ( hightlightFamilies ) {
		classInt = parseFloat( strongsNumber.substring( 1, strongsNumber.length ), 10 );
	} else {
		classInt = parseInt( strongsNumber.substring( 1, strongsNumber.length ), 10 );
	}

	return getStrongsColor( classInt, lightness );
};

var getClassNameWithSettings = function( strongsNumber, lightness, highlightWordsWith ) {
	if ( highlightWordsWith === 'family' ) {
		return getFamily( strongsNumber ) + '-family';
	} else {
		return strongsNumber;
	}
};

var getHue = function( strongsInt ) {
	var theSizeOfAColorSegment = 360 / 8000; //8000 different words
	return strongsInt * theSizeOfAColorSegment;
};

var getHighlight = function ( strongsNumber, lightness, highlightWordsWith ) {
	var newColor = getStrongsColorWithSettings( strongsNumber, lightness, highlightWordsWith );
	var className = getClassNameWithSettings( strongsNumber, lightness, highlightWordsWith );
	return '.' + className + ' {color:#fff !important;background:' + newColor + ' !important; margin: 0 -1px; padding: 0 1px;}';
};

var getHighlightBorder = function ( strongsNumber, lightness, highlightWordsWith ) {
	var newColor = getStrongsColorWithSettings( strongsNumber, lightness, highlightWordsWith );
	var className = getClassNameWithSettings( strongsNumber, lightness, highlightWordsWith );
	return '.' + className + ' {outline: 3px solid ' + newColor + ' !important; margin: 0 -1px; padding: 0 1px;}';
};

module.exports = {
	get: getStrongsColor,
	getHighlight: getHighlight,
	getHighlightBorder: getHighlightBorder,
};
