/*global javascripture*/

// External
import React from 'react';

// Internal
import Word from './word';

const Verse = ( { verse, index, language, version, highlightWord } ) => {
	const words = verse && verse.map( ( word, index2 ) => {
			return ( <Word word={ word } key={ index2 } language={ language } version={ version } highlightWord={ highlightWord }/> );
		} );

	return (
		<span>{ words }</span>
	);
};

export default Verse;