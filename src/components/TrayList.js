import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './trays/styles.scss';


import WordTray from '../components/trays/word';
import GotoTray from '../components/trays/goto';
import SearchTray from '../components/trays/search';
import BookmarksTray from '../components/trays/bookmarks';
import SettingsTray from '../components/trays/settings';

function getComponent( componentString ) {
	switch ( componentString ) {
		case 'WordTray':
			return <WordTray />

		case 'GotoTray':
			return <GotoTray />

		case 'SearchTray':
			return <SearchTray />

		case 'BookmarksTray':
			return <BookmarksTray />

		case 'SettingsTray':
			return <SettingsTray />
	}
}

const TrayList = ( { trays, filter, onTrayClick } ) => {
	console.log( trays );
	return (
		<div>
			{ trays.map( tray =>
				<div
					key={ tray.id }
					className={ tray.visible ? styles.visible : styles.hidden }
					{ ...tray }
				>
					{ getComponent( tray.component ) }
				</div>
			) }
		</div>
	);
};

TrayList.propTypes = {
	trays: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		visible: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired
	}).isRequired).isRequired
};

export default withStyles( styles )( TrayList );
