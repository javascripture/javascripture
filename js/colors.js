/*global javascripture*/
javascripture.modules.colors = {
	getStrongsColor: function ( strongsInt ) {
		var theSizeOfAColorSegment = 360 / 8000,
			hue = strongsInt * theSizeOfAColorSegment,
			staturation = $( '#subdueColorBy' ).val() * 100 + '%',
			lightness = $( '#subdueColorBy' ).val() * 100 + '%';
		return 'hsl( ' + hue + ',' + staturation + ', ' + lightness + ' )';
	},

	getStrongsStyle: function ( strongsNumber, newColor ) {
		return '.' + strongsNumber + ' {color:#fff !important;background:' + newColor + ' !important;}';
	}
};