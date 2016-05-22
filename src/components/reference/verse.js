/*global javascripture*/

// External
import React from 'react';

// Internal
import Word from './word';

export default ( { verse, index } ) => {
	const words = verse.map( ( word, index2 ) => {
			return ( <Word word={ word } key={ index2 } /> );
		} );

	return (
		<div>{ index + 1 }. { words }</div>
	);
};
