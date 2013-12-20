/*global javascripture*/
javascripture.modules.translateLiterally = {
	getWord: function (word) {
		var lemma = word[ 1 ],
		    literalWord,
		    literalConsistent = javascripture.data.literalConsistent,
		    morph = word[2];
		if ( 'string' === typeof morph ) {
			morph = morph.replace(/-/gi, '');
		}
		if ( typeof word === 'object' ) {
			if ( morph ) {
				if ( 'object' === typeof morph ) {
					literalWord = '';
					$.each( morph, function( key, value ) {
						if ( 'undefined' !== typeof literalConsistent[ lemma ][ value ] ) {
							literalWord += literalConsistent[ lemma ][ value ];
						} else if ( 'undefined' !== typeof literalConsistent[ value ] ) {
							literalWord += literalConsistent[ value ];
						} else {
							literalWord += literalConsistent[ lemma ];
						}
						literalWord += ' ';
					} );
				} else if ( 'undefined' !== typeof literalConsistent[ lemma ][ morph ] ) {
					literalWord = literalConsistent[ lemma ][ morph ];
				} else {
					literalWord = literalConsistent[ lemma ];
				}
			} else {
				literalWord = literalConsistent[ lemma ];
			}
		} else {
			literalWord = literalConsistent[ word ];
		}

		if (literalWord !== undefined && typeof(literalWord) === 'object') { //need better way to test if is an object
			//get first item in object
			$.each(literalWord, function (morph, translation) {
				literalWord = translation;
				var first;
				for (var i in literalWord) {
				    if (literalWord.hasOwnProperty(i) && typeof(i) !== 'function') {
						first = literalWord[i];
						break;
					}
				}
				//stop loop here;
			});
		}
		if (literalWord === undefined) {
			literalWord = '';
		}
		return literalWord;
	}
};
