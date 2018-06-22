// External
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import Bookmark from '../svg/bookmark.js';
import styles from './styles.scss';

const Bookmarker = ( { book, chapter, verse, addBookmark } ) => {
	return (
		<span className={ styles.bookmarker } onClick={ addBookmark }><Bookmark /></span>
	);
};

export default withStyles( styles )( Bookmarker );