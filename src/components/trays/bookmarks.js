// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import BookMarks from '../../containers/bookmarks';
import styles from './styles.scss';

const BookmarksTray = () => (
	<div className={ styles.tray }>
		<div id="bookmarksPanel">
			<h2>Bookmarks</h2>
			<ol className="bookmarks references"></ol>
			<BookMarks />

			<br /><br />
			<h2>Cross references</h2>
			<div id="crossReferences"></div>
		</div>
	</div>
);

BookmarksTray.propTypes = {};

export default withStyles( styles )( BookmarksTray );
