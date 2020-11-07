// External dependencies
import React, { useEffect } from 'react';
import mousetrap from 'mousetrap';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { goToReference, goToNextCurrentVerse, goToPreviousCurrentVerse, setTrayVisibilityFilter } from '../actions'
import { createReferenceLink, getReferenceFromSearchResult } from '../lib/reference.js';

// Component variables
let lastTimeStamp = 0,
	waiter;

function getCurrentReferenceOffset( searchResults, currentReference, offset ) {
	const currentSearchResults = find( searchResults, searchResult => {
		return isEqual( searchResult.terms, currentReference.terms );
	} )	;

	if ( currentSearchResults ) {
		return currentSearchResults.results[ currentReference.activeReference + offset ];
	}

	return null;
};

const KeyboardShortcuts = React.memo( () => {
	const searchResults = useSelector( ( state ) => state.searchResults );
	const currentReference = useSelector( ( state ) => state.currentReference );
	const reference = useSelector( ( state ) => state.reference );
	const nextReference = getCurrentReferenceOffset( searchResults, currentReference, 1 );
	const previousReference = getCurrentReferenceOffset( searchResults, currentReference, -1 );

	const dispatch = useDispatch();

	const goToNextCurrentVerseHandler = () => {
		if ( nextReference ) {
			goToReference( getReferenceFromSearchResult( nextReference ) );
			dispatch( goToNextCurrentVerse() );
		}
	};

	const goToPreviousCurrentVerseHandler = () => {
		if ( previousReference ) {
			goToReference( getReferenceFromSearchResult( previousReference ) );
			dispatch( goToPreviousCurrentVerse() );
		}
	};

	const goToChapter = ( event, combo ) => {
		const currentTimeStamp = Math.floor( event.timeStamp ),
			bookId = bible.getBookId( reference[ 0 ].book );

		let chapterToGoTo = combo;
		if ( currentTimeStamp - lastTimeStamp < 500) {
			chapterToGoTo = reference[ 0 ].chapter + combo;
		}

		if ( bible.Data.verses[bookId - 1][ chapterToGoTo - 1] ) {
			var newReference = reference[ 0 ];
			newReference.chapter = chapterToGoTo;
			newReference.verse = 1;

			clearTimeout( waiter );
			waiter = setTimeout( () => {
				window.location.hash = createReferenceLink( newReference );
			}, 500 );
		}

		lastTimeStamp = currentTimeStamp;
	};

	const openTray = ( event, combo ) => {
		event.preventDefault();
		const tray = combo.split( '+' )[1];
		dispatch( setTrayVisibilityFilter( tray ) );
	};

	useEffect( () => {
		mousetrap.bind( [ '=' ], () => goToNextCurrentVerseHandler() );
		mousetrap.bind( [ '-' ], () => goToPreviousCurrentVerseHandler() );
		mousetrap.bind( [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ], ( event, combo ) => goToChapter( event, combo ) );
		mousetrap.bind( ['alt+1','alt+2','alt+3','alt+4','alt+5','alt+6'], ( event, combo ) => openTray( event, combo ) );
	} );

	return null;
} );

export default KeyboardShortcuts;
