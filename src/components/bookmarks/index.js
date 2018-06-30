// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import BookMark from '../../containers/bookmark';

const BookMarks = ( { bookmarks, removeBookmark } ) => (
	<div className={ styles.bookmarks }>
		<h2 className={ styles.title }>Bookmarks</h2>
		<ol className={ styles.bookmarksList }>
			{ bookmarks.map( ( bookmark, key ) => {
				return <BookMark bookmark={ bookmark } key={ key } />;
			} ) }
		</ol>
	</div>
)

export default withStyles( styles )( BookMarks );
