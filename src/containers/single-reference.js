import { connect } from 'react-redux';
import { addNextChapter, addPreviousChapter } from '../actions';
import SingleReference from '../components/reference/single-reference';

const mapStateToProps = ( state, ownProps ) => {
	return {
		scrollChapter: state.scrollChapter,
		reference: state.reference,
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addPreviousChapter: () => {
			dispatch( addPreviousChapter( ownProps.reference ) );
		},
		addNextChapter: () => {
			dispatch( addNextChapter( ownProps.reference ) );
		}
	}
};

const SingleReferenceContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( SingleReference )

export default SingleReferenceContainer;
