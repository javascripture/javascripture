const bookmarks = ( state = [], action ) => {
	switch ( action.type ) {
		case 'ADD_BOOKMARK':
			return [
				...state,
				action.reference
			];

		case 'REMOVE_BOOKMARK':
			return state.filter( reference => {
				return ! ( reference.book === action.reference.book &&
					reference.chapter === action.reference.chapter &&
					reference.verse === action.reference.verse );
		} );

		default:
			return state;
	}
}

export default bookmarks;
