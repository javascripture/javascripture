// External
import React from 'react';

// Internal
import Word from './word';

const Verse = React.memo( ( { verse, version } ) => {
	let lastWord = null;
	let words = null;
	if ( verse && verse.map ) {
		words = verse.map( ( word, index ) => {
			lastWord = word;
			return <Word word={ word } key={ index } version={ version } lastWord={ lastWord }/>;
		} );
	} else if ( verse ) {
		words = verse;
	}

	return words;
} );

export default Verse;
