// External dependencies
import { connect } from 'react-redux';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeBookmark } from '../../actions';
import Bookmark from '../svg/bookmark.js';
import styles from './styles.scss';
import BookMark from './bookmark';

const BookMarks = ( { bookmarks, removeBookmark } ) => (
	<div className={ styles.bookmarks }>
		<h2 className={ styles.title }>Bookmarks</h2>
		<div className={ styles.bookmarksList }>
			{ bookmarks.length === 0 && ( <p>Click the <Bookmark /> to bookmark a verse.</p> ) }
			{ bookmarks.map( ( bookmark, key ) => {
				return <BookMark bookmark={ bookmark } key={ key } number={ key } />;
			} ) }
		</div>
	</div>
)

const mapStateToProps = ( state, ownProps ) => {
	return {
		bookmarks: state.bookmarks
	};
};

const BookMarksContainer = connect(
	mapStateToProps,
)( BookMarks )

export default withStyles( styles )( BookMarksContainer );