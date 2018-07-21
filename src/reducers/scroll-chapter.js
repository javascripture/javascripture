import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = [{},{}];

const getReferenceFromHash = function( hash ) {
	const reference = hash.split( '/' );
	if ( ! reference[ 1 ] ) {
		return false;
	}

	const book = reference[ 1 ].replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference[ 2 ] );

	return { book, chapter, verse };
}

const scrollChapter = ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			const locationState = [ ...state ],
				reference = getReferenceFromHash( action.payload.location.hash );
			locationState[ 0 ] = reference;

			return locationState;

		case 'SET_SCROLL_CHAPTER':
			const newState = [ ...state],
				book = action.book,
				chapter = action.chapter,
				index = action.index;

			newState[ index ] = { book, chapter };

    		return newState;

		default:
			return state;
	}
}

export default scrollChapter;
