const bookmarks = ( state = [], action ) => {
	switch ( action.type ) {
		case 'ADD_BOOKMARK':
			return [
				...state,
				action.reference
			];

		default:
			return state;
	}
}

export default bookmarks;
