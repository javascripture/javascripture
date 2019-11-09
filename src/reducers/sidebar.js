const sidebar = ( state = false, action ) => {
	switch ( action.type ) {
		case 'OPEN_SIDEBAR':
			return true;

		case 'CLOSE_SIDEBAR':
			console.log( 'ghjk');
			return false;

		case 'TOGGLE_SIDEBAR':
			return ! state;

		case 'SET_TRAY_VISIBILITY_FILTER':
			return true;

		default:
			return state;
	}
}

export default sidebar;
