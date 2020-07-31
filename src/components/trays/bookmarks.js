// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import BookMarks from '../bookmarks';
import styles from './styles.scss';

const BookmarksTray = ( props ) => (
	<div id="bookmarksPanel" className={ styles.trayPadding }>
		<BookMarks />
	</div>
);

BookmarksTray.propTypes = {};

export default withStyles( styles )( BookmarksTray );
