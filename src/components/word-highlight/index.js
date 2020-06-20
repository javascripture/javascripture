// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal
import { getHighlight, getHighlightBorder } from '../strongs-color.js';

const WordHighlight = React.memo( ( { word } ) => {
	const settings = useSelector( state => state.settings );
	const searchSelect = useSelector( state => state.searchSelect );
	return (
		<style>
			{ word && word.split(/[/, ]/).map( word => {
				if ( word === 'added' || word === 'divineName' ) {
					return;
				}

				if ( searchSelect ) {
					return getHighlightBorder( word, settings.subdue, settings.highlightWordsWith );
				}

				return getHighlight( word, settings.subdue, settings.highlightWordsWith );
			} ) }
		</style>
	);
} );

export default WordHighlight;
