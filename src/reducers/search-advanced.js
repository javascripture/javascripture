const searchAdvanced = ( state = false, action ) => {
	switch ( action.type ) {
		case 'OPEN_ADVANCED_SEARCH':
			return true;

		case 'CLOSE_ADVANCED_SEARCH':
			return false;

		default:
			return state;
	}
}

export default searchAdvanced;
