// External
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useSelector } from 'react-redux';

// Internal
import styles from './styles.scss';
import Search from '../search';
import BookmarksTray from './bookmarks';
import SettingsTray from './settings';
import ReferenceInfo from './reference-info';
import ReferenceSelector from '../reference-selector';
import WordDetails from '../word-details';

function getComponent( componentString, visible ) {
	switch ( componentString ) {
		case 'WordTray':
			return <WordDetails visible={ visible } />

		case 'GotoTray':
			return <ReferenceSelector visible={ visible } />

		case 'SearchTray':
			return <Search visible={ visible } />

		case 'BookmarksTray':
			return <BookmarksTray visible={ visible } />

		case 'SettingsTray':
			return <SettingsTray visible={ visible } />

		case 'ReferenceInfo':
			return <ReferenceInfo visible={ visible } />
	}
}

const TrayList = React.memo( () => {
	const trays = useSelector( state => state.trays );

	return (
		<div className={ styles.trayList }>
			{ trays.map( tray =>
				<div
					key={ tray.id }
					className={ tray.visible ? styles.visible : styles.hidden }
				>
					<div className={ styles.tray }>
						{ getComponent( tray.component, tray.visible ) }
					</div>
				</div>
			) }
		</div>
	);
} );

export default withStyles( styles )( TrayList );
