import { connect } from 'react-redux';
import { removeBookmark } from '../actions';
import BookMark from '../components/bookmarks/bookmark';
import { showCrossReferences } from '../actions';

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		removeBookmark: ( reference ) => {
			dispatch( removeBookmark( reference ) )
		},
		showCrossReferences: () => {
			console.log( ownProps );
			dispatch( showCrossReferences( ownProps.bookmark ) );
		}
	}
};

const BookMarkContainer = connect(
 	null,
 	mapDispatchToProps
)( BookMark )

export default BookMarkContainer;


