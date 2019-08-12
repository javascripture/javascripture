// External
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import { addBookmark, setTrayVisibilityFilter } from '../../actions';
import Bookmark from '../svg/bookmark.js';
import styles from './styles.scss';

const Bookmarker = ( { book, chapter, verse, addBookmark } ) => {
	return (
		<span className={ styles.bookmarker } onClick={ addBookmark }><Bookmark /></span>
	);
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addBookmark: () => {
			dispatch( setTrayVisibilityFilter( 'bookmarks' ) );
			dispatch( addBookmark( ownProps ) );
		},

	}
};

const BookMarkerContainer = connect(
	null,
	mapDispatchToProps
)( Bookmarker );

export default withStyles( styles )( BookMarkerContainer );
