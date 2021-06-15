import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = [{},{}];

const getReferenceFromHash = function( hash ) {
	const reference = hash.split( '/' );
	if ( ! reference[ 1 ] ) {
		return false;
	}

	const book = reference[ 1 ].replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference[ 2 ] ),
		verse = 1;

	return { book, chapter, verse };
}

const scrollChapter = ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			if ( "undefined" === typeof action.payload.location ) {
				return state;
			}
			const hash = action.payload.location.hash;
			const locationState = [ ...state ],
				reference = getReferenceFromHash( hash );
			locationState[ 0 ] = reference;

			return locationState;

		case 'SET_SCROLL_CHAPTER':
			const newState = [ ...state],
				book = action.book,
				chapter = action.chapter,
				index = action.index;

			newState[ index ] = { book, chapter };
			return newState;

		case 'REMOVE_COLUMN':
			const removedState = [ ...state ];
			removedState.splice( action.index, 1 );
			return removedState;

		default:
			return state;
	}
}

export default scrollChapter;
