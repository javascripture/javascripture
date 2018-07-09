import { LOCATION_CHANGE } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist/lib/constants'
import { isMatch } from 'lodash';
const initialState = {
	book: null,
	chapter: null,
	verse: null,
};

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

const getReferenceFromHash = function( hash ) {
	const reference = hash.split( '/' );
	if ( ! reference[ 1 ] ) {
		return false;
	}

	const book = reference[ 1 ].replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference[ 2 ] ),
		verse = reference[ 3 ] ? parseInt( reference[ 3 ] ) : 1;

	return { book, chapter, verse };
};

const reference = ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			const reference = getReferenceFromHash( action.payload.location.hash );
			if ( ! reference ) {
				return state;
			}

			return reference;

		case REHYDRATE:
			if ( typeof( action.payload ) === 'undefined' ) {
				return getRandomReference();
			}
			return state;

		default:
			return state;
	}
}

export default reference;
