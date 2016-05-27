// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const BookmarksTray = () => (
	<div className={ styles.tray }>
		<div id="bookmarksPanel">
			<h2><a href="#"><span className="link-text">Bookmarks</span></a><a className="bookmark-current-passage icon-plus"></a></h2>
			<ol className="bookmarks references"></ol>

			<h2>Cross references</h2>
			<div id="crossReferences"></div>
		</div>
	</div>
);

BookmarksTray.propTypes = {};

export default withStyles( styles )( BookmarksTray );
