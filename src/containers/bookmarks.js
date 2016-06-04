import { connect } from 'react-redux'
import some from 'lodash/some';

import { addBookmark, removeBookmark } from '../actions'
import BookMarks from '../components/bookmarks'

const mapStateToProps = ( state, ownProps ) => {
	return {
		bookmarks: state.bookmarks
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	// Delete later
	//javascripture.reactHelpers.dispatch = dispatch;
	javascripture.reactHelpers.addBookmark = addBookmark;

	return {
		addBookmark: () => {
			dispatch( addBookmark( ownProps ) )
		},

		removeBookmark: ( reference ) => {
			dispatch( removeBookmark( reference ) )
		}
	}
};

const BookMarksContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( BookMarks )

export default BookMarksContainer;


