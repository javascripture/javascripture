// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useSelector } from 'react-redux';

// Internal dependencies
import Bookmark from '../svg/bookmark.js';
import styles from './styles.scss';
import Single from './single';

const BookMarks = React.memo( () => {
	const bookmarks = useSelector( state => state.bookmarks );

	return (
		<div className={ styles.bookmarks }>
			<div className={ styles.bookmarksList }>
				{ bookmarks.length === 0 && ( <p>Click the <Bookmark /> to bookmark a verse.</p> ) }
				{ bookmarks.map( ( bookmark, key ) => <Single bookmark={ bookmark } key={ key } index={ key } /> ) }
			</div>
		</div>
	)
} );

export default withStyles( styles )( BookMarks );
