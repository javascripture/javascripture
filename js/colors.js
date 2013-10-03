var colors = {
	getStrongsColor: function ( strongsInt ) {
		var theSizeOfAColorSegment = 360 / 8000,
			hue = strongsInt * theSizeOfAColorSegment;

		return 'hsl( ' + hue + ', 50%, 50% )';
	},

	getStrongsStyle: function ( strongsNumber, newColor ) {
		return '.' + strongsNumber + ' {color:#fff;background:' + newColor + ' !important;}';	
	}
	
};