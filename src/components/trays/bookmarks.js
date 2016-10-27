// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import BookMarks from '../../containers/bookmarks';
import CrossReferences from '../../containers/cross-references';
import styles from './styles.scss';

const BookmarksTray = ( props ) => (
	<div className={ styles.tray }>
		<div id="bookmarksPanel" className={ styles.trayPadding }>
			<h2>Bookmarks</h2>
			<ol className="bookmarks references"></ol>
			<BookMarks />

			<br /><br />
			<CrossReferences />
		</div>
	</div>
);

BookmarksTray.propTypes = {};

export default withStyles( styles )( BookmarksTray );
