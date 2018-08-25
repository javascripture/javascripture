const searchSelect = ( state = null, action ) => {
	switch ( action.type ) {
		case 'ACTIVATE_SEARCH_SELECT':
			return action.target;

		case 'DEACTIVATE_SEARCH_SELECT':
			return null;

		default:
			return state;
	}
}

export default searchSelect;
