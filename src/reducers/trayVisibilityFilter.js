import { LOCATION_CHANGE } from 'react-router-redux';

const trayVisibilityFilter = ( state = 'goto', action ) => {
	switch ( action.type ) {
		case 'SET_TRAY_VISIBILITY_FILTER':
			return action.filter;

		case LOCATION_CHANGE:
			if ( window.innerWidth < 600 ) {
				return 'SHOW_NONE';
			}

		default:
			return state;
	}
}

export default trayVisibilityFilter
