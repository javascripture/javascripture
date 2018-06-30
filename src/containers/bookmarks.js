import { connect } from 'react-redux';
import { removeBookmark } from '../actions';
import BookMarks from '../components/bookmarks';

const mapStateToProps = ( state, ownProps ) => {
	return {
		bookmarks: state.bookmarks
	};
};

const BookMarksContainer = connect(
 	mapStateToProps,
)( BookMarks )

export default BookMarksContainer;


