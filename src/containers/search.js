// External
import { connect } from 'react-redux';

// Internal
import {
	addSearch,
	clearAll,
	removeSearch,
	toggleSearch,
	closeAdvancedSearch,
	openAdvancedSearch,
	settingsChange,
	activateSearchSelect,
	updateSearchForm,
	clearSearchForm,
} from '../actions'
import Search from '../components/search';

const mapStateToProps = ( state, ownProps ) => {
	return {
		searchAdvanced: state.searchAdvanced,
		searchTerms: state.searchTerms,
		settings: state.settings,
		searchForm: state.searchForm,
		versions: state.versions,
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	javascripture.reactHelpers.dispatch = dispatch;
	return {
		updateSearchForm: ( name, value ) => {
			dispatch( updateSearchForm( name, value ) );
		},
		addSearch: ( terms ) => {
			dispatch( addSearch( terms, 'search' ) );
			dispatch( clearSearchForm() );
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
		activateSearchSelect: ( mode ) => {
			dispatch( activateSearchSelect( mode ) );
		},
		clearSearchForm: () => {
			dispatch( clearSearchForm() );
		},
	}
};

const SearchContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Search )

export default SearchContainer;
