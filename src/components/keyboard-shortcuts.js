// External dependencies
import React, { useEffect } from 'react';
import mousetrap from 'mousetrap';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { goToReference, setTrayVisibilityFilter, setCurrentListResult } from '../actions'
import { createReferenceLink, getReferenceFromSearchResult } from '../lib/reference.js';

// Component variables
let lastTimeStamp = 0,
	waiter;

const KeyboardShortcuts = React.memo( () => {
	const currentListItem = useSelector( state => state.list.filter( ( { current } ) => typeof current !== 'undefined' ) ).shift();
	const reference = useSelector( ( state ) => state.reference );

	const dispatch = useDispatch();

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
		mousetrap.bind( [ '=' ], () => {
			if ( currentListItem && currentListItem.current < currentListItem.results.length - 1 ) {
				goToReference( getReferenceFromSearchResult( currentListItem.results[ currentListItem.current + 1 ] ) );
				dispatch( setCurrentListResult( currentListItem.id, currentListItem.current + 1 ) );
			}
		} );
		mousetrap.bind( [ '-' ], () => {
			if ( currentListItem  && currentListItem.current > 0) {
				goToReference( getReferenceFromSearchResult( currentListItem.results[ currentListItem.current - 1 ] ) );
				dispatch( setCurrentListResult( currentListItem.id, currentListItem.current - 1 ) );
			}
		} );
		mousetrap.bind( [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ], ( event, combo ) => goToChapter( event, combo ) );
		mousetrap.bind( ['alt+1','alt+2','alt+3','alt+4','alt+5','alt+6'], ( event, combo ) => openTray( event, combo ) );
	} );

	return null;
} );

export default KeyboardShortcuts;
