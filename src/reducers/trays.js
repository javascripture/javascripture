import { LOCATION_CHANGE } from 'connected-react-router';

const initalState = [
	{
		visible: true,
		id: 'word',
		text: 'Word Details',
		component: 'WordTray'
	},
	{
		visible: false,
		id: 'search',
		text: 'Search',
		component: 'SearchTray'
	},
	{
		visible: false,
		id: 'bookmarks',
		text: 'Bookmarks',
		component: 'BookmarksTray'
	},
	{
		visible: false,
		id: 'settings',
		text: 'Settings',
		component: 'SettingsTray'
	}
];

const trays = ( state = initalState, action ) => {
	switch ( action.type ) {
		case 'SET_TRAY_VISIBILITY_FILTER':
			return state.map( tray => {
				if ( action.filter === tray.id ) {
					tray.visible = true;
				} else {
					tray.visible = false;
				}
				return tray;
			} );

		case LOCATION_CHANGE:
			if ( window.innerWidth < 600 ) {
				return state.map( tray => {
					tray.visible = false;
					return tray;
				} );
			}
			return state;

		default:
			return state;
	}
}

export default trays;
