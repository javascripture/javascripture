// External
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import styles from './styles.scss';
import WordTray from './word';
import SearchTray from './search';
import BookmarksTray from './bookmarks';
import SettingsTray from './settings';

function getComponent( componentString ) {
	switch ( componentString ) {
		case 'WordTray':
			return <WordTray />

		case 'SearchTray':
			return <SearchTray />

		case 'BookmarksTray':
			return <BookmarksTray />

		case 'SettingsTray':
			return <SettingsTray />
	}
}

class TrayList extends React.Component{
	render() {
		const { trays, filter, onTrayClick } = this.props;

		return (
			<div>
				{ trays.map( tray =>
					<div
						key={ tray.id }
						className={ tray.visible ? styles.visible : styles.hidden }
					>
						{ getComponent( tray.component ) }
					</div>
				) }
			</div>
		);
	}
};

TrayList.propTypes = {
	trays: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		visible: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired
	}).isRequired).isRequired
};

export default withStyles( styles )( TrayList );
