// External
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { setTrayVisibilityFilter, addBookmark } from '../../actions';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Bookmark from '../svg/bookmark';

const VerseNumber =  React.memo( ( { book, chapter, verse } ) => {
	const dispatch = useDispatch();
	const addBookmarkAction = () => {
		dispatch( addBookmark( { book, chapter, verse } ) );
		dispatch( setTrayVisibilityFilter( 'bookmarks' ) );
	};

	return (
		<span className={ styles.verseNumber } onClick={ addBookmarkAction }>
			<span>{ verse }</span>
			<span className={ styles.verseNumberIcon }><Bookmark fill="#999" /></span>
		</span>
	);
} );

export default withStyles( styles )( VerseNumber );
