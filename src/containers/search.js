// External
import { connect } from 'react-redux';

// Internal
import { addSearch, removeSearch, toggleSearch } from '../actions'
import Search from '../components/search';

const mapStateToProps = ( state, ownProps ) => {
	return {
		searchTerms: state.searchTerms
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addSearch: ( terms ) => {
			dispatch( addSearch( terms ) );
		},
		removeSearch: ( terms ) => {
			dispatch( removeSearch( terms ) );
		},

		toggleSearch: ( terms ) => {
			dispatch( toggleSearch( terms ) );
		},
	}
};

const SearchContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( Search )

export default SearchContainer;
