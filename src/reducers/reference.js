import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
	book: null,
	chapter: null,
	verse: null,
};

const reference = ( state = initialState, action ) => {
	console.log( action );
	switch ( action.type ) {
		case LOCATION_CHANGE:
			const reference = action.payload.hash.split( '/' );
			if ( ! reference[ 1 ] ) {
				return state;
			}

			const book = reference[ 1 ],
				chapter = parseInt( reference[ 2 ] ),
				verse = reference[ 3 ] ? parseInt( reference[ 3 ] ) : 1;

			return { book, chapter, verse };

		default:
			return state;
	}
}

export default reference;
