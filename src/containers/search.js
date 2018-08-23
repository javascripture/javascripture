// External
import { connect } from 'react-redux';

// Internal
import { addSearch, clearAll, removeSearch, toggleSearch, closeAdvancedSearch, openAdvancedSearch, settingsChange } from '../actions'
import Search from '../components/search';

const mapStateToProps = ( state, ownProps ) => {
	return {
		searchAdvanced: state.searchAdvanced,
		searchTerms: state.searchTerms,
		settings: state.settings,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	javascripture.reactHelpers.dispatch = dispatch;
	return {
		addSearch: ( terms ) => {
			dispatch( addSearch( terms, 'search' ) );
		},
		removeSearch: ( terms ) => {
			dispatch( removeSearch( terms ) );
		},

		toggleSearch: ( terms ) => {
			dispatch( toggleSearch( terms ) );
		},

		clearAllSearch: () => {
			dispatch( clearAll() );
		},

		openAdvancedSearch: () => {
			dispatch( openAdvancedSearch() );
		},

		closeAdvancedSearch: () => {
			dispatch( closeAdvancedSearch() );
		},
		expandSearchResults: () => {
			dispatch( settingsChange( 'expandedSearchResults', true ) );
		},
		collapseSearchResults: () => {
			dispatch( settingsChange( 'expandedSearchResults', false ) );
		},
	}
};

const SearchContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Search )

export default SearchContainer;
