/*global javascripture*/

// External
import React from 'react';

// Internal
import Word from './word';

const Verse = ( { verse, index, language, version } ) => {
	let lastWord = null;
	const words = verse && verse.map( ( word, index2 ) => {
			const wordComponent = <Word word={ word } key={ index2 } language={ language } version={ version } lastWord={ lastWord }/>;
			lastWord = word;
			return wordComponent;
		} );

	return (
		<span>{ words }</span>
	);
};

export default Verse;