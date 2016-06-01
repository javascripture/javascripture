import { connect } from 'react-redux'
import some from 'lodash/some';

import { addBookmark } from '../actions'
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
		}
	}
};

const BookMarksContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( BookMarks )

export default BookMarksContainer;


