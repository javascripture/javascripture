/*global javascripture*/

// External
import React from 'react';

// Internal
import Verse from './verse';

export default function Chapter( { book, chapter } ) {
	const chapterData = javascripture.data.kjv[ book ][ chapter - 1 ],
		verses = chapterData.map( ( verse, index ) => {
			return <Verse verse={ verse } key={ index } index={ index } />;
		} );
	return (
		<div>{ verses }</div>
	);
};
