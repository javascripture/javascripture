// External
import React from 'react';
import { useDispatch } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import { addBookmark, setTrayVisibilityFilter } from '../../actions';
import Bookmark from '../svg/bookmark.js';
import styles from './styles.scss';

const Bookmarker = React.memo( ( { book, chapter, verse, fill } ) => {
	const dispatch = useDispatch();
	const addBookmarkAction = () => {
		dispatch( setTrayVisibilityFilter( 'bookmarks' ) );
		dispatch( addBookmark( { book, chapter, verse } ) );
	};

	return (
		<span className={ styles.bookmarker } onClick={ addBookmarkAction }>
			<Bookmark fill={ fill } />
		</span>
	);
} )	;

export default withStyles( styles )( Bookmarker );
