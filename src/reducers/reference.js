import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
	book: null,
	chapter: null,
	verse: null,
};

const reference = ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			const reference = action.payload.location.hash.split( '/' );
			if ( ! reference[ 1 ] ) {
				return state;
			}

			const book = reference[ 1 ].replace( /\%20/gi, ' ' ),
				chapter = parseInt( reference[ 2 ] ),
				verse = reference[ 3 ] ? parseInt( reference[ 3 ] ) : 1;

			return { book, chapter, verse };

		default:
			return state;
	}
}

export default reference;
