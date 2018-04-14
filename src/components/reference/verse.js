/*global javascripture*/

// External
import React from 'react';

// Internal
import Word from './word';

export default ( { verse, index, version, highlightWord } ) => {
	const words = verse && verse.map( ( word, index2 ) => {
			return ( <Word word={ word } key={ index2 } version={ version } highlightWord={ highlightWord }/> );
		} );

	return (
		<span>{ words }</span>
	);
};
