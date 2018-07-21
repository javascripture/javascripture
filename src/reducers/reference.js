import { LOCATION_CHANGE } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist/lib/constants'
import { isMatch } from 'lodash';
const initialState = [ {
	book: null,
	chapter: null,
	verse: null,
	version: null,
} ];

const getRandomReference = function( version ) {
	var bookNumber = Math.floor(Math.random() * bible.Data.books.length),
		chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length),
		numberOfVerses = bible.Data.verses[bookNumber][chapterNumber],
		verseNumber = Math.floor(Math.random() * numberOfVerses),
		referenceObject = {};
	referenceObject.book = bible.Data.books[bookNumber][0];
	referenceObject.chapter = chapterNumber + 1;
	referenceObject.verse = verseNumber + 1;
	referenceObject.version = version;
	return referenceObject;
};

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


const reference = ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			const reference = getReferenceFromHash( action.payload.location.hash, state[ 0 ].version );
			if ( ! reference ) {
				return state;
			}

			return [ reference, state[ 1 ] ];

		case 'CHANGE_VERSION':
			const newState = [ ...state ],
				newReference = newState[ action.index ];
			newReference.version = action.version;
			newState[ action.index ] = newReference;
			return newState;


		case 'SET_REFERENCE':
			const setReferenceState = [ ...state ];
			setReferenceState[ action.index ] = getReferenceFromAction( action.reference, setReferenceState[ action.index ].version );
			return setReferenceState;

		case REHYDRATE:
			if ( typeof( action.payload ) === 'undefined' ) {
				return [ getRandomReference( 'original' ), getRandomReference( 'kjv' ) ];
			}
			return state;

		default:
			return state;
	}
}

export default reference;
