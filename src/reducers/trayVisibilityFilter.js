const trayVisibilityFilter = ( state = 'goto', action ) => {
	switch ( action.type ) {
		case 'SET_TRAY_VISIBILITY_FILTER':
			return action.filter;

		default:
			return state;
	}
}

export default trayVisibilityFilter
