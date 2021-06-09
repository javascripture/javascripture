// External dependencies
import React from 'react';

// Internal dependencies
import BookMarks from '../bookmarks';
import styles from './styles.scss';

const BookmarksTray = ( props ) => (
	<div id="bookmarksPanel" className={ styles.trayPadding }>
		<BookMarks />
	</div>
);

export default BookmarksTray;
