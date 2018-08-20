import { connect } from 'react-redux';
import { removeBookmark } from '../actions';
import BookMark from '../components/bookmarks/bookmark';

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		removeBookmark: ( reference ) => {
			dispatch( removeBookmark( reference ) )
		},
	}
};

const BookMarkContainer = connect(
	null,
	mapDispatchToProps
)( BookMark )

export default BookMarkContainer;


