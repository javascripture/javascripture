// External
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

// Internal
import BookControl from '../components/reference-selector/book-control';

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		goToReference: ( path ) => {
			dispatch( push( path ) );
		}
	}
};

const BookControlContainer = connect(
 	null,
 	mapDispatchToProps
)( BookControl )

export default BookControlContainer;
