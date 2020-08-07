const bookmarks = ( state = [], action ) => {
	switch ( action.type ) {
		case 'ADD_BOOKMARK':
			const newState = state.filter( reference => {
				return ! ( reference.book === action.reference.book &&
					reference.chapter === action.reference.chapter &&
					reference.verse === action.reference.verse );
			} );
			const newStateClosed = newState.map( bookmark => {
				bookmark.open = false;
				return bookmark;
			} );
			const bookmark = action.reference;
			bookmark.open = true;
			newStateClosed.push( bookmark );
			return newStateClosed;

		case 'REMOVE_BOOKMARK':
			return state.filter( reference => {
				return ! ( reference.book === action.reference.book &&
					reference.chapter === action.reference.chapter &&
					reference.verse === action.reference.verse );
			} );

		case 'TOGGLE_BOOKMARK':
			return state.map( reference => {
				if ( reference.book === action.reference.book &&
					reference.chapter === action.reference.chapter &&
					reference.verse === action.reference.verse ) {
						reference.open = ! reference.open;
						return reference;
					} else {
						reference.open = false;
						return reference;
					}
			} );


		default:
			return state;
	}
}

export default bookmarks;
