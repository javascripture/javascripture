import { LOCATION_CHANGE } from 'react-router-redux';

import WordTray from '../components/trays/word';
import GotoTray from '../components/trays/goto';
import SearchTray from '../components/trays/search';
import BookmarksTray from '../components/trays/bookmarks';
import SettingsTray from '../components/trays/settings';

const initalState = [
	{
		visible: true,
		id: 'goto',
		text: 'Go to',
		component: GotoTray
	},
	{
		visible: false,
		id: 'word',
		text: 'Word Details',
		component: WordTray
	},
	{
		visible: false,
		id: 'search',
		text: 'Search',
		component: SearchTray
	},
	{
		visible: false,
		id: 'bookmarks',
		text: 'Bookmarks',
		component: BookmarksTray
	},
	{
		visible: false,
		id: 'settings',
		text: 'Settings',
		component: SettingsTray
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
