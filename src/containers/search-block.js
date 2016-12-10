// External
import { connect } from 'react-redux';

// Internal
import SearchBlock from '../components/search/search-block';
import { setCurrentVerse } from '../actions';

const mapStateToProps = ( state, ownProps ) => {
	return {
		globalReference: state.reference
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setCurrentVerse: ( reference ) => {
			dispatch( setCurrentVerse( ownProps.terms, reference ) );
		},
	}
};

const SearchBlockContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( SearchBlock )

export default SearchBlockContainer;
