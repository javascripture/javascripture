import { LOCATION_CHANGE } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist/lib/constants'
import { isMatch } from 'lodash';

import { getReferenceText } from '../lib/reference.js';

const getRandomReference = function() {
	var bookNumber = Math.floor(Math.random() * bible.Data.books.length),
		chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length),
		numberOfVerses = bible.Data.verses[bookNumber][chapterNumber],
		verseNumber = Math.floor(Math.random() * numberOfVerses),
		referenceObject = {};
	referenceObject.book = bible.Data.books[bookNumber][0];
	referenceObject.chapter = chapterNumber + 1;
	referenceObject.verse = verseNumber + 1;
	return referenceObject;
};

if ( window.location.hash.length < 3 ) {
	const randomReference = getRandomReference();
	window.location.hash = '#/' + randomReference.book + '/' + randomReference.chapter + '/' + randomReference.verse;
}

const getReferenceFromHash = function( hash, version ) {
	const reference = hash.split( '/' );
	if ( ! reference[ 1 ] ) {
		return false;
	}

	const book = reference[ 1 ].replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference[ 2 ] ),
		verse = reference[ 3 ] ? parseInt( reference[ 3 ] ) : 1;

	return { book, chapter, verse, version };
};

const getReferenceFromAction = ( reference, version ) => {
	const book = reference.book.replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference.chapter ),
		verse = reference.verse ? parseInt( reference.verse ) : 1;

	return { book, chapter, verse, version };
}

const getInitialState = () => {
	return [ getReferenceFromHash( window.location.hash, 'original' ), getReferenceFromHash( window.location.hash, 'kjv' ) ];
}

const reference = ( state = getInitialState(), action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			const reference = getReferenceFromHash( action.payload.location.hash, state[ 0 ].version );
			if ( ! reference ) {
				return state;
			}
			const locationState = [ ...state ];
			locationState[ 0 ] = reference;
			document.title = getReferenceText( reference ) + ' | Javascripture ';
			return locationState;

		case 'CHANGE_VERSION':
			const newState = [ ...state ];
			const newReference = newState[ action.index ];
			newReference.version = action.version;
			newState[ action.index ] = newReference;
			return newState;

		case 'SET_REFERENCE':
			const setReferenceState = [ ...state ];
			setReferenceState[ action.index ] = getReferenceFromAction( action.reference, setReferenceState[ action.index ].version );
			return setReferenceState;

		case 'ADD_COLUMN':
			const addedState = [ ...state ];
			const numberOfColumns = state.length;
			const addedColumn = Object.assign( {}, state[ state.length - 1 ] );
			addedState.push( addedColumn );
			return addedState;

		case 'REMOVE_COLUMN':
			const removedState = [ ...state ];
			removedState.splice( action.index, 1 );
			return removedState;

		default:
			return state;
	}
}

export default reference;
