import { LOCATION_CHANGE } from 'connected-react-router';

const initalState = [
	{
		visible: true,
		id: 'goto',
		text: 'Go to',
		component: 'GotoTray',
		icon: 'BookSvg',
	},
	{
		visible: false,
		id: 'word',
		text: 'Word Details',
		component: 'WordTray',
		icon: 'EyeSvg',
	},
	{
		visible: false,
		id: 'search',
		text: 'Search',
		component: 'SearchTray',
		icon: 'SearchSvg',
	},
	{
		visible: false,
		id: 'bookmarks',
		text: 'Bookmarks',
		component: 'BookmarksTray',
		icon: 'BookmarkSvg',
	},
	{
		visible: false,
		id: 'settings',
		text: 'Settings',
		component: 'SettingsTray',
		icon: 'HelpSvg',
	},
	{
		visible: false,
		id: 'reference',
		text: 'Compare',
		component: 'ReferenceInfo',
		icon: 'InfoSvg',
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

		default:
			return state;
	}
}

export default trays;
