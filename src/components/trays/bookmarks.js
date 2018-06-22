// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import BookMarks from '../../containers/bookmarks';
import CrossReferences from '../../containers/cross-references';
import styles from './styles.scss';

const BookmarksTray = ( props ) => (
	<div className={ styles.tray }>
		<div id="bookmarksPanel" className={ styles.trayPadding }>
			<BookMarks />
			<CrossReferences />
		</div>
	</div>
);

BookmarksTray.propTypes = {};

export default withStyles( styles )( BookmarksTray );
