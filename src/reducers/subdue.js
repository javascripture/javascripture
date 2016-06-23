export default ( state = 1, action ) => {
	switch ( action.type ) {
		case 'SETTINGS_SUBDUE_BY':
    		return action.subdueBy;

		default:
			return state
	}
}
