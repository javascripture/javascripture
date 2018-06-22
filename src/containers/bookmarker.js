import { connect } from 'react-redux';

import { addBookmark, setTrayVisibilityFilter, showCrossReferences } from '../actions';
import BookMarker from '../components/reference/bookmarker';

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addBookmark: () => {
			dispatch( setTrayVisibilityFilter( 'bookmarks' ) );
			dispatch( addBookmark( ownProps ) );
			dispatch( showCrossReferences( ownProps ) );
		},

	}
};

const BookMarkerContainer = connect(
 	null,
 	mapDispatchToProps
)( BookMarker )

export default BookMarkerContainer;
