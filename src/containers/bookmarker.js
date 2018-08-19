import { connect } from 'react-redux';

import { addBookmark, setTrayVisibilityFilter } from '../actions';
import BookMarker from '../components/reference/bookmarker';

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
)( BookMarker )

export default BookMarkerContainer;
