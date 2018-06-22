import { connect } from 'react-redux';
import { removeBookmark } from '../actions';
import BookMarks from '../components/bookmarks';

const mapStateToProps = ( state, ownProps ) => {
	return {
		bookmarks: state.bookmarks
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
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


